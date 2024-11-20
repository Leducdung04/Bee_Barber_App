import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteUserlocal, getUserlocal } from '../../Services/utils/user__AsyncStorage';
import colors from '../../Resources/styles/colors';

const AccountScreen = ({navigation}) => {

  const [UserProfile, setUserProfile] = useState(null)

  useEffect(() => {
     async function getUser(){
      const user= await getUserlocal()
      setUserProfile(user)
    }
    getUser()
  }, [])
  
  const handlePress = (item) => {
    Alert.alert('Thông báo', `Bạn đã nhấn vào: ${item}`);
  };
  

  async function outAccount(){
      await deleteUserlocal()
      navigation.navigate('WelcomeScreen')
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <View style={{width:64,height:64,borderRadius:50,backgroundColor:colors.primary300,alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../../Resources/assets/images/men.png')} style={{width:52,height:52}}/>
            </View>
         
            <View style={styles.textContainer}>
              <Text style={styles.guestText}>{UserProfile?.name}</Text>
              <Text style={styles.memberText}>{UserProfile?.loyaltyPoints} point</Text>
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
        <View style={{backgroundColor: colors.primary300,borderRadius:12,paddingVertical:12,marginHorizontal:12,marginVertical:12}}>
        <Image
          source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh bìa lớn
           style={styles.bannerImage}
        />
        </View>

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

        </View>

        {/* Nhóm cuối với khoảng cách lớn hơn */}
        <View style={styles.groupWithMargin}>
         

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

          <TouchableOpacity style={styles.item} onPress={() => outAccount()}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../Resources/assets/images/otp.png')} // Placeholder cho icon
                style={styles.icon}
              />
              <Text style={styles.itemText}>Đăng xuất</Text>
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
    color: colors.primary300,
  },
  chevronIcon: {
    width: 18,
    height: 18,
    tintColor: '#153A80'
  },
  bannerImage: {
    width: '90%', // Giảm bề ngang để có khoảng cách 2 bên
    height: 60, // Chiều cao banner
    alignSelf: 'center', // Căn giữa banner
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

