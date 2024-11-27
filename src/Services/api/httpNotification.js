import { API} from "@env";
import { getUserlocal } from "../utils/user__AsyncStorage";

export const  getNotification = async (id) => {
  try {
    const user= await getUserlocal()
    const response = await fetch(`${API}getnotifications/${user._id}`);
    const data = await response.json();
    if (!response.ok) {
      console.log('Error:', data);
      return [];
    }
    console.log(" lấy dữ liệu thành công ", data);
    return data.data;
  } catch (error) {
    console.log('Error add oder', error);
    return [];
  }
};
