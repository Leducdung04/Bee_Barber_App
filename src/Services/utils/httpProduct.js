import {API, API_GET_LIST_PRODUCT} from '@env';

export const get_List_Product = async () => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_PRODUCT}`);
    const data = await response.json();
    return data;
    console.log('lấy dữ liệu thành công');
    console.log(data);
  } catch (error) {
    console.log('Error getting list Product', error);
    return [];
  }
};