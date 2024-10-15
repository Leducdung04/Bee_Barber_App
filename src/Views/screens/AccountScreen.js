import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const handlePress = (item) => {
    Alert.alert('Thông báo', `Bạn đã nhấn vào: ${item}`);
  };
  const navigation = useNavigation(); // Hook để điều hướng

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Image
              source={require('../../Resources/assets/images/Avata.jpg')} // Placeholder cho ảnh đại diện
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.guestText}>GUEST</Text>
              <Text style={styles.memberText}>Chưa có hạng thành viên</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handlePress('Tùy chọn khác')}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>
      <ScrollView>
        {/* Phần thông tin người dùng */}
        

        {/* Thêm ảnh bìa lớn */}
        <Image
          source={require('../../Resources/assets/images/logo_30shine.png')} // Placeholder cho ảnh bìa lớn
          style={styles.bannerImage}
        />

        {/* Nhóm chức năng sát nhau */}
        <View style={styles.group}>
          <TouchableOpacity style={styles.itemNoGap} onPress={() => navigation.navigate('UserProfile')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/user.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Thông tin tài khoản</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemNoGap} onPress={() => handlePress('Địa chỉ của anh')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/Address.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Địa chỉ của anh</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemNoGap} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/order.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Đơn hàng</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Nhóm chức năng có khoảng cách */}
        <View style={styles.groupWithMargin}>
          <TouchableOpacity style={styles.item} onPress={() => handlePress('Ưu đãi')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/Endow.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Ưu đãi</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => handlePress('Lịch sử cắt')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/history.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Lịch sử cắt</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => handlePress('Sở thích phục vụ')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/interest.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Sở thích phục vụ</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => handlePress('Hiểu anh để phục vụ anh tốt hơn')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/problem.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Hiểu anh để phục vụ anh tốt hơn</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Nhóm cuối với khoảng cách lớn hơn */}
        <View style={styles.groupWithMargin}>
          <TouchableOpacity style={styles.item} onPress={() => handlePress('Lấy OTP xác thực giao dịch')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/otp.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Lấy OTP xác thực giao dịch</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => handlePress('Thông tin hỗ trợ khách hàng')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/support.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Thông tin hỗ trợ khách hàng</Text>
            </View>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Thanh điều hướng dưới */}
      {/* <View style={styles.navBar}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Shop</Text>
        <Text style={styles.navText}>Đặt lịch</Text>
        <Text style={styles.navText}>Lịch sử cắt</Text>
        <Text style={styles.navText}>Tài khoản</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.92,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#cccccc',
  },
  textContainer: {
    marginLeft: 10,
  },
  guestText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  memberText: {
    fontSize: 14,
    color: '#666666',
  },
  chevronIcon: {
    width: 18,
    height: 18,
    tintColor: '#153A80'
  },
  bannerImage: {
    width: '95%', // Giảm bề ngang để có khoảng cách 2 bên
    height: 200, // Chiều cao banner
    backgroundColor: '#e0e0e0', // Placeholder cho màu nền
    marginBottom: 10,
    alignSelf: 'center', // Căn giữa banner
    borderRadius: 15, // Bo góc
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5, // Hiệu ứng đổ bóng cho iOS
    elevation: 5, // Hiệu ứng đổ bóng cho Android
    overflow: 'hidden', // Đảm bảo phần bo góc được hiển thị
    marginTop:10,
  },
  
  group: {
    backgroundColor: '#ffffff',
    paddingBottom: 0,
    elevation: 5,
  },
  groupWithMargin: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingBottom: 0,
    elevation: 5,
  },
  item: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemNoGap: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 23,
    height: 23,
    tintColor: '#153A80',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  navText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default AccountScreen

