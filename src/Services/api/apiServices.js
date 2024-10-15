// Services/api/apiService.js
import { API, API_Get_List_Appointments } from '@env';

export const get_List_Appointments = async () => {
  try {
    const response = await fetch(`${API}${API_Get_List_Appointments}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};
