import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { getUserInfoById, updateUser } from '../../Services/utils/httpSingup'; // Đường dẫn đến hàm getUserInfoById và updateUser
import { getUserlocal } from '../../Services/utils/user__AsyncStorage';
import { setUserlocal } from '../../Services/utils/user__AsyncStorage';
import colors from '../../Resources/styles/colors';

const UpdateUserScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null); // State để lưu userId
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // Thêm state cho số điện thoại

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy userId từ AsyncStorage
            const storedUserId = await getUserlocal();
            if (storedUserId) {
                setUserId(storedUserId._id); // Lưu userId vào state

                // Lấy thông tin người dùng từ API nếu có userId
                const data = await getUserInfoById(storedUserId._id);
                if (data && data.data) {
                    setName(data.data.name || '');
                    setEmail(data.data.email || '');
                    setPhone(data.data.phone || ''); // Lưu số điện thoại vào state
                }
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

        // Kiểm tra số điện thoại
        if (phone.length < 10) {
            Alert.alert('Thông báo', 'Số điện thoại không hợp lệ.');
            return;
        }

        // Gọi hàm cập nhật thông tin người dùng
        const result = await updateUser(userId, name, phone, email);
        if (result) {
            await setUserlocal({ _id: userId, name, phone, email });
            Alert.alert('Thông báo', 'Cập nhật thông tin thành công!');
            navigation.goBack(); // Quay lại màn hình trước đó
        } else {
            Alert.alert('Thông báo', 'Cập nhật thông tin thất bại!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../Resources/assets/images/men.png')} // Placeholder cho ảnh đại diện
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
                    <Text style={styles.text}>Số điện thoại*</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateText}>CẬP NHẬT</Text>
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
        backgroundColor: colors.primary300,
        paddingVertical: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor:colors.primary300,
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