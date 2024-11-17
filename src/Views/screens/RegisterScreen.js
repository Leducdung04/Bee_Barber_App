
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { registerUser, checkPhoneNumberExists } from '../../Services/utils/httpSingup'; // Giữ nguyên các hàm kiểm tra và đăng ký của bạn

const RegisterScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Mật khẩu xác nhận
  const [currentScreen, setCurrentScreen] = useState('phoneNumber'); // Màn hình hiện tại
  const [phoneExists, setPhoneExists] = useState(false); // Trạng thái kiểm tra số điện thoại đã tồn tại

  const handlePhoneNumberChange = async (text) => {
    let formattedPhoneNumber = text.trim();
    if (formattedPhoneNumber.charAt(0) === '0') {
      setPhoneNumber(formattedPhoneNumber);
    }
    setPhoneNumber(formattedPhoneNumber);

    // Kiểm tra số điện thoại đã đăng ký
    if (formattedPhoneNumber.match(/^\+84\d{9}$/) || formattedPhoneNumber.match(/^0\d{9}$/)) { // Kiểm tra định dạng số điện thoại
      const exists = await checkPhoneNumberExists(formattedPhoneNumber);
      setPhoneExists(exists); // Lưu kết quả kiểm tra
    } else {
      setPhoneExists(false); // Nếu số điện thoại không hợp lệ, đặt lại trạng thái
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text); // Lấy mật khẩu xác nhận
  };

  const clearInputFields = () => {
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setCurrentScreen('phoneNumber'); // Quay lại màn hình số điện thoại
    setPhoneExists(false); // Đặt lại trạng thái kiểm tra số điện thoại
  };

  const handleNext = async () => {
    if (currentScreen === 'phoneNumber') {
      if (!(phoneNumber.match(/^\+84\d{9}$/) || phoneNumber.match(/^0\d{9}$/))) {
        Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
        return;
      }

      // Kiểm tra nếu số điện thoại đã được đăng ký
      if (phoneExists) {
        Alert.alert('Thông báo', 'Số điện thoại đã được đăng ký.');
        return; // Nếu số điện thoại đã tồn tại, dừng lại
      }

      // Nếu số điện thoại chưa được đăng ký, chuyển sang màn hình mật khẩu
      setCurrentScreen('password');
    } else if (currentScreen === 'password') {
      if (password.length < 6) {
        Alert.alert('Lỗi', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
        return;
      }

      // Chuyển sang màn hình nhập lại mật khẩu
      setCurrentScreen('confirmPassword');
    } else if (currentScreen === 'confirmPassword') {
      if (password !== confirmPassword) {
        Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp.');
        return;
      }

      try {
        const apiResult = await registerUser(phoneNumber, password);
        if (apiResult.message === "Đăng ký thành công") {
          Alert.alert('Thành công', 'Đăng ký thành công!');
          clearInputFields(); // Xóa hết thông tin đã nhập
          navigation.navigate('Login'); // Chuyển hướng sau khi đăng ký thành công
        } else {
          Alert.alert('Lỗi', 'Đăng ký thất bại qua API.');
          clearInputFields(); // Xóa hết thông tin đã nhập
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Đăng ký thất bại.');
        console.error('Đăng ký thất bại:', error);
        clearInputFields(); // Xóa hết thông tin đã nhập
      }
    }
  };

  const handleBack = () => {
    if (currentScreen === 'phoneNumber') {
      navigation.navigate('WelcomeScreen');
    } else if (currentScreen === 'password' || currentScreen === 'confirmPassword') {
      setCurrentScreen('phoneNumber');
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

  const renderConfirmPasswordScreen = () => (
    <View style={styles.screenContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png' }}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Nhập lại mật khẩu</Text>
      <Text style={styles.subTitle}>Số điện thoại: {phoneNumber}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          keyboardType="default"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity onPress={() => setConfirmPassword('')}>
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
      {currentScreen === 'password' && renderPasswordScreen()}
      {currentScreen === 'confirmPassword' && renderConfirmPasswordScreen()}
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

