import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { checkPhoneAndGetId } from '../../Services/utils/httpSingup'; // Điều chỉnh đường dẫn tới file API


const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát trạng thái hiển thị mật khẩu
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        {/* Nhập số điện thoại */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text=>{setPhoneNumber(text)}}
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
            onChangeText={text=>{setPassword(text)}}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Image
              source={secureTextEntry
                ? require('../../Resources/assets/images/eye-off.png') // Hình ảnh mắt đóng
                : require('../../Resources/assets/images/eye-on.png') // Hình ảnh mắt mở
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu', 'Chức năng này chưa được triển khai.')}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#153A80',
    marginBottom: 20,
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
    marginTop: 20
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
  forgotPasswordText: {
    color: '#153A80',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
    marginHorizontal: 20,
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
