import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkPhoneAndGetId, loginPhone } from '../../Services/utils/httpSingup'; // Đảm bảo đường dẫn đúng

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát trạng thái hiển thị mật khẩu

  const handleLogin = async () => {
    try {
      // Kiểm tra số điện thoại đã đăng ký hay chưa
      const { registered, userId } = await checkPhoneAndGetId(phoneNumber);

      if (!registered) {
        Alert.alert('Lỗi', 'Số điện thoại chưa được đăng ký');
        return;
      }

      // Đăng nhập nếu số điện thoại đã được đăng ký
      const loginResponse = await loginPhone(phoneNumber, password);

      if (loginResponse && loginResponse.message === "Đăng nhập thành công") {
        // Lưu userId vào AsyncStorage và chuyển trang
        await AsyncStorage.setItem('userId', loginResponse.data._id);

        navigation.navigate('TabNavigator');
      } else {
        Alert.alert('Lỗi', loginResponse?.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Lỗi', 'Đăng nhập thất bại');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.screenContainer}>
        {/* Banner Image */}
        <Image
          source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh đại diện
          style={styles.bannerImage}
        />

        <Text style={styles.title}>Đăng nhập</Text>
        
        {/* Nhập số điện thoại */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TouchableOpacity onPress={() => setPhoneNumber('')}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        </View>
        
        {/* Nhập mật khẩu */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Image
              source={secureTextEntry
                ? require('../../Resources/assets/images/eye-off.png') // Hình ảnh mắt đóng
                : require('../../Resources/assets/images/eye-on.png')} // Hình ảnh mắt mở
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Nút Đăng nhập */}
        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>
        
        {/* Quên mật khẩu và Chưa có tài khoản */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu', 'Chức năng này chưa được triển khai.')}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.signUpText}>Chưa có tài khoản?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }}
            style={styles.icon1}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 69, // Điều chỉnh kích thước theo nhu cầu
    marginTop: -100,

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#153A80',
    marginTop: 70,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 5,
  },
  clearIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  eyeIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    backgroundColor: '#153A80',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    color: '#153A80',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#153A80',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    width: 25,
    height: 25,
    tintColor: '#000000',
  },
});

export default LoginScreen;
