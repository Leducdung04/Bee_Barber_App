import { API, API_GET_USER_CART, API_ADD_CART } from '@env';

export const get_user_cart = async (userId) => {
    try {
        const response = await fetch(`${API}${API_GET_USER_CART}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Failed to fetch user cart.");
        }
        const cart = await response.json();
        return cart;
    } catch (error) {
        if (error.message === 'Network request failed') {
            console.error("Network error: Please check your internet connection.");
        } else {
            console.error("Error fetching user cart:", error.message);
        }
        throw error;
    }
};

export const add_user_cart = async (userId) => {
    try {
        const response = await fetch(`${API}${API_ADD_CART}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Failed to add cart.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding cart:", error.message);
        throw error;
    }
};

