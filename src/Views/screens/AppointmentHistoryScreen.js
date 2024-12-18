import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../Resources/styles/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {get_Appointment_history, getTime_Appointment, updateAppointmentStatusFalse, updateAppointmentStatusToCancelel_Case, updateAppointmentStatusToCancelel_ZaloPay, updateAppointmentTime} from '../../Services/api/httpAppointment';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP';
import { Add_Review_API } from '../../Services/api/httpReview';
import { getUserlocal } from '../../Services/utils/user__AsyncStorage';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useBookingViewModel } from '../../ViewModels/AppointmentModel';
import TimeSelectionComponent from '../components/TimeSelectionComponent';
import { fomatsDate } from '../../Services/utils/fomatsDate';

const AppointmentHistoryScreen = ({navigation}) => {
  const nav = useNavigation();

const {
    daylist,
    listTimes,
  } = useBookingViewModel();
 const [time, settime] = useState([])
 const [time_Selected, settime_Selected] = useState(null)
  const [day_Selected, setday_Selected] = useState(null)

  const [datahisStory, setdatahisStory] = useState([]);
  const [isRating, setisRating] = useState(false)
  const [ItemRating, setItemRating] = useState(false)
  const [rating, setRating] = useState(0);
  const [ItemCancedel, setItemCancedel] = useState(null)
  const [isCancedal, setisCancedal] = useState(false)
  const [bank_account, setbank_account] = useState('')
  const [ModalDelete, setModalDelete] = useState(false)
  const [ModalHuyLich, setModalHuyLich] = useState(false)
  const [ItemDelete, setItemDelete] = useState(null)
  const [ModalDoiLich, setModalDoiLich] = useState(false)
  const [ItemDoiLich, setItemDoiLich] = useState(null)

  const [isLogin, setisLogin] = useState(false)

  const getApi = async () => {
      const user= await getUserlocal()
      if(user){
        const data = await get_Appointment_history();
        setdatahisStory(data);
      }else{
       setisLogin(true)
      }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Hàm này sẽ được gọi mỗi khi màn hình/tab này được focus
      getApi();
  
      return () => {
        // Cleanup nếu cần khi màn hình/tab bị unfocus
      };
    }, [])
  );
  const handleTimeSelect = (time) => {
    settime_Selected(time);
  };
  const HandalReview=async()=>{
    const review = {
        barber_id: ItemRating?.barber_id?._id, // Lấy ID của barber
        services_id: ItemRating.service_id.map(service => service._id), // Lấy danh sách ID dịch vụ
        rating: rating, // Đặt rating cố định
        appointment_id: ItemRating._id // Lấy ID cuộc hẹn
      };
      const reponse= await Add_Review_API(review)
      if(reponse){
        getApi()
        setisRating(false)
        Alert.alert("Đánh giá thành công")
      }else{
        Alert.alert("Vui lòng thử lại sau")
      }
    }

   
    function HandalModalHuyLich(item){
      setItemCancedel(item)
      setModalHuyLich(true)
    }
    const Handalcanceled=async()=>{
      console.log("item",ItemCancedel)
            if(ItemCancedel.payment?.pay_method == "ZaloPay"){
              setisCancedal(true)
              setModalHuyLich(false)
            }else{
              await updateAppointmentStatusToCancelel_Case(ItemCancedel._id)
              await getApi()
              setModalHuyLich(false)
            }
    }

    async function capnhathuy(){
      if(bank_account == ''){
        Alert.alert('Vui lòng nhập số tài khoản ')
        return
     }
      const response= await  updateAppointmentStatusToCancelel_ZaloPay(ItemCancedel._id,bank_account)
      if(response){
        await getApi()
        setisCancedal(false)
      }else{
        Alert.alert("Vui lòng thử lại sau")
      }
    }
    
    const HandalDeleteModal=async(item)=>{
      setItemDelete(item._id)
      setModalDelete(true)
    }
    async function handelDelete(id){
            await updateAppointmentStatusFalse(ItemDelete)
            await getApi()
            setModalDelete(false)
    }
    
    const filterAvailableTimes = () => {
      // Hàm chuyển đổi thời gian từ HH:MM sang số phút từ 00:00
      const convertToMinutes = (time) => {
          const [hour, minute] = time.split(":").map(num => parseInt(num));
          return hour * 60 + minute;
      };
  
      // Lấy ngày hiện tại
      const today = new Date();
      const selectedDay = new Date(day_Selected?.date);
      console.log("ngày được chọn",selectedDay)
  
      // Kiểm tra nếu ngày chọn là hôm nay
      if (selectedDay.toDateString() !== today.toDateString()) {
          // Nếu ngày chọn không phải hôm nay, trả về mảng rỗng
          return [];
      }
  
      const currentMinutes = today.getHours() * 60 + today.getMinutes(); // Lấy số phút hiện tại từ 00:00
  
      // Lọc các thời gian từ giờ hiện tại trở về trước và không vượt quá 8:00 sáng
      const filteredTimes = listTimes?.filter(time => {
          const timeInMinutes = convertToMinutes(time);
          return timeInMinutes <= currentMinutes && timeInMinutes >= convertToMinutes('08:00');
      });
  
      return filteredTimes;
  };

    useEffect(() => {
        async function getTime(barber_Selected,day_Selected) {
          console.log("data",day_Selected)
             const time= await getTime_Appointment(barber_Selected,day_Selected)
             settime(time)
            //  console.log("kk",time)
             if (time?.includes(time_Selected)) {
                settime_Selected(null)
              } 
              const filteredTimes = filterAvailableTimes() || [];
              if (filteredTimes.length > 0 && !filteredTimes.every((item, index) => item === (time && time[index]))) {
                settime(prevTimes => [...(prevTimes || []), ...filteredTimes]);
              }
        }
        getTime(ItemDoiLich?.barber_id._id,day_Selected?.date)
  
    }, [ItemDoiLich,day_Selected])


  const HandalDoiLich =async ()=>{
    console.log("oke",ItemDoiLich)
    const appointment={
      appointment_time:time_Selected, 
      appointment_date :day_Selected.date
    }
      const response =await updateAppointmentTime(ItemDoiLich._id,appointment)
      if(response){
        setModalDoiLich(false)
        Alert.alert("cập nhật thành công")
        getApi()
      }
  }  
  const StarRating = () => {
    return (
      <View style={styles.Sumsao}>
        <Text style={styles.textdanhgia}>
          Mời Anh Giá Chất Lượng Dịch Vụ
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text
                style={[
                  styles.star,
                  {color: star <= rating ? '#FFD700' : '#E0E0E0'},
                ]}>
                {star <= rating ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    console.log('item: ', item);
    return (
      <View
        style={{
          margin: 12,
          borderWidth: 1,
          borderColor: colors.primary,
          height: 210,
          borderRadius: 8,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 12,
          }}>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: colors.primary}}>
            Lịch hẹn
          </Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image
            source={require('../../Resources/assets/logo/Bee_Barber.png')}
          />
          {/* <TouchableOpacity onPress={()=>{HandalDeleteModal(item)}}>
          <Image
            style={{width:20,height:20,marginStart:8}}
            source={require('../../Resources/assets/icons/delete.png')}
          /></TouchableOpacity> */}
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:4}}>
           <View style={{flexDirection:'row'}}>
               <Image source={require('../../Resources/assets/icons/calendarfill.jpg')} style={{width:24,height:24}}/>
               <Text style={{color:'gray'}}>   {item.appointment_date.split("T")[0]}</Text>
           </View>
           <View style={{flexDirection:'row'}}>
               <Image source={require('../../Resources/assets/icons/clock.png')} style={{width:24,height:24}}/>
               <Text style={{color:'gray'}}>  {item.appointment_time} </Text>
           </View>
        </View>
        <View style={{marginStart: 12}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../../Resources/assets/images/men.png')} style={{width:24,height:24,marginStart:-4}}/>
          <Text style={{marginVertical: 2,color:colors.primary100}}>
              {item.barber_id.name}
          </Text>
          </View>
          <View style={{flexDirection:'row',}}>
          <Text style={{color:colors.primary100}}>
            Dịch vụ:    </Text>
          <FlatList
            style={{marginVertical:2}}
            data={item.service_id}
            horizontal={true}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              const url = replaceLocalhostWithIP(item.images);
              return ( <Text style={styles.textName}>{item.name}, </Text>);
            }}
          />
         
        </View>
       <Text style={{color:colors.primary100,marginVertical:2}}>Thanh toán {item.payment?.pay_method=='cash'? 'tại quầy' :'ZaloPay'} {item.price} VND</Text>
       <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          {item.payment?.pay_method_status === 'Unpaid'? <View><Text style={{color:'red'}}>Chưa thanh toán</Text></View>:
          item.payment?.pay_method_status === 'Success'? <View><Text style={{color:'green'}}>Đã thanh toán</Text></View>:
          item.payment?.pay_method_status === 'Norefundyet'? <View><Text style={{color:'orange'}}>Đã hủy lịch hoàn tiền trong 24h tới</Text></View>:
          item.payment?.pay_method_status === 'Refunded'? <View><Text style={{color:'green'}}>Đã hoàn tiền</Text></View>:<View></View>}
            {item.appointment_status === 'pending' ? 
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{setItemDoiLich(item); setModalDoiLich(true); settime_Selected(item?.appointment_time);}}>
                <View style={{width:80,height:35,borderWidth:1,borderColor:colors.primary300,borderRadius:24,justifyContent:'center',alignItems:'center'}}><Text style={{color:colors.primary200}}>Đổi lịch</Text></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{HandalModalHuyLich(item)}}>
                <View style={{marginStart:4,width:80,height:35,borderWidth:1,borderColor:colors.primary300,borderRadius:24,justifyContent:'center',alignItems:'center'}}><Text style={{color:colors.primary200}}>Hủy lịch</Text></View>
              </TouchableOpacity>
            </View> :
            item.appointment_status === 'inuse' ? <View style={{flexDirection:'row'}}><Text style={{color:'green'}}>Đang cắt</Text></View>:
            item.appointment_status === 'completed' ? <View style={{flexDirection:'row'}}><Text style={{color:'green'}}>Đã cắt</Text>
            <TouchableOpacity onPress={()=>{setisRating(true);setItemRating(item)}}><Text  style={{color:'blue'}}>     Đánh giá ngay</Text></TouchableOpacity></View> :
            item.appointment_status === 'canceled' ? <View><Text style={{color:'red'}}>Đã hủy</Text></View> :
            item.appointment_status === 'Evaluate' ? <View><Text style={{color:'blue'}}>Đã đánh giá</Text></View> :<View></View>}
       </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={datahisStory}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={()=>{isLogin === true? <TouchableOpacity><Text>Đăng nhập ngày để trải nhiệm dịch vụ</Text></TouchableOpacity>:null}}
        ListEmptyComponent={() => {
          return isLogin === true? <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')}}><Text style={{textAlign:'center',fontSize:16,margin:12,textDecorationLine: 'underline',color:colors.primary}}>Đăng nhập ngày để trải nhiệm dịch vụ</Text></TouchableOpacity>:<Text>Bạn chưa có lịch hẹn nào </Text>
        }}
      />
      <Modal visible={isRating} animationType='slide' transparent={true}>
        <View style={{flex:1,justifyContent:'flex-end'}}>
             <TouchableOpacity style={{flex:1}} onPress={()=>{setisRating(false)}}></TouchableOpacity>
             <View style={{height:240,width:'100%',backgroundColor:'white',alignItems:'center'}}>
               <StarRating/>
                  <TouchableOpacity onPress={()=>{HandalReview()}}>
                  <View style={{height: 45,width:120, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Gửi</Text>
                  </View>
                </TouchableOpacity>
             </View>
        </View>
      </Modal>
      <Modal  visible={isCancedal} animationType='slide' transparent={true}>
        <View style={{flex:1,justifyContent:'flex-end'}}>
             <TouchableOpacity style={{flex:1}} onPress={()=>{setisCancedal(false)}}></TouchableOpacity>
             <View style={{height:240,width:'100%',backgroundColor:'white',alignItems:'center'}}>
               <Text style={styles.textdanhgia}>Nhập thông tin tài khoản hoàn tiền</Text>
                <TextInput data={bank_account} onChangeText={text =>{setbank_account(text)}} numberOfLines={3} placeholder='Thông tin tài khoản' style={{borderWidth:1,width:300,marginVertical:24,borderRadius:12}}/>
                  <TouchableOpacity onPress={()=>{capnhathuy()}}>
                  <View style={{height: 45,width:120, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Xác nhận</Text>
                  </View>
                </TouchableOpacity>
             </View>
        </View>
      </Modal>

      {/* modal xóa */}
      <Modal visible={ModalDelete} animationType='slide' transparent={true} >
           <View style={{flex:1,justifyContent:'center',backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
              <View style={{height:180,backgroundColor:'white',margin:32,borderRadius:4,alignItems:'center',justifyContent:'space-around'}}>
                   <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>Xác nhận xóa</Text>
                   <Text style={{fontSize:17}}>Bạn có muốn xóa lịch hẹn này không ?</Text>
                   <View style={{flexDirection:'row'}}>
                     <TouchableOpacity onPress={()=>{setModalDelete(false)}}>
                       <View style={{height:45,width:120,borderWidth:1,borderColor:colors.primary,borderRadius:8,marginHorizontal:12,justifyContent:'center',alignItems:'center'}}>
                       <Text style={{color:colors.primary,fontWeight:'bold'}}>Không</Text>
                       </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>{handelDelete()}}>
                       <View style={{height:45,width:120,marginHorizontal:12,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',borderRadius:8}}>
                       <Text style={{fontWeight:'bold',color:'white'}}>Đồng ý</Text>
                       </View>
                     </TouchableOpacity>
                   </View>
              </View>
           </View>
      </Modal>
        
        {/* Hủy lịch */}
      <Modal visible={ModalHuyLich} animationType='slide' transparent={true} >
           <View style={{flex:1,justifyContent:'center',backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
              <View style={{height:180,backgroundColor:'white',margin:32,borderRadius:4,alignItems:'center',justifyContent:'space-around'}}>
                   <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>Xác nhận hủy lịch</Text>
                   <Text style={{fontSize:17}}>Bạn có muốn hủy lịch hẹn không ?</Text>
                   <View style={{flexDirection:'row'}}>
                     <TouchableOpacity onPress={()=>{setModalHuyLich(false)}}>
                       <View style={{height:45,width:120,borderWidth:1,borderColor:colors.primary,borderRadius:8,marginHorizontal:12,justifyContent:'center',alignItems:'center'}}>
                       <Text style={{color:colors.primary,fontWeight:'bold'}}>Không</Text>
                       </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>{Handalcanceled()}}>
                       <View style={{height:45,width:120,marginHorizontal:12,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',borderRadius:8}}>
                       <Text style={{fontWeight:'bold',color:'white'}}>Đồng ý</Text>
                       </View>
                     </TouchableOpacity>
                   </View>
              </View>
           </View>
      </Modal>

      {/* modal đổi lịch hẹn */}
      <Modal visible={ModalDoiLich}>
        
         <View style={{flex:1,alignItems:'center'}}>
          <Text style={{marginTop:32,fontSize:24}}>Đổi lịch hẹn</Text>
                      {/* Thông tin lịch hẹn  */}
                     <View
                        style={{
                          margin: 12,
                          borderWidth: 1,
                          borderColor: colors.primary,
                          height: 210,
                          borderRadius: 8,
                          backgroundColor: 'white',
                          paddingHorizontal:18
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 12,
                          }}>
                          <Text
                            style={{fontSize: 16, fontWeight: 'bold', color: colors.primary}}>
                            Lịch hẹn
                          </Text>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Image
                            source={require('../../Resources/assets/logo/Bee_Barber.png')}
                          />
                          {/* <TouchableOpacity onPress={()=>{HandalDeleteModal(item)}}>
                          <Image
                            style={{width:20,height:20,marginStart:8}}
                            source={require('../../Resources/assets/icons/delete.png')}
                          /></TouchableOpacity> */}
                          </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:4}}>
                          <View style={{flexDirection:'row'}}>
                              <Image source={require('../../Resources/assets/icons/calendarfill.jpg')} style={{width:24,height:24}}/>
                              <Text style={{color:'gray'}}>   {ItemDoiLich?.appointment_date.split("T")[0]}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                              <Image source={require('../../Resources/assets/icons/clock.png')} style={{width:24,height:24}}/>
                              <Text style={{color:'gray'}}>  {ItemDoiLich?.appointment_time} </Text>
                          </View>
                        </View>
                        <View style={{marginStart: 12}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../Resources/assets/images/men.png')} style={{width:24,height:24,marginStart:-4}}/>
                          <Text style={{marginVertical: 2,color:colors.primary100}}>
                              {ItemDoiLich?.barber_id.name}
                          </Text>
                          </View>
                          <View style={{flexDirection:'row',}}>
                          <Text style={{color:colors.primary100}}>
                            Dịch vụ:    </Text>
                          <FlatList
                            style={{marginVertical:2}}
                            data={ItemDoiLich?.service_id}
                            horizontal={true}
                            keyExtractor={item => item._id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => {
                              const url = replaceLocalhostWithIP(item.images);
                              return ( <Text style={styles.textName}>{item.name}, </Text>);
                            }}
                          />
                        
                        </View>
                      <Text style={{color:colors.primary100,marginVertical:2}}>Thanh toán {ItemDoiLich?.payment?.pay_method=='cash'? 'tại quầy' :'ZaloPay'} {ItemDoiLich?.price} VND</Text>
                      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                          {ItemDoiLich?.payment?.pay_method_status === 'Unpaid'? <View><Text style={{color:'red'}}>Chưa thanh toán</Text></View>:
                          ItemDoiLich?.payment?.pay_method_status === 'Success'? <View><Text style={{color:'green'}}>Đã thanh toán</Text></View>:
                          ItemDoiLich?.payment?.pay_method_status === 'Norefundyet'? <View><Text style={{color:'orange'}}>Đã hủy lịch hoàn tiền trong 24h tới</Text></View>:
                          ItemDoiLich?.payment?.pay_method_status === 'Refunded'? <View><Text style={{color:'green'}}>Đã hoàn tiền</Text></View>:<View></View>}
                      </View>
                        </View>
                      </View>


                      {/* chọn ngày  */}
                      <View style={{ flex: 1, marginStart: 12 }}>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 45, alignItems: 'center', borderRadius: 6, marginTop: 12 }}>
                <Image style={{ width: 24, height: 24, marginHorizontal: 10, borderRadius: 4 }}
                  source={require('../../Resources/assets/icons/calendarfill.jpg')}
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* <Text style={{ color: 'black' }}>{selectedDay?.date == daylist[0]?.date ? 'Hôm nay,' : ''} {selectedDay?.dayOfWeek} ({fomatsDate(selectedDay?.date)})</Text> */}
                  <Text style={{ color: 'black' }}>
                    {day_Selected && day_Selected.date === (daylist[0]?.date || '') ? 'Hôm nay,' : ''}
                    {day_Selected?.dayOfWeek} ({day_Selected ? fomatsDate(day_Selected.date) : ''})
                  </Text>
                  <Text style={{ marginEnd: 24, fontSize: 18, color: 'black' }}>➪</Text>
                </View>
              </View>

              {/* danh sách ngày  */}

              <FlatList
                style={{ marginTop: 12, marginStart: 8 }}
                showsHorizontalScrollIndicator={false}
                data={daylist}
                horizontal={true}
                //  keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => {
                  const [year, month, day] = item.date.split("-");
                  const formattedDate = `${day}/${month}`;

                  const colorItem = day_Selected?.date == item.date ? colors.primary : colors.background
                  return <TouchableOpacity onPress={() => { setday_Selected(item) }}>
                    <View style={{ height: 40, width: 90, backgroundColor: colorItem, borderRadius: 6, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: day_Selected?.date == item.date ? 'white' : 'black', fontSize: 14, fontWeight: 'bold' }}>{daylist[0].date == item.date ? 'Hôm nay' : fomatsDate(item.date)}</Text>
                    </View>
                  </TouchableOpacity>
                }
                }
              />
              <TimeSelectionComponent
                availableTimes={listTimes}
                listTimes={time}
                selectedTime={time_Selected}
                onTimeSelect={handleTimeSelect}
              />
              <View style={{ height: 20 }}>
              </View>
            </View>
               
               <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{setModalDoiLich(false)}}>
                       <View style={{height:45,width:120,marginHorizontal:12,borderWidth:1,borderColor:colors.primary,justifyContent:'center',alignItems:'center',borderRadius:8}}>
                       <Text style={{fontWeight:'bold',color:colors.primary}}>Hủy</Text>
                       </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>{HandalDoiLich()}}>
                       <View style={{height:45,width:120,marginHorizontal:12,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',borderRadius:8}}>
                       <Text style={{fontWeight:'bold',color:'white'}}>Đổi lịch</Text>
                       </View>
                     </TouchableOpacity>
              </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: colors.white,
    paddingTop: 4,
    paddingHorizontal: 20,
  },
  centeredContainer: {
    flex: 1, // Đảm bảo chiếm toàn bộ không gian trong View
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  emptyList: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  customIcon: {
    width: 20,
    height: 20,
    marginTop: 3,
  },
  headerText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemContainer: {
    marginVertical: 10,
  },
  statusText: {
    color: '#003399',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E0E0E0',
  },
  appointmentText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  highlight: {
    color: 'red',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  infoText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
    height: 40,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionButton: {
    backgroundColor: '#3333FF',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  directionButtonText: {
    color: 'white',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection:'row',
    marginVertical: 20,
  },
  textdanhgia: {
    marginTop:24,
    fontSize: 15,
    fontWeight: 'bold',
    color:colors.primary,
    textTransform: 'uppercase',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: 50,
    marginRight: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.darkGrey,
    marginVertical: 20,
  },
  buttonrang:{width:100,height:40,borderWidth:1,borderColor:colors.primary300,borderRadius:24,justifyContent:'center',alignItems:'center'}
});
