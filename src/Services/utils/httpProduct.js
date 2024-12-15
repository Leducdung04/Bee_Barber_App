import { API, API_GET_LIST_PRODUCT, API_GET_LIST_PRODUCT_BY_CATEGORY, API_GET_PRODUCT_DETAILS,API_SEARCH_PRODUCT_BY_NAME } from '@env';

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

export const get_List_Product_By_Category = async (id) => {
  try {
    const response = await fetch(`${API}${API_GET_LIST_PRODUCT_BY_CATEGORY}?category_id=${id}&status=true`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching products by category', error);
    return [];
  }
};

export const get_product_detail = async (id) => {
  try {
    const response = await fetch(`${API}${API_GET_PRODUCT_DETAILS}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching products', error);
  }
}

export const search_product_by_name = async (name) => {
  try {
    const response = await fetch(`${API}${API_SEARCH_PRODUCT_BY_NAME}?name=${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching products by category', error);
    return [];
  }
}