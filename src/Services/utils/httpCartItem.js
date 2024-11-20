import { API, API_GET_LIST_CART_ITEM, API_ADD_CART_ITEM, API_DELETE_CART_ITEM } from '@env';

const DEFAULT_CART_ID = "66f52e41126304a655e0dae5"; 

export const get_list_cart_item = async (cartId) => {
    try {
        const response = await fetch(`${API}${API_GET_LIST_CART_ITEM}?cart_id=${DEFAULT_CART_ID}`);
        if (!response.ok) throw new Error("Failed to fetch cart items.");
        return await response.json();
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        throw error;
    }
};

export const add_cart_item = async (cartItem) => {
    try {
        const response = await fetch(`${API}${API_ADD_CART_ITEM}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart_id: DEFAULT_CART_ID,
                ...cartItem,
            }),
        });
        if (!response.ok) throw new Error("Failed to add cart item.");
        return await response.json();
    } catch (error) {
        console.error("Error adding cart item:", error.message);
        throw error;
    }
};

export const delete_cart_item = async (itemId) => {
    try {
        const response = await fetch(`${API}${API_DELETE_CART_ITEM}/${itemId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete cart item.");
        return await response.json();
    } catch (error) {
        console.error("Error deleting cart item:", error.message);
        throw error;
    }
};
