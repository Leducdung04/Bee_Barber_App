import {API, API_GET_LIST_NOTIFICATIONS} from '@env'

type = "booking"
export const get_List_Notification = async (userId,status) => {
    try {
      const response = await fetch(`${API}${API_GET_LIST_NOTIFICATIONS}?user_id=${id}&type=${type}&status=${status}`);
      const data = await response.json();
      return data;
     
    } catch (error) {
      console.log('Error getting list Notification', error);
      return [];
    }
  };
  