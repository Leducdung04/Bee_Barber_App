import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const UserProfile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Phần đầu trang */}
      <View style={styles.header}>
        <Image 
          source={require('../../Resources/assets/images/Avata.jpg')} // Placeholder cho ảnh đại diện lớn
          style={styles.profileImage}
        />
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Họ và tên</Text>
          <Text style={styles.infoValue}>Nguyễn Văn A</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số điện thoại</Text>
          <Text style={styles.infoValue}>0765498264</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>example@gmail.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày sinh</Text>
          <Text style={styles.infoValue}>01-01-1900</Text>
        </View>
      </View>
      

      {/* Địa điểm */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa điểm giúp anh/chị tìm salon nhanh nhất</Text>

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
      </View>

      {/* Địa chỉ nhận hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ nhận hàng của anh/chị</Text>

        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Image source={require('../../Resources/assets/images/Address.png')} style={styles.icon} />
            <Text style={styles.itemText}>Thêm địa điểm nhận hàng</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Đăng xuất */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
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
    backgroundColor: '#6C63FF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  editText: {
    fontSize: 16,
    color: '#6C63FF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold'
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6C63FF',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
    fontSize: 14,
    color: '#000000',
    },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#153A80'

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
