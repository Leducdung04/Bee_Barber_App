import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import {getUserlocal, deleteUserlocal } from '../../Services/utils/user__AsyncStorage';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../Resources/styles/colors';

const UserProfile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null); // Tạo state để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Tạo state để quản lý trạng thái tải dữ liệu
  
  useFocusEffect(
    React.useCallback(() => {
      async function getUser(){
        
        const user= await getUserlocal()
        setUserInfo(user)
      }
      getUser()
  
      return () => {
        // Cleanup nếu cần khi màn hình/tab bị unfocus
      };
    }, [])
  );
  async function outAccount(){
    await deleteUserlocal()
    navigation.navigate('WelcomeScreen')
}
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../Resources/assets/images/men.png')} // Placeholder cho ảnh đại diện lớn
          style={styles.profileImage}
        />
      </View>

      {/* {loading ? ( // Hiển thị loading nếu đang tải dữ liệu
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ( */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>THÔNG TIN CÁ NHÂN</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateUserScreen')}>
              <Text style={styles.editText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị thông tin người dùng */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ và tên</Text>
            <Text style={styles.infoValue}>{userInfo && userInfo.name ? userInfo.name : '---'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{userInfo && userInfo.phone ? userInfo.phone : '---'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userInfo && userInfo.email ? userInfo.email : '---'}</Text>
          </View>

        </View>
      {/* )} */}

      {/* Địa điểm */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>ĐỊA ĐIỂM GIÚP ANH TÌM SALON NHANH NHẤT</Text>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={require('../../Resources/assets/images/Address.png')} style={styles.icon} />
            <Text style={styles.itemText}>Địa chỉ cơ quan</Text>
          </View>
          <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} style={styles.chevronIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={require('../../Resources/assets/images/agency.png')} style={styles.icon} />
            <Text style={styles.itemText}>Nơi hay đi lại</Text>
          </View>
          <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} style={styles.chevronIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={require('../../Resources/assets/images/Address.png')} style={styles.icon} />
            <Text style={styles.itemText}>Địa chỉ nhà</Text>
          </View>
          <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png' }} style={styles.chevronIcon} />
        </TouchableOpacity>
      </View> */}

      {/* Địa chỉ nhận hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ĐỊA CHỈ NHẬN HÀNG CỦA ANH</Text>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={require('../../Resources/assets/images/Address.png')} style={styles.icon} />
            <Text style={styles.itemText}>Thêm địa điểm nhận hàng</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Đăng xuất */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText} onPress={() => outAccount()}  >ĐĂNG XUẤT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: colors.primary300,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    paddingTop: 30, // Extra padding to give it some space from the top
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: colors.primary300,
    borderWidth: 3, // Optional: Add a border around the profile image
    borderColor: '#fff', // Optional: Color of the border
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#153A80',
  },
  editText: {
    fontSize: 16,
    color: '#153A80',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  infoLabel: {
    fontSize: 14,
    color: '#828282',
  },

  infoValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500'
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#153A80',
    marginBottom: 0,
    fontWeight: '500'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 23,
    height: 23,
    marginRight: 10,
    tintColor: '#153A80'
  },
  itemText: {
    fontSize: 15,
    color: '#363636',
    fontWeight: '500',

  },
  chevronIcon: {
    width: 18,
    height: 18,
    tintColor: '#696969'

  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default UserProfile;
