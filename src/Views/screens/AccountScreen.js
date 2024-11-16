import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserInfoById } from '../../Services/utils/httpSingup'; // Đường dẫn đến hàm getUserInfoById

const AccountScreen = () => {

  const [userId, setUserId] = useState(null);// Lấy userId 
  const [userInfo, setUserInfo] = useState(null); // Khởi tạo state để lưu thông tin người dùng
  const navigation = useNavigation(); // Hook để điều hướng

  // Hàm lấy userId từ AsyncStorage
  const fetchUserId = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };


  // Hàm để tải lại thông tin người dùng
  const fetchUserInfo = async () => {
    if (userId) {
      const data = await getUserInfoById(userId);
      console.log('User ID:', userId);
      setUserInfo(data); // Lưu thông tin người dùng vào state
    }
  };

  
  // Sử dụng useFocusEffect để tải lại thông tin khi màn hình được hiển thị
  useFocusEffect(
    React.useCallback(() => {
      fetchUserId();
      fetchUserInfo(); // Gọi hàm fetchUserInfo mỗi khi màn hình được hiển thị
    }, [userId])
  );

  const handlePress = (item) => {
    Alert.alert('Thông báo', `Bạn đã nhấn vào: ${item}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfo1}>
          <Image
            source={require('../../Resources/assets/images/Avata.jpg')} // Placeholder cho ảnh đại diện
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.guestText}>
              {userInfo && typeof userInfo.name === 'string' ? userInfo.name : 'GUEST'}
            </Text>
            <Text style={styles.memberText}>Chưa có hạng thành viên</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} // Placeholder cho mũi tên
            style={styles.chevronIcon1}
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

          {/* <TouchableOpacity style={styles.item} onPress={() => handlePress('Sở thích phục vụ')}>
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
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.item} onPress={() => handlePress('Hiểu anh để phục vụ anh tốt hơn')}>
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
          </TouchableOpacity> */}
        </View>

        {/* Nhóm cuối với khoảng cách lớn hơn */}
        <View style={styles.groupWithMargin}>
          {/* <TouchableOpacity style={styles.item} onPress={() => handlePress('Lấy OTP xác thực giao dịch')}>
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
          </TouchableOpacity> */}

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
  userInfo1: {
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
    tintColor: '#696969'
  },
  chevronIcon1: {
    width: 25,
    height: 25,
    tintColor: '#000000'
  },
  bannerImage: {
    width: '95%', // Giảm bề ngang để có khoảng cách 2 bên
    height: 240, // Chiều cao banner
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
    marginTop: 10,
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
    paddingVertical: 5,
  },
  icon: {
    width: 23,
    height: 23,
    tintColor: '#153A80',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4F4F4F',
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

