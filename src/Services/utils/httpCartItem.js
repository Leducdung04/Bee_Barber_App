import { API, API_GET_LIST_CART_ITEM, } from '@env';

export const get_list_cart_item = async (id) => {
    try {
        const response = await fetch(`${API}${API_GET_LIST_CART_ITEM}?cart_id=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

