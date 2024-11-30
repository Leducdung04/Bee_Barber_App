import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const TestScreen = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ!');
      return;
    }

    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+84${phone}`);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      Alert.alert('Thành công', 'OTP đã được gửi đến số điện thoại của bạn.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi OTP. Vui lòng thử lại!');
      console.error('Error sending OTP:', error.message);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập OTP!');
      return;
    }

    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      Alert.alert('Thành công', 'Xác minh OTP thành công!');
      // Bạn có thể điều hướng hoặc thực hiện hành động tiếp theo ở đây.
    } catch (error) {
      Alert.alert('Lỗi', 'OTP không hợp lệ hoặc đã hết hạn!');
      console.error('Error verifying OTP:', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Xác thực Số Điện Thoại</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!otpSent}
      />

      {!otpSent && (
        <Button title={loading ? 'Đang gửi...' : 'Gửi OTP'} onPress={handleSendOTP} disabled={loading} />
      )}

      {otpSent && (
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <Button title={loading ? 'Đang xác minh...' : 'Xác minh OTP'} onPress={handleVerifyOTP} disabled={loading} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  otpContainer: {
    marginTop: 20,
  },
});

export default TestScreen;
