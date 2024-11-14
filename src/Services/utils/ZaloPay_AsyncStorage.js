import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setZaloPayload(payload) {
    try {
        const stringifiedPayload = JSON.stringify(payload); // Chuyển đối tượng thành chuỗi
        await AsyncStorage.setItem("zalo_pay", stringifiedPayload);
        console.log('đã được thêm')
    } catch (error) {
        console.log('xảy ra lỗi')
    }
    
}
export async function deleteZaloPayload() {
    try {
        await AsyncStorage.removeItem("zalo_pay");
        console.log("Dữ liệu đã được xóa");
    } catch (error) {
        console.log("Xảy ra lỗi khi xóa dữ liệu:", error);
    }
}


export const getZaloPay= async () => {
    try {
        const value = await AsyncStorage.getItem("zalo_pay");
        if (value !== null) {
            return JSON.parse(value);
          }
        
    } catch (error) {
      // Error retrieving data
    }
  };