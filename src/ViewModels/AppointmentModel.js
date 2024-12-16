// ViewModels/BookingViewModel.js
import {useEffect, useState} from 'react';
import {checkZaloPay, OrderZaloPay} from '../Services/api/httpZalopay';
import {Alert, AppState, Linking} from 'react-native';
import { getNext7DaysWithWeekdays } from '../Services/utils/getNext7DaysWithWeekdays';
import { Add_Appointment_API } from '../Services/api/httpAppointment';
import { deleteZaloPayload, getZaloPay, setZaloPayload } from '../Services/utils/ZaloPay_AsyncStorage';
import { useSelector } from 'react-redux';
import { getUserlocal } from '../Services/utils/user__AsyncStorage';
import { sendLocalNotification, sendScheduleNotification } from '../Services/api/notificationhelper';

export const useBookingViewModel = () => {
  const listTimes = [
    '8:00','8:20','8:40','9:00','9:20','9:40',
    '10:00','10:20','10:40','11:00','11:20','11:40',
    '12:00','12:20','12:40','13:00','13:20','13:40',
    '14:00','14:20','14:40','15:00','15:20','15:40',
    '16:00','16:20','16:40','17:00','17:20','17:40',
    '18:00','18:20','18:40','19:00','19:20','19:40',
    '20:00','20:20','20:40',];

//  const [stylists, setStylists] = useState([]);
  const [daylist, setdaylist] = useState(null);
  const [day_Selected, setday_Selected] = useState(null)
  const [app_trans_id, setapp_trans_id] = useState(null)
  const [modalCheck, setmodalCheck] = useState(false)
  const [modalSucces, setmodalSucces] = useState(false)
  const [modalIsloading, setmodalIsloading] = useState(false)
  const [dataChechZaloPay, setdataChechZaloPay] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const  stylists  = useSelector((state) => state.barbers.barbers);
 useEffect(() => {
    async function getUser() {
      const user = await getUserlocal()
      if (user) {
        setUserProfile(user)
      }
      
    }
    getUser()
  }, [])

  async function check() {
    const ZaloPayLocal =await getZaloPay()
    if (ZaloPayLocal !== null){
      const Checking = await checkZaloPay(ZaloPayLocal?.app_trans_id)
      if(Checking.return_code === 1){
         // tạo đơn
        const data=await getZaloPay()
        console.log('dữ liệu lấy từ dien thoại', data)
        const respons=  await Add_Appointment_API(data.data)
        scheduleAppointmentNotification(respons.appointment.appointment_date.split('T')[0],respons.appointment.appointment_time,"Bee Barber",userProfile._id)
        setmodalIsloading(false)
      }
      setdataChechZaloPay(Checking)
      setmodalIsloading(false)
      setmodalCheck(true)
      console.log('status',Checking);
      // setmodalCheck(true)
    }
} 
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState === 'background' && nextAppState === 'active') {
        check()
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [appState]);

  useEffect(() => {
    async function getDate() {
      const dayWeeks = await getNext7DaysWithWeekdays()
      setdaylist(dayWeeks);
      setday_Selected(dayWeeks[0]);
    }
    getDate();
  }, []);

  // xử lý orde Zalo pay
  const handleZaloPay = async appointment => {
    const responseOrder = await OrderZaloPay(appointment.appointment.price);
    setapp_trans_id(responseOrder.app_trans_id)
    if (responseOrder === false) {
      Alert.alert('Xảy ra lỗi vui lòng thử lại sau');
    } else {
      const ZaloPayLocal={
        app_trans_id:responseOrder.app_trans_id,
        order_url:responseOrder.data.order_url,
        data:appointment,
        type:'booking'
      }
     await deleteZaloPayload()
     await setZaloPayload(ZaloPayLocal)
          openPaymentUrl(responseOrder.data.order_url);
    }
  };
  const openPaymentUrl = async orderUrl => {
    try {
      await Linking.openURL(orderUrl);
    } catch (error) {
      Alert.alert(`Không thể mở ZaloPay vui lòng kiểm tra`);
    }
  };

  const handle_Order_Appointment = async(appointment)=>{
      if(appointment?.payment?.pay_method === 'ZaloPay'){
          handleZaloPay(appointment)
      }else if(appointment?.payment?.pay_method === 'cash'){
       const dataOrde = await Add_Appointment_API(appointment)
       if(dataOrde){
         setmodalSucces(true)
         console.log("đặt lịch thành công",dataOrde)
         scheduleAppointmentNotification(dataOrde.appointment.appointment_date.split('T')[0],dataOrde.appointment.appointment_time,"Bee Barber",userProfile._id)
       }
      }
  }

  const scheduleAppointmentNotification = async (date, time, barber_Selected, user) => {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");

    const localTime = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );

    const utcTime = new Date(localTime.getTime() - localTime.getTimezoneOffset() * 60000);

    const formattedDate = localTime.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const formattedTime = localTime.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    sendLocalNotification({
      channelId: 'default-channel',
      title: 'Đặt Lịch Thành Công',
      message: `Bạn đã đặt lịch với ${barber_Selected?.name || "thợ cắt"} vào lúc ${formattedTime} ngày ${formattedDate}.`,
      data: { user_id: userProfile._id },
    });

    const notificationPayload = {
      user_id: user,
      relates_id: barber_Selected?._id,
      type: "booking",
      content: `Bạn có lịch hẹn với ${barber_Selected?.name || "thợ cắt"} vào lúc ${formattedTime} ngày ${formattedDate}.`,
      schedule: utcTime.toISOString(), 
    };
    console.log(notificationPayload, "Hello Again");

    try {
      await sendScheduleNotification(notificationPayload);
    } catch (err) {
      console.error("Error scheduling notification:", err);
    }
  };

  return {
    setmodalCheck,
    setmodalIsloading,
    modalIsloading,
    setmodalSucces,
    modalSucces,
    handleZaloPay,
    listTimes,
    stylists,
    daylist,
    day_Selected,
    setday_Selected,
    modalCheck,
    handle_Order_Appointment,
    dataChechZaloPay
  };
};

