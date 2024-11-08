import { API, API_GET_LIST_APPOINTMENTS } from '@env'; // Nhập các biến môi trường từ file cấu hình

// Hàm lấy danh sách cuộc hẹn từ API
export const get_List_Appointments = async () => {
    try {
        // Gửi yêu cầu GET đến API để lấy danh sách cuộc hẹn
        const response = await fetch(`${API}${API_GET_LIST_APPOINTMENTS}`);
        console.log("API", `${API}${API_GET_LIST_APPOINTMENTS}`); // In ra URL API đã gọi
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành định dạng JSON
        console.log("Lấy dữ liệu appointment thành công", data); // In ra dữ liệu nhận được
        return data; // Trả về dữ liệu
    } catch (error) {
        // Xử lý lỗi nếu có
        console.log('Error getting list appointments', error.message); // In ra thông báo lỗi
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}

