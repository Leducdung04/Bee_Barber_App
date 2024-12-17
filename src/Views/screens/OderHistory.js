import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { get_oder_history, updateOderStatusToCancelel_Case, updateOderStatusToCancelel_ZaloPay } from '../../Services/api/httpOder';
import colors from '../../Resources/styles/colors';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { isAnimatedValue } from 'react-native-paper/lib/typescript/styles/overlay';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP';
import { ProducByID } from '../../Services/api/httpProduct';

const statuses = ["Tất Cả", "Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy"];
const OderHistory = () => {
  
    const [ListOder, setListOder] = useState([])
    const [isCancedal, setisCancedal] = useState(false)
    const [idOder, setidOder] = useState(null)
    const [bank_account, setbank_account] = useState('')
    const [selectedStatus, setSelectedStatus] = useState("Tất Cả");
     const getdata=async()=>{
      const data= await  get_oder_history()
      setListOder(data)
    }
    useFocusEffect(
        React.useCallback(() => {
          // Hàm này sẽ được gọi mỗi khi màn hình/tab này được focus
         
         getdata()
          return () => {
            // Cleanup nếu cần khi màn hình/tab bị unfocus
          };
        }, [])
      );
    const handel = (item)=>{
        Alert.alert("Xác nhận hủy lịch", "Bạn có chắc muốn hủy lịch hẹn này?", [
            {
              text: "No",
              onPress: () => console.log("Người dùng đã chọn No"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async() => {
                if(item.payment.pay_method == 'ZaloPay'){
                  setidOder(item?._id)
                  setisCancedal(true)
                }else{
                  const reponse=  await  updateOderStatusToCancelel_Case(item._id)
                  if(reponse){
                     getdata()
                  }
                   
                }
              },
            }] ,{ cancelable: true })
      console.log('hủy',item)
      
    }
    const handelHuy=async()=>{
      if(bank_account == ''){
         Alert.alert('Vui lòng nhập số tài khoản ')
         return
      }
     const data= await updateOderStatusToCancelel_ZaloPay(idOder,bank_account)
     if(data){
      getdata()
      setisCancedal(false)
     }else{
      Alert.alert('Xảy ra lỗi vui lòng thử lại')
     }
    }
 const Item = ({item}) => {
    console.log('item', item)
      return <View style={{paddingBottom:10,minHeight:160,backgroundColor:'white',marginVertical:8,marginHorizontal:12,borderRadius:12}}>
                 <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 12,
                    }}>
                    <Text
                        style={{fontSize: 16, fontWeight: 'bold', color: colors.primary}}>
                        Đơn hàng
                    </Text>
                    <Image
                        style={{width:140,height:24}}
                        source={require('../../Resources/assets/logo/Bee_Barber.png')}
                    />
                    </View>
                    <FlatList data={item.listProduct}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>{
                               console.log('hihi',item)
                                const uri = replaceLocalhostWithIP(item?.image)
                               
                            return <View>
                                  <View style={{flexDirection:'row'}}>
                                  <Image style={{width:100,height:80}} source={{uri:uri}}/>
                                  <View>
                                  <Text numberOfLines={2} style={{width:100}}>{item?.name}</Text>
                                  <Text style={{color:'orange'}}>sl {item.quantity} price : {item.price_selling}</Text>
                                  </View>
                                </View>
                               
                            </View>
                        }}
                    />
                    <Text style={{marginStart:12}}>Địa chỉ nhận : {item.location}</Text>
                    <Text style={{marginStart:12,color:'orange',fontWeight:'bold'}}>{item.total_price_import} VND</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    {item.payment?.pay_method_status === 'Unpaid'? <View><Text style={{color:'red'}}>Chưa thanh toán</Text></View>:
                    item.payment?.pay_method_status === 'Success'? <View><Text style={{color:'green'}}>Đã thanh toán</Text></View>:
                    item.payment?.pay_method_status === 'canceled'? <View><Text style={{color:'orange'}}>Đã hủy lịch hoàn tiền trong 24h tới</Text></View>:
                    item.payment?.pay_method_status === 'Refunded'? <View><Text style={{color:'green'}}>Đã hoàn tiền</Text></View>:<View></View>}
                        {item.status === 'pending' ?<View style={{flexDirection:'row'}}><Text style={{color:'orange'}}>Chờ xác nhận   </Text><TouchableOpacity onPress={()=>{handel(item)}}><View style={{width:100,height:40,borderWidth:1,borderColor:colors.primary300,borderRadius:24,justifyContent:'center',alignItems:'center',marginTop:-8}}><Text style={{color:colors.primary200}}>Hủy đơn</Text></View></TouchableOpacity></View> :
                        item.status === 'active' ? <View style={{flexDirection:'row'}}><Text style={{color:'green'}}>Chuẩn bị gửi hàng</Text>
                       <Text  style={{color:'blue'}}>      Đã xác nhận</Text></View> :
                        item.status === 'trading' ? <View><Text style={{color:'blue'}}>Đang vận chuyển</Text></View> :
                        item.status === 'delivered' ? <View><Text style={{color:'green'}}>Đã giao </Text></View> :
                        item.status === 'deactive' ? <View><Text style={{color:'red'}}>Đã hủy</Text></View> :<View></View>}
             </View>
            </View>
 }

  return (
    <View style={{flex:1,backgroundColor:colors.background}}>
        {/* <FlatList data={statuses}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item=>item}
            renderItem={({item})=><TouchableOpacity><View style={{margin:12,backgroundColor:'white',height:30,paddingHorizontal:12,justifyContent:'center',alignItems:'center',borderRadius:12}}>
              <Text>{item}</Text>
              </View></TouchableOpacity>}
        /> */}
        <FlatList 
          data={ListOder}
          keyExtractor={Item=>Item._id}  
          renderItem={({item})=><Item item={item} />}
        />
         <Modal  visible={isCancedal} animationType='slide' transparent={true}>
        <View style={{flex:1,justifyContent:'flex-end'}}>
             <TouchableOpacity style={{flex:1}} onPress={()=>{setisCancedal(false)}}></TouchableOpacity>
             <View style={{height:240,width:'100%',backgroundColor:'white',alignItems:'center'}}>
               <Text style={styles.textdanhgia}>Nhập thông tin tài khoản hoàn tiền</Text>
                <TextInput data={bank_account} onChangeText={text=>{setbank_account(text)}} numberOfLines={3} placeholder='Thông tin tài khoản' style={{borderWidth:1,width:300,marginVertical:24,borderRadius:12}}/>
                  <TouchableOpacity onPress={()=>{handelHuy()}}>
                  <View style={{height: 45,width:120, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>Xác nhận</Text>
                  </View>
                </TouchableOpacity>
             </View>
        </View>
      </Modal>
    </View>
  )
}

export default OderHistory

const styles = StyleSheet.create({
})