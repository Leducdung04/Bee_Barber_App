import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkPhoneAndGetId, loginPhone } from '../../Services/utils/httpSingup'; // Đảm bảo đường dẫn đúng
import { isValidPhoneNumber } from '../../Services/utils/ValidPhoneNumber';
import { setUserlocal } from '../../Services/utils/user__AsyncStorage';
import eventEmitter from '../../Services/utils/event';
import colors from '../../Resources/styles/colors';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát trạng thái hiển thị mật khẩu
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(false)
  const [validatePassword, setvalidatePassword] = useState(false)
  const [textPhone, settextPhone] = useState('Vui lòng nhập số điện thoại')
  const [textPassword, settextPassword] = useState('Mật khẩu phải lớn hơn 6 ký tự')
  


  const handleLogin = async () => {
    if(validateAccount()){
      const responseUres= await loginPhone(phoneNumber,password)
        if(responseUres?.code ===200){
          await setUserlocal(responseUres.data)
          eventEmitter.emit('userLoggedIn');
          navigation.navigate('TabNavigator')
        }else if(responseUres?.code === 210){
            settextPhone('Số điện thoại không tồn tại')
            setValidatePhoneNumber(true)
        }else if(responseUres?.code === 220){
            settextPhone('Số điện thoại và mật khẩu không đúng')
            setValidatePhoneNumber(true)
            settextPassword('Số điện thoại và mật khẩu không đúng')
            setvalidatePassword(true)
        }
    }
  };

  function validateAccount(){
    if(!isValidPhoneNumber(phoneNumber)){
      setValidatePhoneNumber(true)
      settextPhone('Số điện thoại không đúng định dạng')
    }
    if(password.length<6){
      setvalidatePassword(true)
      settextPassword('Mật khẩu phải lớn hơn 6 ký tự')
    }
    if( !isValidPhoneNumber(phoneNumber) && password.length<6){
      return 
    }
    return true
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.screenContainer}>
        {/* Banner Image */}
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={{alignItems:'center',marginVertical:32}}>
        <Image
          source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh đại diện
          style={styles.bannerImage}
        />
        </View>
        
        
        {/* Nhập số điện thoại */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text =>{ setPhoneNumber(text);setValidatePhoneNumber(false)}}
          />
          <TouchableOpacity onPress={() => setPhoneNumber('')}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
            />
          </TouchableOpacity>
        </View>
        {validatePhoneNumber && <Text style={{color:'red'}}>{textPhone}</Text>}
        {/* Nhập mật khẩu */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={text =>{ setPassword(text);setvalidatePassword(false)}}
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
        {validatePassword && <Text style={{color:'red'}}>{textPassword}</Text>}

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
            <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPasswordScreen')}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
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
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  screenContainer: {
    flex: 1,
    marginHorizontal:24
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#153A80',
    marginTop: 70,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary300,
    marginBottom: 20,
    width: '100%',
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12
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
    marginTop: 32,
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
    left: -20,
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
