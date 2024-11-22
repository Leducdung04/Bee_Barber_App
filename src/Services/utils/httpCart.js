import { API, API_GET_USER_CART } from '@env'; 

export const get_user_cart = async (token) => {
    try {
        const response = await fetch(`${API}${API_GET_USER_CART}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
                // 'Cache-Control': 'no-cache', 
                // Pragma: 'no-cache',
                // Expires: '0',
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
