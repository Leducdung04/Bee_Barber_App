// import { API, API_Get_List_Appointments } from '@env';

// // Hàm lấy danh sách cuộc hẹn từ API
// export const get_List_Appointments = async () => {
//     try {
//         const response = await fetch(`${API}${API_Get_List_Appointments}`);
//         console.log("API", `${API}${API_Get_List_Appointments}`);
//         const data = await response.json();
//         console.log("Lấy dữ liệu thành công", data);
//         return data;
//     } catch (error) {
//         console.log('Error getting list appointments', error);
//         return [];
//     }
// }

// Services/utils/utils.js
export const formatDate = (date) => {
    // Logic to format date
    return new Date(date).toLocaleDateString();
  };
  
  export const calculateTotalPrice = (selectedServices) => {
    // Logic to calculate the total price based on selected services
    return selectedServices.length * 100; // Ví dụ, mỗi dịch vụ giá 100
  };
  