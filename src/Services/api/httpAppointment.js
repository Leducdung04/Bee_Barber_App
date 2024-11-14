import { API, API_ADD_appointment } from "@env";

export const Add_Appointment_API = async (appointment) => {
  try {
    const response = await fetch(`${API}${API_ADD_appointment}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({appointment}),
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
