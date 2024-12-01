import { API, API_REGISTER_ACCOUNT, API_LOGIN_PHONE,API_GET_USER_DETAIL, API_SEND_OTP, API_VERIFY_OTP, API_UPDATE_PASSWORD, API_UPDATE_USER  } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (phone, password,name, email) => {
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
                name:name,
                email:email
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
        

        return [];
    }
}

// Cập nhật thông tin người dùng
export const updateUser = async (id, name, phone, email) => {
    try {
        const response = await fetch(`${API}${API_UPDATE_USER}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } 
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng", error);
        return false;
    }
};




// Gửi mã OTP
export const sendOtp = async (email) => {
    try {
        const response = await fetch(`${API}${API_SEND_OTP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        
            const data = await response.json();
            return data;
         
    } catch (error) {
        return false;
    }
};

// Xác thực mã OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await fetch(`${API}${API_VERIFY_OTP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } 
    } catch (error) {
        return false;
    }
};

// Đổi mật khẩu
export const updatePassword = async (email, newPassword) => {
    try {
        const response = await fetch(`${API}${API_UPDATE_PASSWORD}/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } 
    } catch (error) {
        return false;
    }
};