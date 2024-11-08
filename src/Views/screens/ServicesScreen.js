import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, Alert, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { get_List_Services } from '../../Services/utils/httpServices';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP'; // Nhập hàm thay thế
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../../Resources/styles/colors';

const ServicesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [isSelected, setSelection] = useState(false);
  // const [selectedServices, setSelectedServices] = useState([]); // State lưu các dịch vụ đã chọn
  const route = useRoute(); // Để nhận tham số từ các màn hình khác
  const [selectedServices, setSelectedServices] = useState(route.params?.selectedServices || []);
  const [totalPrice, setTotalPrice] = useState(0); // Tính tổng tiền
  const [servicesData, setServicesData] = useState([]);
  const [services, setServices] = useState([]); // State lưu danh sách dịch vụ từ API
  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get('window');
  const ITEM_MARGIN = 10; // Khoảng cách giữa các item
  const ITEM_WIDTH = (width / 2) - ITEM_MARGIN - 20; // Chiều rộng của mỗi item

  // Fetch danh sách dịch vụ từ API khi màn hình được load
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      const services = await get_List_Services();
      if (Array.isArray(services) && services.length > 0) {
        // Thay thế localhost bằng IP nếu cần
        const formattedServices = services.map(service => ({
          ...service,
          images: service.images ? replaceLocalhostWithIP(service.images) : null,
        }));
        setServicesData(formattedServices);
      } else {
        console.warn("Dữ liệu từ API không hợp lệ hoặc không có");
      }
      setIsLoading(false);
    };

    fetchServices();
  }, []);

  // Lọc dịch vụ theo search query
  const filteredData = servicesData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Khi quay lại ServicesScreen, cập nhật lại trạng thái selectedServices


  useEffect(() => {
    if (route.params?.selectedServices) {
      console.log('Dịch vụ nhận được trong AppointmentScreen:', route.params.selectedServices); // Log received services
      setServices(route.params.selectedServices);
    }
  }, [route.params?.selectedServices]);

  useEffect(() => {
    if (route.params?.selectedServices) {
      setSelectedServices(route.params.selectedServices);
      const price = route.params.selectedServices.reduce((total, service) => total + parseFloat(service.price), 0);
      setTotalPrice(price);
    }
  }, [route.params?.selectedServices]);

  // Hàm để thêm dịch vụ vào danh sách đã chọn
  const handleAddService = (item) => {
    setSelectedServices(prev => {
      const alreadySelected = prev.some(service => service.name === item.name);

      let updatedServices;
      if (alreadySelected) {
        updatedServices = prev.filter(service => service.name !== item.name);
      } else {
        updatedServices = [...prev, item];
      }

      console.log('Updated Services:', updatedServices); // Log updated services
      setTotalPrice(updatedServices.reduce((total, service) => total + parseFloat(service.price), 0));

      return updatedServices;
    });
  };


  // Hàm khi bấm vào nút "Done"
  const handleDone = () => {
    console.log('Dịch vụ đã chọn:', selectedServices); // Log selected services
    if (selectedServices.length > 0) {
      navigation.navigate('AppointmentScreen', { selectedServices });
    } else {
      Alert.alert('Chưa chọn dịch vụ nào!');
    }
  };

  // Hàm để mở rộng/thu gọn các mục dịch vụ
  const toggleItemExpansion = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item.name]: !prev[item.name],
    }));
  };

  const handleItemPress = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
      setSearchQuery('');
    } else {
      setSearchQuery(item.name);
      setSelectedItem(item);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container1}>
          {/* TOPBAR */}
          <View style={styles.fulltopbar}>
            <TouchableOpacity style={styles.touchable} onPress={navigation.goBack}>
              <Image source={require('../../Resources/assets/icons/arrow.png')} style={styles.imageArrow} />
            </TouchableOpacity>
            <View style={styles.serviceTextContainer}>
              <Text style={styles.serviceTextBold}>Chọn dịch vụ </Text>
              <Text style={styles.serviceTextRegular}>(1K = 1000đ)</Text>
            </View>
            {/* <View style={styles.topbarRight}>
            <View style={styles.khung}>
              {Array.from({ length: 4 }, (_, i) => (
                <View key={i} style={[
                  styles.square,
                  {
                    borderTopLeftRadius: i === 0 ? 3 : 0,
                    borderTopRightRadius: i === 1 ? 3 : 0,
                    borderBottomLeftRadius: i === 2 ? 3 : 0,
                    borderBottomRightRadius: i === 3 ? 3 : 0,
                  }]}
                />
              ))}
            </View>
            <Text style={styles.serviceTextRegular}>Kiểu xem </Text>
          </View> */}
            {/* <View style={styles.viewImageFlagVN}>
            <Image source={require('../../Resources/assets/icons/flagvn.png')} style={styles.imageFlagVN} />
          </View> */}
          </View>

          {/* SEARCH */}
          <View style={styles.viewSearch}>
            <Image source={require('../../Resources/assets/icons/search.png')} style={styles.imageSearch} />
            <TextInput
              style={styles.searchBar}
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.viewListSearch}>
            {searchQuery.length > 0 && (
              <FlatList
                horizontal
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    style={[styles.item, selectedItem === item && styles.selectedItem]}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>


        {/* NAV */}
        <View style={styles.container2}>
          <View style={styles.title1}>
            <View style={styles.leftTitle}></View>
            <Text style={styles.textTitle}>Cắt gội xả massage</Text>
          </View>

          {/* List of services */}
          <View style={styles.rowContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <FlatList
                data={filteredData}  // Sử dụng dữ liệu đã lọc từ API
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.item1, selectedItem === item && styles.selectedItem1, { width: ITEM_WIDTH }]}>
                    {/* Kiểm tra nếu API trả về URL của ảnh */}
                    <Image
                      source={item.images ? { uri: item.images } : require('../../Resources/assets/icons/flagvn.png')}
                      style={styles.itemImage}
                    />
                    <View style={styles.viewTitle}>
                      <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                      <Text style={styles.itemText2}>⏱ {item.duration}</Text>
                    </View>
                    <View>
                      <Text style={styles.itemText3} numberOfLines={2}>{item.description}</Text>
                      <Text style={styles.itemText4}>{item.ttthem}Giảm 5% cho lần tiếp theo</Text>
                      <Text style={styles.itemText5}>{item.danhgia}Tiêu chuẩn</Text>
                      <Text style={styles.itemText6}>{item.price}k</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleAddService(item)}>
                      {/* <Text style={styles.itemText7}>
                      {selectedServices.some(service => service.name === item.name) ? 'Đã thêm' : 'Thêm dịch vụ'}
                    </Text> */}
                      <Text style={StyleSheet.flatten([
                        styles.itemText7,
                        {
                          backgroundColor: selectedServices.some(service => service.name === item.name) ? 'white' : colors.primary,
                          color: selectedServices.some(service => service.name === item.name) ? colors.primary : 'white'
                        }
                      ])}>
                        {selectedServices.some(service => service.name === item.name) ? 'Đã thêm' : 'Thêm dịch vụ'}
                      </Text>
                    </TouchableOpacity>

                  </View>
                )}
                numColumns={2}
                // nestedScrollEnabled={true} // Cho phép cuộn lồng nhau
                scrollEnabled={false} // Tắt cuộn cho FlatList
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        {/* Checkbox */}
        {/* <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
          />
          <Text style={styles.footerText1}>
            Anh không biết chọn dịch vụ gì!{'\n'}
            <Text style={styles.footerText2}>Nhân viên sẽ giúp anh chọn dịch vụ tại cửa hàng</Text>
          </Text>
        </View> */}
        <View>
          <Image source={require('../../Resources/assets/logo/Bee_Barber.png')} style={styles.imageFooter} />
        </View>

        <View style={styles.footerLine}></View>

        {/* Vocher */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.footerText}>🎟️ Ưu đãi của anh</Text>
          <TouchableOpacity>
            <Text style={styles.footerText}>Chọn ưu đãi ➡️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerLine}></View>

        {/* Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, alignItems: 'flex-end' }}>
          <TouchableOpacity>
            <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Đã chọn {selectedServices.length} dịch vụ</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginLeft: 110 }}>
            <Text style={styles.textprice}>Tổng thanh toán</Text>
            <Text style={styles.price}>{totalPrice}K</Text>
          </View>

          <TouchableOpacity onPress={handleDone}>
            <Text style={styles.buttonText1}>Xong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container1: {
    padding: 16,
    backgroundColor: '#EEE9E9',
  },
  fulltopbar: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  touchable: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  imageArrow: {
    width: 20,
    height: 20,
  },
  serviceTextContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  serviceTextBold: {
    color: '#000099',
    fontWeight: 'bold',
  },
  serviceTextRegular: {
    color: '#000099',
  },
  topbarRight: {
    marginLeft: 20,
    padding: 4,
    borderColor: 'blue',
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'white',
  },
  khung: {
    marginRight: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 20,
    height: 20,
    justifyContent: 'space-between',
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: '#003366',
    margin: 1,
  },
  viewImageFlagVN: {
    borderColor: '#F5F5F5',
    borderWidth: 1,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
  },
  imageFlagVN: {
    width: 30,
    height: 30,
  },
  viewSearch: {
    height: 50,
    width: '100%',
    marginTop: 15,
    borderRadius: 18,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSearch: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  searchBar: {
    height: 40,
    flex: 1,
    // borderColor: 'gray',
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  viewListSearch: {
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 6,
    marginHorizontal: 5,
    backgroundColor: 'white',
    minWidth: 100,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  container2: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: -20,
  },
  title1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  leftTitle: {
    width: 6,
    height: 25,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'blue',
    marginRight: 10,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000099',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  viewList: {
    flex: 1,
    margin: -3,
    borderRadius: 10,
  },
  item1: {
    flex: 1,
    height: 350,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 7,
    marginVertical: 10,
    elevation: 5, // Đối với Android
    shadowColor: '#000', // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ dời bóng
    shadowOpacity: 0.3, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    flexDirection: 'column', // Căn chỉnh các thành phần theo chiều dọc
    justifyContent: 'space-between', // Giúp phân bố không gian đều
  },
  selectedItem1: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  itemImage: {
    width: '100%', // Chỉnh kích thước ảnh
    height: 117,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Tách name và time ra 2 phía
    alignItems: 'center',
    paddingHorizontal: 5, // Tạo khoảng cách cho hai bên
    alignItems: 'flex-start', // Căn trên
  },
  itemText: {
    // paddingTop: 5,
    fontWeight: '500',
    color: '#000099',
    maxWidth: '70%',  // Giới hạn chiều rộng tối đa là 70% của phần tử cha
    minHeight: 35,
  },
  itemText2: {
    paddingRight: 5,
    color: '#000099',
  },
  itemText3: {
    color: 'gray',
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 18,
    minHeight: 36,
  },
  itemText4: {
    marginLeft: 5,
    marginTop: 20,
    marginRight: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: 'orange',
    alignSelf: 'flex-start', // Đảm bảo phần tử co dãn theo nội dung
    fontSize: 12,
  },
  itemText5: {
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 15,
    color: '#000099',
    fontWeight: '500',
  },
  itemText6: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemText7: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 3,
    // backgroundColor: '#000099',
    // color: 'white',
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  footer: {
    marginVertical: 5,
    paddingHorizontal: 8,
    paddingTop: 2,
  },
  imageFooter: {
    marginLeft: 8,
  },
  footerText1: {
    color: '#000099',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  footerText2: {
    fontSize: 12,
    color: 'gray',
  },
  footerLine: {
    width: '95%',
    height: 0.5,
    backgroundColor: 'gray',
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
    borderRadius: 1,
    marginHorizontal: 10,
  },
  footerText: {
    color: '#000099',
    fontSize: 15,
    marginLeft: 8,
  },
  buttonText: {
    color: '#000099',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  textprice: {
    color: 'black',
    fontSize: 14,
  },
  price: {
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonText1: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    borderRadius: 3,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,

  }
});