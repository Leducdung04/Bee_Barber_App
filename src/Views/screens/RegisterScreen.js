// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
// import { registerUser } from '../../Services/utils/httpSingup'; // Import hàm gọi API

// const RegisterScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [currentScreen, setCurrentScreen] = useState('phoneNumber');

//   const handlePhoneNumberChange = (text) => {
//     setPhoneNumber(text);
//   };

//   const handleOtpChange = (text) => {
//     setOtp(text);
//   };

//   const handlePasswordChange = (text) => {
//     setPassword(text);
//   };

//   const handleNext = async () => {
//   if (currentScreen === 'phoneNumber') {
//     // Gửi yêu cầu OTP (cần tích hợp sau)
//     // Nếu không cần gửi OTP ngay bây giờ, bạn có thể chuyển sang màn hình OTP.
//     setCurrentScreen('otp'); // Bạn có thể cần gửi OTP ở đây trước khi chuyển

//   } else if (currentScreen === 'otp') {
//     // Sau khi OTP xác thực (chưa có xử lý OTP), chuyển sang màn hình nhập mật khẩu
//     setCurrentScreen('password');

//   } else if (currentScreen === 'password') {
//     // Kiểm tra xem số điện thoại và mật khẩu có được cung cấp không
//     if (!phoneNumber || !password) {
//       Alert.alert('Lỗi', 'Số điện thoại và mật khẩu là bắt buộc');
//       return;
//     }

//     // Gửi yêu cầu API để đăng ký tài khoản
//     const result = await registerUser(phoneNumber, password);
//     console.log('Đăng ký kết quả:', result);

//     if (result.success) {
//       Alert.alert('Thành công', 'Đăng ký thành công!');
//       navigation.navigate('TabNavigator'); 
//     } else {
//       console.log('Thông báo lỗi từ server:', result.message);
//       Alert.alert('Lỗi', result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
//     }
//   }
// };


//   const handleBack = () => {
//     if (currentScreen === 'otp') {
//       setCurrentScreen('phoneNumber');
//     } else if (currentScreen === 'password') {
//       setCurrentScreen('otp');
//     }
//   };

//   const renderPhoneNumberScreen = () => (
//     <View style={styles.screenContainer}>
//       <Text style={styles.title}>Mời anh nhập số điện thoại.</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Số điện thoại"
//         keyboardType="phone-pad"
//         value={phoneNumber}
//         onChangeText={handlePhoneNumberChange}
//       />
//     </View>
//   );

//   const renderOtpScreen = () => (
//     <View style={styles.screenContainer}>
//       <Text style={styles.title}>Nhập mã OTP được gửi qua SMS</Text>
//       <Text style={styles.subTitle}>Số điện thoại: {phoneNumber}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mã OTP"
//         keyboardType="number-pad"
//         value={otp}
//         onChangeText={handleOtpChange}
//       />
//     </View>
//   );

//   const renderPasswordScreen = () => (
//     <View style={styles.screenContainer}>
//       <Text style={styles.title}>Nhập mật khẩu</Text>
//       <Text style={styles.subTitle}>Số điện thoại: {phoneNumber}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mật khẩu"
//         secureTextEntry
//         keyboardType="default"
//         value={password}
//         onChangeText={handlePasswordChange}
//       />
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       {currentScreen === 'phoneNumber' && renderPhoneNumberScreen()}
//       {currentScreen === 'otp' && renderOtpScreen()}
//       {currentScreen === 'password' && renderPasswordScreen()}

//       {currentScreen !== 'phoneNumber' && (
//         <TouchableOpacity style={styles.backButton} onPress={handleBack}>
//           <Image
//             source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }} 
//             style={styles.icon1}
//           />
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Image
//           source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, checkPhoneNumberExists, checkPhoneAndGetId } from '../../Services/utils/httpSingup';

const RegisterScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [currentScreen, setCurrentScreen] = useState('phoneNumber');
  const [confirmation, setConfirmation] = useState(null);
  const [phoneExists, setPhoneExists] = useState(false); // Thêm trạng thái để lưu kết quả kiểm tra số điện thoại
  const [userId, setUserId] = useState(null);

  const handlePhoneNumberChange = async (text) => {
    let formattedPhoneNumber = text.trim();
    if (formattedPhoneNumber.charAt(0) === '0') {
      formattedPhoneNumber = '+84' + formattedPhoneNumber.substring(1);
    }
    setPhoneNumber(formattedPhoneNumber);


    // Kiểm tra số điện thoại đã đăng ký
    if (formattedPhoneNumber.match(/^\+84\d{9}$/)) { // Kiểm tra định dạng số điện thoại
      const exists = await checkPhoneNumberExists(formattedPhoneNumber);
      setPhoneExists(exists); // Lưu kết quả kiểm tra
    } else {
      setPhoneExists(false); // Nếu số điện thoại không hợp lệ, đặt lại trạng thái
    }
  };

    const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const clearInputFields = () => {
    setPhoneNumber('');
    setOtp('');
    setPassword('');
    setConfirmation(null);
    setCurrentScreen('phoneNumber');
    setPhoneExists(false); // Đặt lại trạng thái số điện thoại
  };

  const handleNext = async () => {
    if (currentScreen === 'phoneNumber') {
      if (!phoneNumber.match(/^\+84\d{9}$/)) {
        Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
        return;
      }

      // Kiểm tra nếu số điện thoại đã được đăng ký
      if (phoneExists) {
        Alert.alert('Thông báo', 'Số điện thoại đã được đăng ký.');
        return; // Không chuyển sang màn OTP
      }

      // Nếu số điện thoại chưa được đăng ký, tiếp tục gửi OTP
      try {
        const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirmation(confirmationResult);
        setCurrentScreen('otp');
      } catch (error) {
        console.error('Kiểm tra số điện thoại thất bại:', error);
      }
    } else if (currentScreen === 'otp') {
      if (!confirmation) {
        Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại trước.');
        return;
      }
      try {
        await confirmation.confirm(otp);
        setCurrentScreen('password');
      } catch (error) {
        Alert.alert('Lỗi', 'OTP không chính xác. Vui lòng thử lại.');
        setOtp(''); // Xóa hết OTP đã nhập
      }
    } else if (currentScreen === 'password') {
      if (password.length < 6) {
        Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
        return;
      }
      try {
        const apiResult = await registerUser(phoneNumber, password);
        console.log('Kết quả API:', apiResult);
        if (apiResult.message === "Đăng ký thành công") {
          await auth().createUserWithEmailAndPassword(phoneNumber + "@example.com", password);

          // Truy vấn lại ID người dùng sau khi đăng ký thành công
          const checkResult = await checkPhoneAndGetId(phoneNumber);
          setUserId(checkResult.userId); // Lưu userId vào biến cục bộ

          // Lưu ID người dùng vào AsyncStorage
          await AsyncStorage.setItem('userId', checkResult.userId);

          Alert.alert('Thành công', 'Đăng ký thành công!');
          clearInputFields(); // Xóa hết thông tin đã nhập
          navigation.navigate('TabNavigator');
        } else {
          Alert.alert('Lỗi', 'Đăng ký thất bại qua API.');
          clearInputFields(); // Xóa hết thông tin đã nhập
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Đăng ký thất bại qua Firebase.');
        console.error('Đăng ký thất bại:', error);
        clearInputFields(); // Xóa hết thông tin đã nhập
      }
    }
  };

  const handleBack = () => {

    if (currentScreen === 'phoneNumber') {
        navigation.navigate('WelcomeScreen');
    }else if (currentScreen === 'otp') {
      setCurrentScreen('phoneNumber');
    } else if (currentScreen === 'password') {
      setCurrentScreen('otp');
    }
  };

  const renderPhoneNumberScreen = () => (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Mời anh nhập số điện thoại</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="0987654321"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
        <TouchableOpacity onPress={() => setPhoneNumber('')}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOtpScreen = () => (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <Text style={styles.subTitle}>Số điện thoại: {phoneNumber}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mã OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={handleOtpChange}
        />
        <TouchableOpacity onPress={() => setOtp('')}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPasswordScreen = () => (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Nhập mật khẩu</Text>
      <Text style={styles.subTitle}>Số điện thoại: {phoneNumber}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          keyboardType="default"
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={() => setPassword('')}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {currentScreen === 'phoneNumber' && renderPhoneNumberScreen()}
      {currentScreen === 'otp' && renderOtpScreen()}
      {currentScreen === 'password' && renderPasswordScreen()}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
          style={styles.iconNext}
        />
      </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: 80, // Đẩy các phần tử lên gần phía trên màn hình
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#153A80',
    marginBottom: 5,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 15,
    color: '#153A80',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 20
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 15,
  },
  clearIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#153A80',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNext: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  iconBack: {
    width: 25,
    height: 25,
    tintColor: '#000',
  },
});

export default RegisterScreen;

