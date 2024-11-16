import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoById, updateUserInfo } from '../../Services/utils/httpSingup'; // Đường dẫn đến hàm getUserInfoById và updateUserInfo

const UpdateUserScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null); // State để lưu userId
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');

    // // Lấy userId từ AsyncStorage khi component được mount
    // useEffect(() => {
    //     const fetchUserId = async () => {
    //         const storedUserId = await AsyncStorage.getItem('userId'); // Lấy userId từ AsyncStorage
    //         setUserId(storedUserId); // Lưu userId vào state
    //     };

    //     fetchUserId(); // Gọi hàm để lấy userId
    // }, []);

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         if (userId) {
    //             const data = await getUserInfoById(userId); // Lấy thông tin người dùng từ API
    //             setName(data.name || '');
    //             setEmail(data.email || '');
    //             setBirthDate(data.birthDate || ''); // Giả sử dữ liệu ngày sinh là birthDate
    //         }
    //     };
    //     if (userId) {
    //         fetchUserInfo(); // Chỉ gọi API khi đã có userId
    //     }
    // }, [userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy userId từ AsyncStorage
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId); // Lưu userId vào state

                // Lấy thông tin người dùng từ API nếu có userId
                const data = await getUserInfoById(storedUserId);
                setName(data.name || '');
                setEmail(data.email || '');
                setBirthDate(data.birthDate || '');
            }
        };

        fetchUserData(); // Gọi hàm để lấy userId và thông tin người dùng
    }, []); // Chỉ chạy khi component được mount


    const handleUpdate = async () => {
        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            Alert.alert('Thông báo', 'Email không hợp lệ.');
            return;
        }

        // Kiểm tra định dạng ngày sinh
        const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/; // Định dạng YYYY-MM-DD
        if (birthDate && !birthDatePattern.test(birthDate)) {
            Alert.alert('Thông báo', 'Ngày sinh không hợp lệ, vui lòng nhập theo định dạng YYYY-MM-DD.');
            return;
        }

        // Tạo đối tượng thông tin người dùng
        const userInfo = {
            name,
            email,
            birthDate, // Bao gồm ngày sinh trong thông tin cập nhật
        };

        // Cập nhật thông tin người dùng
        try {
            const result = await updateUserInfo(userId, userInfo); // Gọi hàm cập nhật
            console.log('Update result:', result); // Kiểm tra kết quả trả về
            if (result.success !== false) {
                Alert.alert('Thông báo', 'Thông tin đã được cập nhật!');
                navigation.navigate('UserProfile');
            } else {
                Alert.alert('Thông báo', result.message);
            }
        } catch (error) {
            console.error('Error updating user info:', error); // Log lỗi nếu có
            Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../Resources/assets/images/Avata.jpg')} // Placeholder cho ảnh đại diện
                    style={styles.profileImage}
                />
            </View>
            <View style={styles.group}>
                <View style={styles.formGroup}>
                    <Text style={styles.text}>Họ tên*</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nhập họ tên"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Nhập email"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.text}>Ngày sinh</Text>
                    <TextInput
                        style={styles.input}
                        value={birthDate}
                        onChangeText={setBirthDate}
                        placeholder="Nhập ngày sinh (YYYY-MM-DD)"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateText} onPress={handleUpdate}>CẬP NHẬT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        backgroundColor: '#153A80',
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: '#ccc',
        borderWidth: 3,
        borderColor: '#fff',
    },
    group: {
        backgroundColor: '#ffffff',
        paddingBottom: 0,
        elevation: 5,
        marginTop: 40,
        paddingBottom: 50,
    },
    formGroup: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 25,
    },
    text: {
        fontSize: 18,
        color: '#153A80',
        fontWeight: '500',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    input: {
        fontSize: 16,
        paddingVertical: 2,
    },

    updateButton: {
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#CCCCCC',
        margin: 20,
        borderRadius: 10,
        marginBottom: 70,
        marginTop: 'auto',
    },
    updateText: {
        fontSize: 20,
        color: '#555555',
        fontWeight: 'bold',
    },
});

export default UpdateUserScreen;