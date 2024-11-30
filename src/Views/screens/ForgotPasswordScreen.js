import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView } from "react-native";
import { sendOtp, verifyOtp, updatePassword } from '../../Services/utils/httpSingup'; // Nhập khẩu các chức năng từ file api
import colors from '../../Resources/styles/colors';

const ForgotPasswordScreen = ({ navigation }) => {
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP, 3: Nhập mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill("")); // Mảng lưu trữ mỗi ký tự OTP
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const otpRefs = useRef(Array(6).fill(null)); // Lưu tham chiếu cho các ô nhập OTP
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [canResendOtp, setCanResendOtp] = useState(false); // Flag for resend OTP button
  const [isResending, setIsResending] = useState(false);

  const [codeNumber, setCodeNumber] = useState(null);

  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0 && !isResending) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setCanResendOtp(true); // Enable resend OTP after countdown
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      setCanResendOtp(true); // Resend OTP is available once timer hits 0
    }

    return () => clearInterval(interval); // Clean up interval on unmount or step change
  }, [timer, step, isResending]);

  const handleEmailSubmit = async () => {

    if (!email) {
      setEmailError("Vui lòng nhập email hợp lệ!");
      return;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Địa chỉ email không hợp lệ!");
      return;
    }

    setEmailError(""); // Xóa thông báo lỗi nếu email hợp lệ

    // Gửi OTP
    const result = await sendOtp(email);
    console.log("ddddd: ", result);
    setCodeNumber(result?.code)
    if (result && result.status === 200) {
      setStep(2); // Chuyển sang giao diện OTP
    } else if (result && result.status === 400) {
      setEmailError("Email chưa được đăng ký.");
    } else {
      Alert.alert("Thông báo", "Lỗi khi gửi OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Vui lòng nhập đầy đủ mã OTP!");
      return;
    }

    setOtpError(""); // Xóa thông báo lỗi nếu OTP hợp lệ

    // Xác thực OTP
    const result = await verifyOtp(email, otpString);
    if (result && result.status === 200) {
      setStep(3); // Chuyển sang nhập mật khẩu mới
    } else {
      setOtpError("Mã OTP không chính xác!");
    }

    // if (otpString == codeNumber) {
    //   setStep(3); // Chuyển sang nhập mật khẩu mới
    // } else {
    //   setOtpError("Mã OTP không chính xác!");
    // }
  };

  const handleResendOtp = async () => {
    setIsResending(true); // Set the flag to indicate OTP is being resent
    setTimer(60); // Reset timer to 60 seconds
    setCanResendOtp(false); // Disable resend button
    const result = await sendOtp(email); // Send OTP again
    if (result && result.status === 200) {
      Alert.alert("Thông báo", "OTP đã được gửi lại!");
      setIsResending(false); // Reset the resend flag after OTP is sent
    } else {
      Alert.alert("Thông báo", "Lỗi khi gửi lại OTP.");
      setIsResending(false); // Reset the resend flag if there's an error
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      setPasswordError("Mật khẩu không được để trống!");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    if (!confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không được để trống!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setPasswordError(""); // Xóa thông báo lỗi nếu mật khẩu hợp lệ

    // Cập nhật mật khẩu
    const result = await updatePassword(email, newPassword);
    if (result && result.status === 200) {
      Alert.alert("Thông báo", "Mật khẩu đã được cập nhật thành công!");
      navigation.navigate('LoginScreen')
    } else {
      Alert.alert("Thông báo", "Lỗi khi cập nhật mật khẩu.");
    }
  };

  const handleOtpChange = (value, index) => {
    // Chỉ cho phép nhập số
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Tự động chuyển sang ô tiếp theo nếu có giá trị
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
      // Nếu người dùng xóa ký tự
      else if (value === "" && index > 0) {
        otpRefs.current[index - 1].focus();
      }

    }
  };



  return (
    <View style={styles.container1}>
      {step === 1 ? (
        // Giao diện Nhập Email
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.form}>
            <Text style={styles.title}>Khôi Phục Mật Khẩu</Text>
            <View style={{ alignItems: 'center', marginVertical: 32 }}>
              <Image
                source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh đại diện
                style={styles.bannerImage}
              />
            </View>
            <Text style={styles.description}>
              Nhập Email của bạn để thiết lập lại mật khẩu
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError(""); // Xóa thông báo lỗi khi người dùng nhập
                }}
              />
              <TouchableOpacity onPress={() => setEmail('')}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/multiply.png' }}
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TouchableOpacity style={styles.nextButton} onPress={handleEmailSubmit}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : step === 2 ? (
        // Giao diện Nhập OTP
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.form}>
            <Text style={styles.title}>Vui lòng nhập OTP để đặt lại mật khẩu</Text>
            <View style={{ alignItems: 'center', marginVertical: 32 }}>
              <Image
                source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh đại diện
                style={styles.bannerImage}
              />
            </View>

            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpRefs.current[index] = ref)} // Lưu tham chiếu cho ô nhập
                  style={styles.otpInput}
                  keyboardType="numeric" // Chỉ cho phép nhập số
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleOtpChange(text, index)}
                />
              ))}
            </View>
            {!isResending && timer > 0 && (
              <Text style={styles.errorText}>
                OTP sẽ hết hạn sau {timer}s
              </Text>
            )}

            {canResendOtp && !isResending ? (
                <Text style={styles.errorText}  onPress={handleResendOtp}>Gửi lại OTP</Text>
            ) : null}
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
            <TouchableOpacity style={styles.nextButton} onPress={handleVerifyOTP}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        // Giao diện Nhập Mật Khẩu Mới
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.form}>
            <Text style={styles.title}>Nhập Mật Khẩu Mới</Text>
            <View style={{ alignItems: 'center', marginVertical: 32 }}>
              <Image
                source={require('../../Resources/assets/logo/Bee_Barber.png')} // Placeholder cho ảnh đại diện
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={secureNewPassword}
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setPasswordError(""); // Xóa thông báo lỗi khi người dùng nhập
                }}
              />
              <TouchableOpacity onPress={() => setSecureNewPassword(!secureNewPassword)}>
                <Image
                  source={secureNewPassword
                    ? require('../../Resources/assets/images/eye-off.png') // Hình ảnh mắt đóng
                    : require('../../Resources/assets/images/eye-on.png')} // Hình ảnh mắt mở
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={secureConfirmPassword}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setPasswordError(""); // Xóa thông báo lỗi khi người dùng nhập
                }}
              />
              <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
                <Image
                  source={secureConfirmPassword
                    ? require('../../Resources/assets/images/eye-off.png') // Hình ảnh mắt đóng
                    : require('../../Resources/assets/images/eye-on.png')} // Hình ảnh mắt mở
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity style={styles.nextButton} onPress={handleUpdatePassword}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/chevron-right.png' }}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
  },
  form: {
    flex: 1,
    marginHorizontal: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#153A80',
    marginTop: 70,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary300,
    marginBottom: 12,
    // paddingHorizontal: 6,
    width: '100%',
    marginVertical: 32,

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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    width: "100%",
    alignItems: "center",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#F6F6F6",
    color: "#000",
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;