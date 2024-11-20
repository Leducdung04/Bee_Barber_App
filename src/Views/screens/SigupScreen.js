import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkPhoneAndGetId, loginPhone, registerUser } from '../../Services/utils/httpSingup'; // Đảm bảo đường dẫn đúng
import { isValidPhoneNumber } from '../../Services/utils/ValidPhoneNumber';
import { setUserlocal } from '../../Services/utils/user__AsyncStorage';
import colors from '../../Resources/styles/colors';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setname] = useState('')
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(false)
  const [textValidatePhone, settextValidatePhone] = useState('Số điện thoại không đúng định dạng !')
  const [validatePassword, setvalidatePassword] = useState(false)
  const [validateName, setvalidateName] = useState(false)
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Để kiểm soát trạng thái hiển thị mật khẩu

 
  async function handleSigup(){
    if(validateAccount()){
      const responseUres = await registerUser(phoneNumber,password,name)
      console.log('data',responseUres)
      if(responseUres.status === 200){
        await setUserlocal(responseUres.data)
        navigation.navigate('TabNavigator')
      }else if(responseUres.status ===210){
        setValidatePhoneNumber(true)
        settextValidatePhone('Số điện thoại đã được đăng ký')
      }
    }

  }

  function validateAccount(){
    if(name === ''){
      setvalidateName(true)
    }
    if(!isValidPhoneNumber(phoneNumber)){
      settextValidatePhone('Số điện thoại không đúng định dạng !')
      setValidatePhoneNumber(true)
    }
    if(password.length<=6){
      setvalidatePassword(true)
    }
    if(name === '' && phoneNumber === ''&& password.length<=6){
      return false
    }
    return true
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.screenContainer}>
       
        <Text  style={styles.title}>Đăng ký tài khoản</Text>
        <View style={{alignItems:'center',marginVertical:24}}>
          <Image source={require('../../Resources/assets/logo/Bee_Barber.png')}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={text => {setname(text);setvalidateName(false)}}
          />
          <TouchableOpacity onPress={() => setname('')}>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        </View>
        {validateName && <Text style={{color:'red'}}>Vui lòng nhập họ tên !</Text>}
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
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        </View>
        {validatePhoneNumber && <Text style={{color:'red'}}>{textValidatePhone}</Text>}
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
        {validatePassword && <Text style={{color:'red'}}>Mật khẩu chứa ít nhất 6 ký tự !</Text>}
        {/* Nút Đăng nhập */}
        <TouchableOpacity style={styles.nextButton} onPress={handleSigup}>
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
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signUpText}>Bạn đã có tài khoản?</Text>
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
    marginHorizontal:12
    //justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 69, // Điều chỉnh kích thước theo nhu cầu
    marginTop: -100,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#153A80',
    marginTop: 100,
    marginBottom:24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor:colors.primary300,
    marginBottom: 12,
    // paddingHorizontal: 6,
    width: '100%',
    marginVertical:32,

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
