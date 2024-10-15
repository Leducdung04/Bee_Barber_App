import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [isSelected, setSelection] = useState(false);

  const data = [
    { name: 'ShineCombo 2', time: '⏱ 10p', image: require('./assets/flagvn.png'), mota: 'Combo cắt kỹ, combo gội massage thư giãn cổ vai gáy, combo cạo mặt sáng', ttthem: 'NEW', danhgia: 'Tiêu chuẩn', price: '188K' },
    { name: 'Cắt + Gội Combo 3', time: '⏱ 40p', image: require('./assets/flagvn.png'), mota: 'Combo cắt kỹ, combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ', ttthem: 'Tặng massage cổ vai gáy', danhgia: 'Tiêu chuẩn', price: '299K' },
    { name: 'Cắt + Gội Combo 4', time: '⏱ 60p', image: require('./assets/flagvn.png'), mota: 'Combo cắt kỹ, combo gội massage bấm huyệt đầu, cổ vai gáy, combo massage', ttthem: 'Tặng detox da đầu', danhgia: 'Tiêu chuẩn', price: '379K' },
    { name: 'Cắt + Gội Combo 5', time: '⏱ 17p', image: require('./assets/flagvn.png'), mota: 'Combo cắt gội massage và lấy nhân mụn chuẩn y khoa giúp trẻ hóa làn da, giảm', ttthem: 'Tặng massage cổ vai gáy', danhgia: 'Tiêu chuẩn', price: '429K' },
    { name: 'Cắt gội', time: '⏱ 22p', image: require('./assets/flagvn.png'), mota: 'Combo Cắt kỹ và Combo Gội massage', ttthem: 'Đồng giá cả tuần', danhgia: 'Tiêu chuẩn', price: '120K' },
    { name: 'Kid Combo', time: '⏱ 44p', image: require('./assets/flagvn.png'), mota: 'Cắt xả tạo kiểu - Stylist thân thiện với trẻ nhỏ Bấm viền nhẹ nhàng', danhgia: 'Tiêu chuẩn', price: '70K' },
    { name: 'Combo lấy ráy tai VIP', time: '⏱ 54p', image: require('./assets/flagvn.png'), mota: 'Lấy ráy tai sạch và đầy sảng khoái với máy massage ráy tai đa điểm, rửa tai bọt, lắm mặt sáng', ttthem: 'Cực thư giãn', danhgia: 'Tiêu chuẩn', price: '70K' },
    { name: 'Cắt xả', time: '⏱ 25p', image: require('./assets/flagvn.png'), mota: 'Stylist cắt - xả - vuốt sáp tạo kiểu (Không gội & massage)', danhgia: 'Tiêu chuẩn', price: '100K' },
  ];

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
      <View style={styles.container1}>
        {/* TOPBAR */}
        <View style={styles.fulltopbar}>
          <TouchableOpacity style={styles.touchable} onPress={() => alert('Hello!')}>
            <Image source={require('./assets/arrow.png')} style={styles.imageArrow} />
          </TouchableOpacity>
          <View style={styles.serviceTextContainer}>
            <Text style={styles.serviceTextBold}>Chọn dịch vụ </Text>
            <Text style={styles.serviceTextRegular}>(1K = 1000đ)</Text>
          </View>
          <View style={styles.topbarRight}>
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
          </View>
          <View style={styles.viewImageFlagVN}>
            <Image source={require('./assets/flagvn.png')} style={styles.imageFlagVN} />
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.viewSearch}>
          <Image source={require('./assets/search.png')} style={styles.imageSearch} />
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
          <View style={styles.viewList}>
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[styles.item1, selectedItem === item && styles.selectedItem1]} // Không có onPress
                >
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.viewTitle}>
                    <Text
                      style={styles.itemText}
                      numberOfLines={expandedItems[item.name] ? undefined : 2} // Hiển thị tối đa 2 dòng
                      ellipsizeMode="tail" // Sử dụng '...' khi vượt quá giới hạn
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.itemText2}>{item.time}</Text>
                  </View>
                  <Text
                    style={styles.itemText3}
                    numberOfLines={expandedItems[item.mota] ? undefined : 3} // Hiển thị tối đa 2 dòng
                    ellipsizeMode="tail" // Sử dụng '...' khi vượt quá giới hạn
                  >
                    {item.mota}
                  </Text>
                  <Text style={styles.itemText4}>{item.ttthem}</Text>
                  <Text style={styles.itemText5}>{item.danhgia}</Text>
                  <Text style={styles.itemText6}>{item.price}</Text>
                  <TouchableOpacity>
                    <Text style={styles.itemText7}>Thêm dịch vụ</Text>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2} // Thay đổi số cột thành 2
            />
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        {/* Checkbox */}
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
          />
          <Text style={styles.footerText1}>
            Anh không biết chọn dịch vụ gì!{'\n'}
            <Text style={styles.footerText2}>Nhân viên sẽ giúp anh chọn dịch vụ tại cửa hàng</Text>
          </Text>
          {/* <Text style={styles.footerText1}>{isSelected ? 'Checked' : 'Unchecked'}</Text> */}
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
            <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Đã chọn 0 dịch vụ</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginLeft: 110 }}>
            <Text style={styles.textprice}>Tổng thanh toán</Text>
            <Text style={styles.price}>0K</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.buttonText1}>Xong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
  },
  container1: {
    padding: 16,
    backgroundColor: '#EEE9E9',
  },
  fulltopbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderRadius: 10,
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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  viewList: {
    flex: 1,
    margin: -3,
    borderRadius: 10,
  },
  item1: {
    width: 176.5, // Căn chỉnh độ rộng để có khoảng cách hợp lý
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
  },
  itemText: {
    paddingTop: 5,
    fontWeight: '500',
    color: '#000099',
    maxWidth: '70%',  // Giới hạn chiều rộng tối đa là 70% của phần tử cha
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
    maxHeight: 55,
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
    backgroundColor: '#000099',
    color: 'white',
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
  },
  footer: {
    // alignItems: 'center',
    marginVertical: 5,
    margin: 8,
    paddingTop: 25,
  },
  footerText1: {
    color: '#000099',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,  // Giảm khoảng cách phía dưới
  },
  footerText2: {
    fontSize: 12,
    color: 'gray',
  },
  footerLine: {
    width: '95%',
    height: 0.5,
    backgroundColor: 'gray',
    marginTop: 5,   // Giảm khoảng cách phía trên
    marginBottom: 5,  // Giảm khoảng cách phía dưới
    opacity: 0.5,
    borderRadius: 1,
    marginHorizontal: 10,
    // marginVertical: 10,
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
    marginBottom: 5,  // Giảm khoảng cách phía dưới
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
    paddingVertical: 10,  // Giảm padding để làm nút nhỏ hơn
    paddingHorizontal: 20,  // Giảm chiều ngang padding cho nút
    marginBottom: 5,  // Giảm khoảng cách phía dưới

  }
});
