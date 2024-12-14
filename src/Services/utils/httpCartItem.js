import { API, API_GET_LIST_CART_ITEM, API_ADD_CART_ITEM, API_DELETE_CART_ITEM, API_UPDATE_CART_ITEM } from '@env';

export const get_list_cart_item = async (cartId) => {
    try {
      const response = await fetch(`${API}${API_GET_LIST_CART_ITEM}/${cartId}`);
      if (!response.ok) throw new Error("Failed to fetch cart items.");
      return await response.json();
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      throw error;
    }
  };
  

export const add_cart_item = async (cartId,cartItem) => {
    try {
        const response = await fetch(`${API}${API_ADD_CART_ITEM}/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart_id: cartId,
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

export const update_cart_item_quantity = async (itemId, newQuantity) => {
    try {
        const response = await fetch(`${API}${API_UPDATE_CART_ITEM}/${itemId}/quantity`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity, 
            }),
        });
        if (!response.ok) throw new Error("Failed to update cart item quantity.");
        return await response.json();
    } catch (error) {
        console.error("Error updating cart item quantity:", error.message);
        throw error;
    }
};

