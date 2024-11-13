import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen'); // Điều hướng đến màn hình đăng nhập
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen'); // Điều hướng đến màn hình đăng ký
  };

  return (
    <LinearGradient
      colors={['#153A80', '#F5F5F5']} // Màu gradient từ xanh đậm đến xanh nhạt
      start={{ x: 0.5, y: 0.6 }} // Start from the bottom-middle
      end={{ x: 0.5, y: 1 }} // End halfway up
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>ĐẶT LỊCH SỬ NHANH XEM LẠI LỊCH SỬ CẮT</Text>
        <Text style={styles.subtitle}>Đặt lịch giữ chỗ chỉ 30 giây</Text>
        <Text style={styles.subtitle}>Cắt xong trả tiền, hủy lịch không sao</Text>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={handleLoginPress}>ĐĂNG NHẬP</Text>
          <Text style={styles.buttonText}> / </Text>
          <Text style={styles.buttonText} onPress={handleRegisterPress}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton} >
          <Text style={styles.textButtonText}>Tôi muốn khám phá thêm</Text>
        </TouchableOpacity>
        <View style={styles.pagination}>
          {Array(3).fill(0).map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal:40
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#153A80',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000', // Màu của bóng đổ
    shadowOffset: { width: 0, height: 2 }, // Hướng của bóng đổ
    shadowOpacity: 0.3, // Độ mờ của bóng đổ
    shadowRadius: 4, // Độ lan tỏa của bóng đổ
    elevation: 5, // Độ cao của bóng đổ trên Android
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Màu xanh của chữ trong nút
  },
  textButton: {
    marginTop: 10,
  },
  textButtonText: {
    fontSize: 16,
    color: 'white',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
});

export default WelcomeScreen;
