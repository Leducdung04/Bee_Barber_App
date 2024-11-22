import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Để điều hướng

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Kiểm tra xem người dùng đã đăng nhập chưa bằng cách kiểm tra userId trong AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      setTimeout(() => {
        if (userId) {
          // Nếu đã có userId, chuyển tới TabNavigator (Trang chủ)
          navigation.replace('TabNavigator');
        } else {
          // Nếu chưa có userId, chuyển tới màn hình đăng nhập
          navigation.replace('WelcomeScreen');
        }
      }, 3000); // Hiển thị SplashScreen trong 3 giây
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào mừng đến với App!</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;
