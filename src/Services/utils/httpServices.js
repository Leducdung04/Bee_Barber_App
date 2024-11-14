import { API, API_GET_LIST_SERVICES } from '@env'; // Nhập các biến môi trường từ file cấu hình

// Hàm lấy danh sách cuộc hẹn từ API
export const get_List_Services = async () => {
    try {
        const response = await fetch(`${API}${API_GET_LIST_SERVICES}`);
        console.log("API URL:", `${API}${API_GET_LIST_SERVICES}`); // In ra URL để kiểm tra
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Lấy dữ liệu services thành công", data);
        return data;
    } catch (error) {
        console.log('Error getting list services', error.message); // In lỗi chi tiết hơn
        console.log(IP);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
};
