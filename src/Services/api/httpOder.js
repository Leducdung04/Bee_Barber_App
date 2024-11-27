import { API} from "@env";
import { getUserlocal } from "../utils/user__AsyncStorage";


export const Add_Oder_API = async (oder) => {
  try {
    const response = await fetch(`${API}addOrderWithPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oder),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('Error:', data);
      return false;
    }
    console.log(" Tạo oder thành công ", data);
    return data;
  } catch (error) {
    console.log('Error add oder', error);
    return false;
  }
};
export const get_oder_history = async () => {
    try {
      const user= await getUserlocal()
      const response = await fetch(`${API}getOrdersByUserId/${user._id}`)
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      console.log('data',data)
    } catch (error) {
      console.log('Error add get_Appointment_history', error);
      return false;
    }
  };

export const updateOderStatusToCancelel_Case = async (oderId) => {
    console.log('ok',`${API}updateOderStatusToCanceled/${oderId}`)
    try {
      const response = await fetch(`${API}updateOderStatusToCanceled/${oderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log('Error:', data);
        return false;
      }
      console.log("Lấy dữ liệu thành công", data);
      return data;
    } catch (error) {
      console.log('Error add appointment', error);
      return false;
    }
  };
  
  
  export const updateOderStatusToCancelel_ZaloPay = async (oderId,bank_account) => {
    try {
      const response = await fetch(`${API}updateOderStatusToCanceled_ByZaloPay/${oderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({bank_account}),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log('Error:', data);
        return false;
      }
      console.log("Lấy dữ liệu thành công", data);
      return data;
    } catch (error) {
      console.log('Error add appointment', error);
      return false;
    }
  };
  