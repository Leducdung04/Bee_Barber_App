import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../Resources/styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP';
import TimeSelectionComponent from '../components/TimeSelectionComponent';
import { useBookingViewModel } from '../../ViewModels/AppointmentModel';
import { fomatsDate } from '../../Services/utils/fomatsDate';
import SelectedServices from '../components/Appointment/SelectedServices';
import ItemService from '../components/Item/ItemService';
const AppointmentScreen = ({ route, navigation }) => {

  const {
    setmodalIsloading,
    modalIsloading,
    setmodalSucces,
    modalCheck,
    modalSucces,
    daylist,
    stylists,
    listTimes,
    handle_Order_Appointment,
    day_Selected,
    setday_Selected,
    dataChechZaloPay
  } = useBookingViewModel();

  const selectedServices = route.params?.selectedServices || [];
  // dữ liệu được chọn 
  const [barber_Selected, setbarber_Selected] = useState(null)
  const [time_Selected, settime_Selected] = useState(null)
  const [pay_Method, setpay_Method] = useState(null)
  const [totalAmount, settotalAmount] = useState(0)

  useEffect(() => {
    const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0);
    settotalAmount(totalPrice);
  }, [selectedServices])

  // xử lý chọn giờ 
  const handleTimeSelect = (time) => {
    settime_Selected(time);
  };
  useEffect(() => {
    console.log('dữ liệu code zalopay', dataChechZaloPay)
  }, [dataChechZaloPay])

  const onHandel_Order = async () => {
    setmodalIsloading(true)
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
    const appointment = {
      appointment: {
        barber_id: barber_Selected?._id,
        user_id: "66fe1856faa0e86597afdbae",
        service_id: selectedServices.map(item => item._id),
        appointment_time: time_Selected,
        appointment_date: day_Selected.date,
        appointment_status: "pending",
        price: totalAmount + '000',
      },
      payment: {
        user_id: "66fe1856faa0e86597afdbae",
        pay_type: "booking",
        pay_method: pay_Method,
        time: currentTime,
        date: currentDate.toISOString().split("T")[0],
        price: totalAmount
      }
    }

    console.log('data thêm ', appointment)
    handle_Order_Appointment(appointment)
  }
  const Item_Barber = ({ item }) => {
    if (!item) {
      return null;
    }
    let checkSelected = 0;
    if (item._id === barber_Selected?._id) {
      checkSelected = 3;
    }
    const imageUrl = item.image ? replaceLocalhostWithIP(item.image) : require('../../Resources/assets/images/barberBackgroug.png');
    return <TouchableOpacity onPress={() => { setbarber_Selected(item) }}><View style={{ width: 100, margin: 6, alignItems: 'center' }}>
      <View style={{ backgroundColor: colors.primary200, borderRadius: 12, padding: checkSelected }}>
        <View style={{ backgroundColor: '#c2dcf7', borderRadius: 8 }}>
          <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={{ width: 90, height: 170, borderRadius: 12 }} />
        </View>
      </View>
      <Text style={{ marginTop: 6, color: 'black' }}>{item.name}</Text>
    </View></TouchableOpacity>

  }
  const checkSTatus = (check) => {
    const colorcheck = check ? colors.primary : 'gray'
    return <View style={{ alignItems: 'center', width: 26 }}>
      <View style={{ height: check ? 24 : 16, width: check ? 24 : 16, backgroundColor: colorcheck, alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginTop: 4 }}>
        <Icon name="check" size={12} color={check ? 'white' : 'gray'} />
      </View>
      <View style={{ flex: 1, width: 2, backgroundColor: colorcheck }}>
      </View>
    </View>
  }

  const checkButtom = () => {
    if (selectedServices && barber_Selected && time_Selected && day_Selected && pay_Method) {
      return colors.primary
    } else {
      return 'gray'
    };
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar animated={true} backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
      <ScrollView
        style={{ flex: 1 }}
        bounces={true}               //  hiệu ứng "kéo đàn hồi" cho iOS
        overScrollMode="always"       //  hiệu ứng "kéo đàn hồi" cho Android
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ marginStart: 24 }}>
            <Image style={{ width: 26, height: 26 }}
              source={require('../../Resources/assets/icons/homeFill.png')}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Đặt lịch giữ chỗ</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row' }}>
            {checkSTatus(selectedServices.length === 0 ? false : true)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>1. Chọn dịch vụ</Text>

              <TouchableOpacity onPress={() => { navigation.navigate('ServicesScreen', { selectedServices }) }}><View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 45, alignItems: 'center', borderRadius: 6, marginTop: 12 }}>
                <View>
                  <View style={{ height: 8, width: 8, backgroundColor: 'red', borderRadius: 4, position: 'absolute', end: 4 }}></View>
                  <Image style={{ width: 24, height: 24, marginHorizontal: 10 }}
                    source={require('../../Resources/assets/icons/keocattoc.png')}
                  />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>
                    {selectedServices.length > 0
                      ? `Đã chọn ${selectedServices.length} dịch vụ`
                      : "Xem tất cả dịch vụ hấp dẫn"}
                  </Text>
                  <Text style={{ marginEnd: 24, fontSize: 18, color: 'black' }}>➪</Text>
                </View>

              </View></TouchableOpacity>
              {/* {selectedServices.length === 0 && (
                // <Text style={styles.warningText}>Vui lòng chọn dịch vụ!</Text>
              )} */}

              {selectedServices && selectedServices.length > 0 ?

                (
                  <SelectedServices list={selectedServices} />
                )
                : (
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text>Bạn chưa chọn dịch vụ nào</Text></View>
                )}
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: -4 }}>
            {checkSTatus(barber_Selected)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>2. Chọn Stylist</Text>
              <View >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Image style={{ width: 22, height: 22 }}
                    source={require('../../Resources/assets/icons/stylist.png')}
                  />
                  <Text style={{ textAlign: 'center', marginStart: 12, color: 'black', fontWeight: 'bold' }}>{barber_Selected ? barber_Selected?.name : 'Stylist'}</Text>
                </View>

                <FlatList
                  style={{ marginTop: 12 }}
                  data={stylists}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <Item_Barber item={item} />} // Truyền setSelectedStylist
                />

              </View>

            </View>
          </View>



          <View style={{ flexDirection: 'row', marginTop: -4 }}>
            {checkSTatus(day_Selected && time_Selected)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>3. Chọn ngày & giờ</Text>

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
              <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ marginStart: 8, width: 24, height: 24 }}
                  source={require('../../Resources/assets/icons/clock.png')}
                />
                <Text style={{ marginStart: 12, color: 'black' }}>Chọn giờ</Text>
              </View>
              <TimeSelectionComponent
                availableTimes={listTimes}
                selectedTime={time_Selected}
                onTimeSelect={handleTimeSelect}
              />
              <View style={{ height: 20 }}>
              </View>
            </View>
          </View>

          {/* phương thức thanh toán  */}
          <View style={{ flexDirection: 'row', marginTop: -4 }}>
            {checkSTatus(pay_Method)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>4. Phương thức thanh toán</Text>
              <TouchableOpacity onPress={() => { setpay_Method('ZaloPay') }}>
                <View style={[{ borderWidth: pay_Method == 'ZaloPay' ? 2 : 0, borderColor: colors.primary200 }, { flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 60, alignItems: 'center', borderRadius: 12, marginTop: 12 }]}>
                  <View>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }}
                      source={{ uri: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png' }}
                    />
                  </View>

                  <View style={{ marginStart: 12, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thanh toán ví ZaloPay</Text>
                  </View>

                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setpay_Method('cash') }}>
                <View style={[{ borderWidth: pay_Method == 'cash' ? 2 : 0, borderColor: colors.primary200 }, { flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 60, alignItems: 'center', borderRadius: 12, marginTop: 12 }]}>
                  <View>
                    <Image style={{ width: 26, height: 26, marginHorizontal: 10 }}
                      source={require('../../Resources/assets/icons/storeFill.png')}
                    />
                  </View>

                  <View style={{ marginStart: 12, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thanh toán tại cửa hàng</Text>
                  </View>

                </View>
              </TouchableOpacity>

              {/* xử lý khi có dịch vụ được chọn */}
              <View style={{ height: 90 }}>
                <Text style={{ marginTop: 24, fontSize: 18, fontWeight: 'bold', color: colors.primary }}>Tổng tiền dịch vụ : {totalAmount} K</Text>
              </View>

            </View>
          </View>

          {/* bottom xác nhận  */}
          <View style={{ flexDirection: 'row', marginTop: -24, marginStart: 12, alignItems: 'center', paddingBottom: 24 }}>
            <View style={{ height: 2, width: 20, backgroundColor: checkButtom() }}>

            </View>
            {selectedServices && barber_Selected && time_Selected && day_Selected && pay_Method ?
              <TouchableOpacity onPress={() => { onHandel_Order() }} style={{ flex: 1 }}>
                <View style={{ flex: 1, height: 50, backgroundColor: colors.primary, borderRadius: 8, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chốt giờ cắt</Text>
                </View>
              </TouchableOpacity>
              :
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, height: 50, backgroundColor: 'gray', borderRadius: 8, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chốt giờ cắt</Text>
                </View>
              </View>
            }

          </View>

          <Modal visible={modalCheck} animationType='fade' transparent={true}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
              <Text style={{ textAlign: 'center', marginTop: 32, fontSize: 20, fontWeight: 'bold', color: 'green' }}>Bạn đang có giao dịch </Text>
              <View style={{ backgroundColor: 'white', marginHorizontal: 24, borderRadius: 24, marginTop: 24 }}>
                <Image source={require('../../Resources/assets/logo/Bee_Barber.png')} style={{ width: 120, height: 22, margin: 12 }} />
                <View style={{ marginStart: 12 }}>
                  <Text style={{ fontWeight: 'bold', color: colors.primary200 }}>Đặt lịch cắt tóc</Text>
                  <View>
                    <Text style={{ marginVertical: 4 }}>Barber : {barber_Selected?.name}</Text>
                    <Text style={{ marginVertical: 4 }}>Danh sách dịch vụ : {selectedServices.length}</Text>
                    <Text style={{ marginVertical: 4 }}>Tổng tiền : <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{totalAmount}.000</Text></Text>
                    <FlatList style={{ marginEnd: 12, marginBottom: 12 }} data={selectedServices}
                      horizontal={true}
                      keyExtractor={(item) => item.id}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => {
                        const url = replaceLocalhostWithIP(item.images)
                        return (
                          <View style={{ width: 120, backgroundColor: colors.background, margin: 6, borderRadius: 12, padding: 4 }}>
                            <Text style={styles.textName}>{item.name}</Text>
                            <Image source={{ uri: url }} style={{ width: 100, height: 80, borderRadius: 8 }} />

                            <View style={{ flexDirection: 'row', marginTop: 24, bottom: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                              <Text style={{ color: colors.primary200, textAlign: 'center' }}>{item.duration}'</Text>
                              <Text style={{ color: colors.primary, fontWeight: 'bold', textAlign: 'center' }}>{item.price}k</Text>

                            </View>
                          </View>
                        )
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                <Image style={{ width: 80, height: 80 }} source={dataChechZaloPay?.return_code === 1 ? require('../../Resources/assets/icons/Success.png') : require('../../Resources/assets/icons/filled.png')} />
              </View>

              <Text style={{ textAlign: 'center', marginTop: 12, fontSize: 16, color: dataChechZaloPay?.return_code === 1 ? 'green' : 'red' }}>{dataChechZaloPay?.return_message}</Text>

              {dataChechZaloPay?.return_code === 1 ? <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('title3') }}>
                  <View style={{ width: 100, height: 45, borderWidth: 1, borderColor: colors.primary100, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40, backgroundColor: colors.primary }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>OK</Text>
                  </View>
                </TouchableOpacity>
              </View> :
                <View style={{ flexDirection: 'row' }}>

                </View>}
            </View>
          </Modal>

          <Modal visible={modalSucces} animationType='fade'>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, marginBottom: 60 }}>Đặt lịch thành công</Text>
              <Image source={require('../../Resources/assets/icons/Success.png')} style={{ width: 80, height: 80 }} />
              <TouchableOpacity onPress={() => { setmodalSucces(false); navigation.navigate('title3') }}>
                <View style={{ width: 100, height: 45, borderWidth: 1, borderColor: colors.primary100, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                  <Text style={{ fontWeight: 'bold', color: colors.primary }}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal visible={modalIsloading} animationType='fade' transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 120, height: 120, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                <ActivityIndicator size={50} color={colors.primary} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView >

  )
}

export default AppointmentScreen

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,  // Điều chỉnh khoảng cách từ đầu
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center'
  },
  titleHeader: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginStart: 50

  },
  contentContainer: {
    paddingHorizontal: 24,
    marginTop: 24
  },
  title: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  }
})
