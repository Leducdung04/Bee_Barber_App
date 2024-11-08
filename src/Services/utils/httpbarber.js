import { API, API_GET_LIST_BARBER } from '@env'; // Nhập các biến môi trường từ file cấu hình

// Hàm lấy danh sách barber từ API
export const get_list_barber = async () => {
    try {
        // Gửi yêu cầu GET đến API để lấy danh sách barber
        const response = await fetch(`${API}${API_GET_LIST_BARBER}`);
        console.log("API", `${API}${API_GET_LIST_BARBER}`); // In ra URL API đã gọi
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Chuyển đổi phản hồi thành định dạng JSON
        console.log("Lấy dữ liệu barber thành công", data); // In ra dữ liệu nhận được

        // Lọc chỉ lấy 3 trường "image", "name", và "status"
        const filteredData = data.map((barber) => ({
            _id: barber._id,
            image: barber.image,
            name: barber.name,
            status: barber.status
        }));

        console.log("Dữ liệu barber đã được lọc", filteredData); // In ra dữ liệu đã lọc
        return filteredData; // Trả về dữ liệu đã lọc
    } catch (error) {
        // Xử lý lỗi nếu có
        console.log('Error getting list barber', error.message); // In ra thông báo lỗi
        
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}