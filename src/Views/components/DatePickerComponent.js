// import React from 'react';
// import { View, Text, Picker, StyleSheet } from 'react-native';

// const DatePickerComponent = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay }) => {
//     // Tạo mảng năm từ 1950 đến 2025
//     const years = Array.from({ length: 76 }, (_, i) => 1950 + i);
//     const months = Array.from({ length: 12 }, (_, i) => i + 1);
//     const days = Array.from({ length: 31 }, (_, i) => i + 1);

//     return (
//         <View>
//             <View style={styles.formGroup}>
//                 <Text style={styles.text}>Chọn năm sinh</Text>
//                 <Picker
//                     selectedValue={selectedYear}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setSelectedYear(itemValue)}
//                 >
//                     <Picker.Item label="Chọn năm" value="" />
//                     {years.map((year) => (
//                         <Picker.Item key={year} label={year.toString()} value={year} />
//                     ))}
//                 </Picker>
//             </View>
//             <View style={styles.formGroup}>
//                 <Text style={styles.text}>Chọn tháng sinh</Text>
//                 <Picker
//                     selectedValue={selectedMonth}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setSelectedMonth(itemValue)}
//                 >
//                     <Picker.Item label="Chọn tháng" value="" />
//                     {months.map((month) => (
//                         <Picker.Item key={month} label={month.toString()} value={month} />
//                     ))}
//                 </Picker>
//             </View>
//             <View style={styles.formGroup}>
//                 <Text style={styles.text}>Chọn ngày sinh</Text>
//                 <Picker
//                     selectedValue={selectedDay}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setSelectedDay(itemValue)}
//                 >
//                     <Picker.Item label="Chọn ngày" value="" />
//                     {days.map((day) => (
//                         <Picker.Item key={day} label={day.toString()} value={day} />
//                     ))}
//                 </Picker>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     formGroup: {
//         marginBottom: 20,
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//     },
// });

// export default DatePickerComponent;


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
// import { useUser } from '../routers/UserContext'; // Nhập UserContext để lấy userId
// import { getUserInfoById, updateUserInfo } from '../../Services/utils/httpSingup'; // Đường dẫn đến hàm getUserInfoById và updateUserInfo
// import DatePickerComponent from '../components/DatePickerComponent'; // Nhập DatePickerComponent

// const UpdateUserScreen = ({ navigation }) => {
//     const { userId } = useUser(); // Lấy userId từ context
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [selectedYear, setSelectedYear] = useState('');
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [selectedDay, setSelectedDay] = useState('');

//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             if (userId) {
//                 const data = await getUserInfoById(userId);
//                 setName(data.name || '');
//                 setEmail(data.email || '');
//                 const birthDateParts = (data.birthDate || '').split('-');
//                 setSelectedYear(birthDateParts[0] || '');
//                 setSelectedMonth(birthDateParts[1] || '');
//                 setSelectedDay(birthDateParts[2] || '');
//             }
//         };
//         fetchUserInfo();
//     }, [userId]);

//     const handleUpdate = async () => {
//         // Kiểm tra định dạng email
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(email)) {
//             Alert.alert('Thông báo', 'Email không hợp lệ.');
//             return;
//         }

//         // Kiểm tra xem năm, tháng, và ngày đã được chọn chưa
//         if (!selectedYear || !selectedMonth || !selectedDay) {
//             Alert.alert('Thông báo', 'Vui lòng chọn đầy đủ thông tin ngày sinh.');
//             return;
//         }

//         // Tạo đối tượng thông tin người dùng
//         const birthDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
//         const userInfo = {
//             name,
//             email,
//             birthDate, // Bao gồm ngày sinh trong thông tin cập nhật
//         };

//         // Cập nhật thông tin người dùng
//         try {
//             const result = await updateUserInfo(userId, userInfo); // Gọi hàm cập nhật
//             if (result.success !== false) {
//                 Alert.alert('Thông báo', 'Thông tin đã được cập nhật!');
//                 navigation.navigate('UserProfile');
//             } else {
//                 Alert.alert('Thông báo', result.message);
//             }
//         } catch (error) {
//             Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Image 
//                     source={require('../../Resources/assets/images/Avata.jpg')} // Placeholder cho ảnh đại diện
//                     style={styles.profileImage}
//                 />
//             </View>
//             <View style={styles.group}>
//                 <View style={styles.formGroup}>
//                     <Text style={styles.text}>Họ tên*</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={name}
//                         onChangeText={setName}
//                         placeholder="Nhập họ tên"
//                     />
//                 </View>
//                 <View style={styles.formGroup}>
//                     <Text style={styles.text}>Email</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={email}
//                         onChangeText={setEmail}
//                         placeholder="Nhập email"
//                         keyboardType="email-address"
//                     />
//                 </View>

//                 {/* Gọi component DatePickerComponent */}
//                 <DatePickerComponent
//                     selectedYear={selectedYear}
//                     setSelectedYear={setSelectedYear}
//                     selectedMonth={selectedMonth}
//                     setSelectedMonth={setSelectedMonth}
//                     selectedDay={selectedDay}
//                     setSelectedDay={setSelectedDay}
//                 />
//             </View>
            
//             <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
//                 <Text style={styles.updateText}>CẬP NHẬT</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };