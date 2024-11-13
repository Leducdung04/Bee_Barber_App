import { API, API_REGISTER_ACCOUNT, API_CHECK_PHONE_NUMBER, API_CHECK_PHONE_AND_GET_ID, API_GET_USER_INFO, API_UPDATE_ACCOUNT } from "@env";

export const registerUser = async (phone, password) => {
    try {
        const response = await fetch(`${API}${API_REGISTER_ACCOUNT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                password: password,
            }),
        });

        // Kiểm tra phản hồi từ API
        if (!response.ok) {
            const errorData = await response.json(); // Lấy thông tin lỗi nếu có
            throw new Error(`Error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error during registration', error);
        return { success: false, message: 'Registration failed' };
    }
};


export const checkPhoneNumberExists = async (phone) => {
    try {
        const response = await fetch(`${API}${API_CHECK_PHONE_NUMBER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
        });

        // Kiểm tra phản hồi từ API
        console.log('API response status:', response.status); // Ghi log mã trạng thái

        if (!response.ok) {
            const errorData = await response.text(); // Sử dụng text để xem phản hồi
            throw new Error(`Error: ${errorData}`);
        }

        const data = await response.json();
        console.log('API response data:', data); // Ghi log dữ liệu phản hồi
        
        return data.registered; // Chỉnh sửa ở đây: sử dụng 'registered' thay vì 'exists'
    } catch (error) {
        console.log('Error checking phone number:', error);
        return false; // Hoặc xử lý lỗi khác theo ý bạn
    }
};


export const checkPhoneAndGetId = async (phone) => {
    try {
        
        const response = await fetch(`${API}${API_CHECK_PHONE_AND_GET_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
        });

        console.log('API response status for checkPhoneAndGetId:', response.status);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${errorData}`);
        }

        const data = await response.json();
        console.log('API response data for checkPhoneAndGetId:', data);
        return { registered: data.registered, userId: data.userId }; // Trả về ID người dùng và trạng thái đăng ký
    } catch (error) {
        console.log('Error checking phone and getting ID:', error);
        return { registered: false, userId: null }; // Hoặc xử lý lỗi khác theo ý bạn
    }
};


export const getUserInfoById = async (userId) => {
    try {
        const response = await fetch(`${API}${API_GET_USER_INFO}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('API response status for getUserInfoById:', response.status);

        if (!response.ok) {
            const errorData = await response.text();
            console.log('Error data:', errorData); // Log thêm thông tin chi tiết về lỗi
            throw new Error(`Error: ${errorData}`);
        }

        const data = await response.json();
        console.log('API response data for getUserInfoById:', data);
        return data; // Trả về thông tin người dùng
    } catch (error) {
        console.log('Error getting user info:', error);
        return null; // Hoặc xử lý lỗi khác theo ý bạn
    }
};

export const updateUserInfo = async (userId, userInfo) => {
    try {
        const response = await fetch(`${API}${API_UPDATE_ACCOUNT}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        console.log('API response status for updateUserInfo:', response.status); // Log mã trạng thái

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('API response data for updateUserInfo:', data);
        return data;
    } catch (error) {
        console.log('Error updating user info:', error);
        return { success: false, message: 'Update failed' };
    }
};


