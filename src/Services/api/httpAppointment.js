import { API, API_ADD_appointment,API_ADD_appointment_history } from "@env";
import { getUserlocal } from "../utils/user__AsyncStorage";

export const Add_Appointment_API = async (appointment) => {
  try {
    const response = await fetch(`${API}${API_ADD_appointment}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
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

export const get_Appointment_history = async () => {
  try {
    const user= await getUserlocal()
    const response = await fetch(`${API}${API_ADD_appointment_history}${user._id}`)
    console.log('uri',`${API}${API_ADD_appointment_history}${user._id}`)
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

export const updateAppointmentStatusToCancelel_Case = async (appointmentId) => {
  try {
    const response = await fetch(`${API}updateAppointmentStatusToCanceled/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('ok',`${API}updateAppointmentStatusToCanceled/${appointmentId}`)
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


export const updateAppointmentStatusToCancelel_ZaloPay = async (appointmentId,bank_account) => {
  try {
    const response = await fetch(`${API}updateAppointmentStatusToCanceled_ByZaloPay/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({bank_account}),
    });
    console.log('ok',`${API}updateAppointmentStatusToCanceled_ByZaloPay/${appointmentId}`)
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
