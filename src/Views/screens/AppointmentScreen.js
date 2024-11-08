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
import ButtonComponents from '../components/ui/Button';
import { get_list_barber } from '../../Services/utils/httpbarber';
import { get_List_Appointments } from '../../Services/utils/httpAppointmentScreen';

const AppointmentScreen = ({ route, navigation, onSelect }) => {
  const {
    selectedItems,
    selectedTime,
    onSelectedItemsChange,
    handleTimeSelect,
    methodPay,
    setmethodPay,
    setselectedStylist,
    selectedDay,
    setselectedDay,
    // selectedService,
  } = useBookingViewModel();

  const [daylist, setdaylist] = useState(null)

  const servicesFromRoute = route.params?.selectedServices || [];
  const { selectedServices = [] } = route.params || {}; // Lấy dữ liệu từ ServicesScreen  

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [stylistVisible, setStylistVisible] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [stylists, setStylists] = useState([]);
  // const [selectedDayType, setSelectedDayType] = useState(getDayType(date));
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [selectedService, setSelectedService] = useState([]); // Hoặc giá trị mặc định khác

  const [selectedStylistId, setSelectedStylistId] = useState(null); // State để lưu ID stylist đã chọn

  const listTimes = ["8:00", "8:20", "8:40", "9:00", "9:20", "9:40", "10:00", "10:20", "10:40",
    "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20",
    "14:40", "15:00", "15:20", "15:40", "16:00", "16:20", "16:40", "17:00", "17:20", "17:40", "18:00", "18:20",
    "18:40", "19:00", "19:20", "19:40", "20:00", "20:20", "20:40"]

  // Gọi API khi màn hình được tải
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_List_Appointments();
        setAvailableServices(data.services);
        setAvailableTimes(data.availableTimes);
        setStylists(data.stylists);
      } catch (error) {
        console.error('Error fetching appointments data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_list_barber(); // Gọi API để lấy danh sách barber
        console.log("Dữ liệu nhận được:", data); // In ra dữ liệu nhận được
        const formattedStylists = data.map(stylist => ({
          ...stylist,
          image: stylist.image ? replaceLocalhostWithIP(stylist.image) : null,
        }));
        setStylists(formattedStylists);
      } catch (error) {
        console.error('Error fetching barber data', error);
      }
    };

    fetchData();
  }, []);


  const handleSelect = (item) => {
    const isSelected = selectedStylistId === item._id;
    setSelectedStylistId(isSelected ? null : item._id);
    const newSelectedStylist = isSelected ? null : item; // Cập nhật stylist đã chọn
    onSelectedItemsChange(newSelectedStylist); // Gửi lên component cha
    setSelectedStylist(newSelectedStylist); // Đảm bảo sử dụng setSelectedStylist thay vì setselectedStylist
    console.log("Stylist được chọn:", newSelectedStylist);
  };


  const renderStylist = ({ item }) => {
    const isSelected = selectedStylistId === item._id; // Kiểm tra xem stylist có đang được chọn hay không
  }

  useEffect(() => {
    async function getDate() {
      const dayWeeks = await getNext7DaysWithWeekdays()
      setdaylist(dayWeeks)
      setselectedDay(dayWeeks[0])
    }
    getDate()
  }, [])

  const fomatsDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return '';
    const formattedDate = `${day}/${month}`;
    return formattedDate;
  }

  const Item_Barber = ({ item, setSelectedStylist }) => {
    const isSelected = selectedStylistId === item._id; // Kiểm tra xem stylist có đang được chọn hay không
    if (!item) {
      return null; // Hoặc có thể hiển thị một thông báo lỗi
    }

    console.log('item Barber', item);
    let checkSelected = 0;
    if (item._id === selectedStylist?._id) {
      checkSelected = 3;
    }
    const imageUrl = item.image ? replaceLocalhostWithIP(item.image) : require('../../Resources/assets/images/barberBackgroug.png');
    return <TouchableOpacity onPress={() => { handleSelect(item) }}><View style={{ width: 100, margin: 6, alignItems: 'center' }}>
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

  useEffect(() => {
    console.log('Dịch vụ đã chọn:', selectedService);
}, [selectedService]);

const handleServiceSelect = (service) => {
  // Cập nhật selectedService ở đây
  setSelectedService(service);
};

  const checkButtom = () => {
    if (selectedService && selectedStylist && selectedTime && selectedDay && methodPay) {
      return colors.primary
    } else {
      return 'gray'
    }
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
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ padding: 8, marginStart: 12 }}>
            <Image style={{ width: 26, height: 26 }}
              source={require('../../Resources/assets/icons/homeFill.png')}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Đặt lịch giữ chỗ</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={{ flexDirection: 'row' }}>
            {checkSTatus(selectedService.length > 0)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>1. Chọn dịch vụ</Text>

              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 45, alignItems: 'center', borderRadius: 6, marginTop: 12 }}>
                <View>
                  <View style={{ height: 8, width: 8, backgroundColor: 'red', borderRadius: 4, position: 'absolute', end: 4 }}></View>
                  <Image style={{ width: 24, height: 24, marginHorizontal: 10 }}
                    source={require('../../Resources/assets/icons/keocattoc.png')}
                  />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text onPress={() => { navigation.navigate('ServicesScreen', { selectedServices }) }}>
                    {selectedServices.length > 0
                      ? `Đã chọn ${selectedServices.length} dịch vụ`
                      : "Xem tất cả dịch vụ hấp dẫn"}
                  </Text>
                  <Text style={{ marginEnd: 24, fontSize: 18, color: 'black' }}>➪</Text>
                </View>

              </View>
              {/* {selectedServices.length === 0 && (
                // <Text style={styles.warningText}>Vui lòng chọn dịch vụ!</Text>
              )} */}

              {selectedServices && selectedServices.length > 0 ? (
                <View>
                  {selectedServices.map((service, index) => (
                    <Text key={index}>
                      {service.name} - {service.price}K
                    </Text>
                  ))}
                </View>
              ) : (
                <Text>Bạn chưa chọn dịch vụ nào</Text>
              )}

              {/* xử lý khi có dịch vụ được chọn */}
              <View style={{ height: 50 }}>

              </View>

            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: -4 }}>
            {checkSTatus(selectedStylist)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>2. Chọn Stylist</Text>
              <View >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Image style={{ width: 22, height: 22 }}
                    source={require('../../Resources/assets/icons/stylist.png')}
                  />
                  <Text style={{ textAlign: 'center', marginStart: 12, color: 'black', fontWeight: 'bold' }}>{selectedStylist ? selectedStylist?.name : 'Stylist'}</Text>
                </View>

                <FlatList
                  style={{ marginTop: 12 }}
                  data={stylists}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <Item_Barber item={item} setSelectedStylist={handleSelect} />} // Truyền setSelectedStylist
                />

              </View>

            </View>
          </View>



          <View style={{ flexDirection: 'row', marginTop: -4 }}>
            {checkSTatus(selectedDay && selectedTime)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>3. Chọn ngày & giờ</Text>

              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 45, alignItems: 'center', borderRadius: 6, marginTop: 12 }}>
                <Image style={{ width: 24, height: 24, marginHorizontal: 10, borderRadius: 4 }}
                  source={require('../../Resources/assets/icons/calendarfill.jpg')}
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* <Text style={{ color: 'black' }}>{selectedDay?.date == daylist[0]?.date ? 'Hôm nay,' : ''} {selectedDay?.dayOfWeek} ({fomatsDate(selectedDay?.date)})</Text> */}
                  <Text style={{ color: 'black' }}>
                    {selectedDay && selectedDay.date === (daylist[0]?.date || '') ? 'Hôm nay,' : ''}
                    {selectedDay?.dayOfWeek} ({selectedDay ? fomatsDate(selectedDay.date) : ''})
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

                  const colorItem = selectedDay?.date == item.date ? colors.primary : colors.background
                  return <TouchableOpacity onPress={() => { setselectedDay(item) }}>
                    <View style={{ height: 40, width: 90, backgroundColor: colorItem, borderRadius: 6, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: selectedDay?.date == item.date ? 'white' : 'black', fontSize: 14, fontWeight: 'bold' }}>{daylist[0].date == item.date ? 'Hôm nay' : fomatsDate(item.date)}</Text>
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
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
              />
              <View style={{ height: 80 }}>
                <Text style={{ marginTop: 12 }}>Tổng tiền dịch vụ : 1000 $</Text>
              </View>
            </View>
          </View>

          {/* phương thức thanh toán  */}
          <View style={{ flexDirection: 'row' }}>
            {checkSTatus(methodPay == 0 ? false : true)}
            <View style={{ flex: 1, marginStart: 12 }}>
              <Text style={styles.title}>4. Phương thức thanh toán</Text>
              <TouchableOpacity onPress={() => { setmethodPay(1) }}>
                <View style={[{ borderWidth: methodPay == 1 ? 2 : 0, borderColor: colors.primary200 }, { flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 60, alignItems: 'center', borderRadius: 12, marginTop: 12 }]}>
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
              <TouchableOpacity onPress={() => { setmethodPay(2) }}>
                <View style={[{ borderWidth: methodPay == 2 ? 2 : 0, borderColor: colors.primary200 }, { flex: 1, flexDirection: 'row', backgroundColor: colors.background, height: 60, alignItems: 'center', borderRadius: 12, marginTop: 12 }]}>
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
              <View style={{ height: 50 }}>

              </View>

            </View>
          </View>

          {/* bottom xác nhận  */}
          <View style={{ flexDirection: 'row', marginTop: -24, marginStart: 12, alignItems: 'center', paddingBottom: 24 }}>
            <View style={{ height: 2, width: 20, backgroundColor: checkButtom() }}>

            </View>
            <TouchableOpacity style={{ flex: 1 }}>
              <View style={{ flex: 1, height: 50, backgroundColor: checkButtom(), borderRadius: 8, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>Chốt giờ cắt</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginStart: -38
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
