import { API,API_GET_USER_DETAIL } from '@env'

DEFAULT_USER_ID = "66fe1856faa0e86597afdbae"

export const getUserDetailById = async() => {
    try {
        const response = await fetch(`${API}${API_GET_USER_DETAIL}/${DEFAULT_USER_ID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Lấy dữ liệu người dùng thành công", data);
        return data;
    } catch (error) {
        console.log('Lấy dữ liệu người dùng thất bại', error.message); // In lỗi chi tiết hơn
        console.log(IP);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}
