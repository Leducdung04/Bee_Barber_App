import { Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fileMapCacheDirectory } from '../../../metro.config'
import colors from '../../Resources/styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP';
import { getNext7DaysWithWeekdays } from '../../Services/utils/getNext7DaysWithWeekdays';
import TimeSelectionComponent from '../components/TimeSelectionComponent';
import { useBookingViewModel } from '../../ViewModels/AppointmentModel';

const AppointmentScreen = ({navigation}) => {
  const {
    selectedItems,
    selectedTime,
    onSelectedItemsChange,
    handleTimeSelect,
    methodPay,
    setmethodPay,
    selectedStylist,
    setselectedStylist,
    selectedDay,
    setselectedDay,
    selectedService,
  } = useBookingViewModel();

  const [daylist, setdaylist] = useState([])

  const StylistData=[
    {"__v": 0, "_id": "6711b259c57463d5e39358a4", "experience": 8, "image": null, "name": "Hồng Quân ", "status": true},
    {"__v": 0, "_id": "6711b0fdc57463d5e393589c", "experience": 8, "image": null, "name": "Thành Long", "status": true},
    {"__v": 0, "_id": "6711b21fc57463d5e393589e", "experience": 10, "image": "http://localhost:3000/uploads/image-1729212959814.png", "name": "Hùng Đỗ", "status": true},
    {"__v": 0, "_id": "6711b24ec57463d5e39358a2", "experience": 4, "image": "http://localhost:3000/uploads/image-1729213448605.png", "name": "Đức Dũng", "status": true},
    {"__v": 0, "_id": "6711b22fc57463d5e39358a0", "experience": 10, "image": null, "name": "Hoàng Nam", "status": true}
  ]
  const listTimes =["8:00","8:20","8:40","9:00","9:20","9:40", "10:00", "10:20", "10:40", 
    "11:00","11:20","11:40","12:00","12:20","12:40","13:00","13:20","13:40","14:00","14:20",
    "14:40","15:00","15:20","15:40","16:00","16:20","16:40","17:00","17:20","17:40","18:00","18:20",
    "18:40","19:00","19:20","19:40","20:00","20:20","20:40"]
  useEffect(()=>{
    async function getDate(){
      const dayWeeks= await getNext7DaysWithWeekdays()
      setdaylist(dayWeeks)
      setselectedDay(dayWeeks[0])
    }
    getDate()
  },[])

  const fomatsDate=(date)=>{
    if (!date) return ''; 
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return ''; 
    const formattedDate = `${day}/${month}`;
    return formattedDate;
  }

  const Item_Barber=({item})=>{
    console.log('item Barber',item)
    let checkSelected =0
     if(item._id == selectedStylist?._id){
         checkSelected =3
     }
     const imageUrl = item.image ? replaceLocalhostWithIP(item.image) : require('../../Resources/assets/images/barberBackgroug.png');
     return <TouchableOpacity onPress={()=>{setselectedStylist(item)}}><View style={{width:100,margin:6,alignItems:'center'}}>
              <View style={{backgroundColor:colors.primary200,borderRadius:12,padding:checkSelected}}>
           <View style={{backgroundColor:'#c2dcf7',borderRadius:8}}>
              <Image  source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={{width:90,height:170,borderRadius:12}}/>
           </View>
           </View>
           <Text style={{marginTop:6,color:'black'}}>{item.name}</Text>
     </View></TouchableOpacity> 
    
 }
  const checkSTatus= (check)=>{
     const colorcheck = check ? colors.primary:'gray'
     return  <View style={{alignItems:'center',width:26}}>
              <View style={{height:check ? 24:16,width:check ? 24:16,backgroundColor:colorcheck,alignItems:'center',justifyContent:'center',borderRadius:12,marginTop:4}}>
                  <Icon name="check" size={12} color={check?'white':'gray'} />
              </View>
              <View style={{flex:1,width:2,backgroundColor:colorcheck}}>
              </View>
            </View>
  }

  const checkButtom=()=>{
    if(selectedService && selectedStylist && selectedTime && selectedDay && methodPay){
      return colors.primary
    }else{
      return 'gray'
    }
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <StatusBar  animated={true} backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <ScrollView 
        style={{flex:1}}  
        bounces={true}               //  hiệu ứng "kéo đàn hồi" cho iOS
        overScrollMode="always"       //  hiệu ứng "kéo đàn hồi" cho Android
        >
           <View style={styles.header}>
              <TouchableOpacity onPress={()=>{Alert.alert('ok')}}>
                <Image style={{width:26,height:26,marginStart:12}}
                      source={require('../../Resources/assets/icons/homeFill.png')} 
                />
              </TouchableOpacity>
             <Text style={styles.titleHeader}>Đặt lịch giữ chỗ</Text>
           </View>

           <View style={styles.contentContainer}>
              <View style={{flexDirection:'row'}}>
                   {checkSTatus(selectedService)}
                  <View style={{flex:1,marginStart:12}}>
                       <Text style={styles.title}>1. Chọn dịch vụ</Text>

                       <View style={{flex:1,flexDirection:'row', backgroundColor:colors.background,height:45,alignItems:'center',borderRadius:6,marginTop:12}}>
                            <View>
                               <View style={{height:8,width:8,backgroundColor:'red',borderRadius:4,position:'absolute',end:4}}></View>
                              <Image style={{width:24,height:24,marginHorizontal:10}}
                                  source={require('../../Resources/assets/icons/keocattoc.png')} 
                              />
                            </View>
                          
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text>Xem tất cả dịch vụ hấp dẫn</Text>
                            <Text style={{marginEnd:24,fontSize:18,color:'black'}}>➪</Text>
                            </View>
                          
                       </View>

                       {/* xử lý khi có dịch vụ được chọn */}
                       <View style={{height:50}}>

                       </View>

                  </View>
              </View>

              <View style={{flexDirection:'row',marginTop:-4}}>
                     {checkSTatus(selectedStylist)}
                  <View style={{flex:1,marginStart:12}}>
                       <Text style={styles.title}>2. Chọn Stylist</Text>
                       <View >
                           <View style={{flexDirection:'row',alignItems:'center',marginTop:12}}>
                              <Image style={{width:22,height:22}}
                                          source={require('../../Resources/assets/icons/stylist.png')} 
                                      />
                              <Text style={{textAlign:'center',marginStart:12,color:'black',fontWeight:'bold'}}>{selectedStylist ? selectedStylist?.name:'Stylist'}</Text>
                           </View>

                           {/* // danh sách hiển thị barber */}
                           <FlatList
                              style={{marginTop:12}}
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              data={StylistData}
                              keyExtractor={(item) => item._id.toString()}
                              renderItem={({item})=> <Item_Barber item={item}/>}
                            />

                       </View>

                  </View>
              </View>



              <View style={{flexDirection:'row',marginTop:-4}}>
                     {checkSTatus(selectedDay&&selectedTime)}
                  <View style={{flex:1,marginStart:12}}>
                       <Text style={styles.title}>3. Chọn ngày & giờ</Text>
                       
                       <View style={{flex:1,flexDirection:'row', backgroundColor:colors.background,height:45,alignItems:'center',borderRadius:6,marginTop:12}}>
                              <Image style={{width:24,height:24,marginHorizontal:10,borderRadius:4}}
                                  source={require('../../Resources/assets/icons/calendarfill.jpg')} 
                              />
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{color:'black'}}>{selectedDay?.date == daylist[0]?.date ?'Hôm nay,':'' } {selectedDay?.dayOfWeek} ({fomatsDate(selectedDay?.date)})</Text>
                            <Text style={{marginEnd:24,fontSize:18,color:'black'}}>➪</Text>
                            </View>
                       </View>

                       {/* danh sách ngày  */}

                       <FlatList 
                            style={{marginTop:12,marginStart:8}}
                            showsHorizontalScrollIndicator={false}
                             data={daylist}
                             horizontal={true}
                            //  keyExtractor={(item) => item.toString()}
                             renderItem={({item}) =>{ 
                              const [year, month, day] = item.date.split("-");
                              const formattedDate = `${day}/${month}`;

                              const colorItem= selectedDay?.date == item.date? colors.primary :colors.background
                             return <TouchableOpacity onPress={()=>{setselectedDay(item)}}>
                              <View style={{height:40,width:90,backgroundColor:colorItem,borderRadius:6,marginRight:12,alignItems:'center',justifyContent:'center'}}>
                                  <Text style={{color:selectedDay?.date == item.date? 'white':'black',fontSize:14,fontWeight:'bold'}}>{daylist[0].date == item.date?'Hôm nay' : fomatsDate(item.date)}</Text>
                              </View>
                              </TouchableOpacity>}
                            }
                       />
                        <View style={{marginVertical:16,flexDirection:'row',alignItems:'center'}}>
                        <Image style={{marginStart:8,width:24,height:24}}
                                          source={require('../../Resources/assets/icons/clock.png')} 
                                      />
                          <Text style={{marginStart:12,color:'black'}}>Chọn giờ</Text>
                        </View>
                        <TimeSelectionComponent
                          availableTimes={listTimes}
                          selectedTime={selectedTime}
                          onTimeSelect={handleTimeSelect}
                        />
                        <View style={{height:80}}>
                        <Text style={{marginTop:12}}>Tổng tiền dịch vụ : 1000 $</Text>
                        </View>
                  </View>
              </View>

               {/* phương thức thanh toán  */}
               <View style={{flexDirection:'row'}}>
                   {checkSTatus(methodPay ==0? false:true)}
                  <View style={{flex:1,marginStart:12}}>
                       <Text style={styles.title}>4. Phương thức thanh toán</Text>
                      <TouchableOpacity onPress={()=>{setmethodPay(1)}}>
                       <View style={[{borderWidth: methodPay==1? 2:0,borderColor:colors.primary200},{flex:1,flexDirection:'row', backgroundColor:colors.background,height:60,alignItems:'center',borderRadius:12,marginTop:12}]}>
                            <View>
                              <Image style={{width:30,height:30,marginHorizontal:10}}
                                  source={{uri:'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png'}} 
                              />
                            </View>
                          
                            <View style={{marginStart:12,flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Thanh toán ví ZaloPay</Text>
                            </View>
                        
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=>{setmethodPay(2)}}>
                       <View style={[{borderWidth: methodPay==2? 2:0,borderColor:colors.primary200},{flex:1,flexDirection:'row', backgroundColor:colors.background,height:60,alignItems:'center',borderRadius:12,marginTop:12}]}>
                            <View>
                              <Image style={{width:26,height:26,marginHorizontal:10}}
                                  source={require('../../Resources/assets/icons/storeFill.png')} 
                              />
                            </View>
                          
                            <View style={{marginStart:12,flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Thanh toán tại cửa hàng</Text>
                            </View>
                        
                       </View>
                       </TouchableOpacity>

                       {/* xử lý khi có dịch vụ được chọn */}
                       <View style={{height:50}}>

                       </View>

                  </View>
              </View>

              {/* bottom xác nhận  */}
              <View style={{flexDirection:'row',marginTop:-24,marginStart:12,alignItems:'center',paddingBottom:24}}>
                 <View style={{height:2,width:20,backgroundColor:checkButtom()}}>

                 </View>
                 <TouchableOpacity style={{flex:1}}>
                   <View style={{flex:1,height:50,backgroundColor:checkButtom(),borderRadius:8,justifyContent:'center'}}>
                      <Text style={{textAlign:'center',color:'white',fontSize:20,fontWeight:'bold'}}>Chốt giờ cắt</Text>
                   </View>
                 </TouchableOpacity>
              </View>
           </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AppointmentScreen

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,  // Điều chỉnh khoảng cách từ đầu
  },
  header:{
      height:60,
      flexDirection:'row',
      backgroundColor:colors.background,
      alignItems:'center'
  },
  titleHeader:{
    color:colors.primary,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    flex:1,
    marginStart:-38
  },
  contentContainer: {
    paddingHorizontal:24,
    marginTop:24
  },
  title:{
    color:colors.primary,
    fontSize:18,
    fontWeight:'bold',
  }
})
