import { API, API_REGISTER_ACCOUNT, API_LOGIN_PHONE } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (phone, password,name) => {
    try {
        const fcmToken = await AsyncStorage.getItem('fcmToken')
        const response = await fetch(`${API}${API_REGISTER_ACCOUNT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
                deviceTokens:fcmToken,
                name:name
            }),
        });

        // Kiểm tra phản hồi từ API
        if (response.ok) {
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.error('sảy ra lỗi',error)
    }
};

export const loginPhone = async (phone, password) => {
    try {
        const fcmToken = await AsyncStorage.getItem('fcmToken')
        const response = await fetch(`${API}${API_LOGIN_PHONE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
                deviceTokens:fcmToken
            }),
        });

        // Kiểm tra phản hồi từ API
        if (response.ok) {
            const data = await response.json();
            return data
        }

    
    } catch (error) {
       console.error("lỗi khi tạo tài khoản",error)
    }
};

export const getUserInfoById = async(id) => {
    try {
        const response = await fetch(`${API}${API_GET_USER_DETAIL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Lấy dữ liệu người dùng thành công", data);
        return data;
    } catch (error) {
        console.log('Lấy dữ liệu người dùng thất bại', error.message);
        console.log(IP);
        return [];
    }
}
