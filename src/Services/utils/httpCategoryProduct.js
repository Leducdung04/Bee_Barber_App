import {API, API_GET_LIST_CATEGORY_PRODUCT} from '@env';

export const get_List_Category_Product = async () => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_CATEGORY_PRODUCT}?status=true`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error getting list CategoryProduct', error);
    return [];
  }
};

