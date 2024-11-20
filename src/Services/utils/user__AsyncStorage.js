import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setUserlocal(payload) {
    try {
        const stringifiedPayload = JSON.stringify(payload); // Chuyển đối tượng thành chuỗi
        await AsyncStorage.setItem("userLocal", stringifiedPayload);
        console.log('đã được thêm')
    } catch (error) {
        console.log('xảy ra lỗi')
    }
    
}
export async function deleteUserlocal() {
    try {
        await AsyncStorage.removeItem("userLocal");
        console.log("Dữ liệu đã được xóa");
    } catch (error) {
        console.log("Xảy ra lỗi khi xóa dữ liệu:", error);
    }
}


export const getUserlocal= async () => {
    try {
        const value = await AsyncStorage.getItem("userLocal");
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
        
    } catch (error) {
      // Error retrieving data
    }
  };