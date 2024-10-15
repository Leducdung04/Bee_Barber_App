import {API, API_GET_LIST_CATEGORY_PRODUCT} from '@env';

export const get_List_Category_Product = async () => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_CATEGORY_PRODUCT}`);
    const data = await response.json();
    return data;
    console.log('lấy dữ liệu thành công');
    console.log(data);
  } catch (error) {
    console.log('Error getting list CategoryProduct', error);
    return [];
  }
};
