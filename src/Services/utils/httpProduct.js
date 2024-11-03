import {API, API_GET_LIST_PRODUCT,API_GET_LIST_PRODUCT_BY_CATEGORY} from '@env';

export const get_List_Product = async () => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_PRODUCT}`);
    console.log(`${API}${API_GET_LIST_PRODUCT}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error getting list Product', error);
    return [];
  }
};

export const get_List_Product_By_Category = async(id) =>{
  try {
    const response = await fetch(`${API}${API_GET_LIST_PRODUCT_BY_CATEGORY}?category_id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
  
  }
}