// ViewModels/BookingViewModel.js
import { useEffect, useState } from 'react';
import { checkZaloPay, OrderZaloPay } from '../Services/api/httpZalopay';
import { Alert, AppState, Linking } from 'react-native';
import { getNext7DaysWithWeekdays } from '../Services/utils/getNext7DaysWithWeekdays';
import { Add_Appointment_API } from '../Services/api/httpAppointment';
import { deleteZaloPayload, getZaloPay, setZaloPayload } from '../Services/utils/ZaloPay_AsyncStorage';
import { lightGreen100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { get_list_barber } from '../Services/api/httpStylist';
import { Add_Oder_API } from '../Services/api/httpOder';
import { delete_cart_item } from '../Services/utils/httpCartItem';

export const OderProduct = () => {
  const [isModalSuccc, setisModalSuccc] = useState(false)
  const [isModallFail, setisModallFail] = useState(false)
  const [modalIsloading, setmodalIsloading] = useState(false)
  const [app_trans_id, setapp_trans_id] = useState(null)
  const [dataChechZaloPay, setdataChechZaloPay] = useState(null)
  const [modalCheck, setmodalCheck] = useState(false)

  async function check() {
    const ZaloPayLocal = await getZaloPay()
    if (ZaloPayLocal !== null) {
      const Checking = await checkZaloPay(ZaloPayLocal?.app_trans_id)
      if (Checking.return_code === 1) {
        // tạo đơn
        const data = await getZaloPay()
        await Add_Oder_API(data.data)
        setmodalIsloading(false)
        // setisModalSuccc(true)
        setmodalCheck(true)
        setdataChechZaloPay(Checking)
        return
      }
      setdataChechZaloPay(Checking)
      console.log('status', dataChechZaloPay)
      setmodalIsloading(false)
      setisModallFail = (true)
      console.log('status', Checking);
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

  // xử lý orde Zalo pay
  const handleZaloPay = async order => {
    console.log('oder', order)
    const responseOrder = await OrderZaloPay(order.payment.price);
    // setapp_trans_id(responseOrder?.app_trans_id)
    if (responseOrder === false) {
      Alert.alert('Xảy ra lỗi vui lòng thử lại sau');
    } else {
      const ZaloPayLocal = {
        app_trans_id: responseOrder.app_trans_id,
        order_url: responseOrder.data.order_url,
        data: order,
        type: 'booking'
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

  const handle_Order = async (order) => {
    setmodalIsloading(true)
    if (order?.payment?.pay_method === 'ZaloPay') {
      handleZaloPay(order)
    } else if (order?.payment?.pay_method === 'cash') {
      const dataOrde = await Add_Oder_API(order);
        if (dataOrde) {
            for (const product of order.order.listProduct) {
                await delete_cart_item(product.cartItem_id);
            }
            setmodalIsloading(false);
            setisModalSuccc(true);
        }
    }
  }

  return {
    dataChechZaloPay,
    modalCheck,
    handle_Order,
    isModalSuccc,
    modalIsloading
  };
};
