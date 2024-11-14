import { IPV4, API_HTTP_ZALOPAY } from "@env";

export const OrderZaloPay = async (amount) => {
  try {
    const response = await fetch(`http://${IPV4}:3000/${API_HTTP_ZALOPAY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount}),
    });

    console.log("API", `http://${IPV4}:3000/${API_HTTP_ZALOPAY}`); // In URL API
    const data = await response.json();

    // Kiểm tra nếu có lỗi từ server
    if (!response.ok) {
      console.log('Error:', data);
      return false;
    }
    console.log("Lấy dữ liệu thành công", data);
    return data;

  } catch (error) {
    console.log('Error getting ZaloPay order', error);
    return false;
  }
};


export const checkZaloPay = async (app_trans_id) => {

    try {
        const response = await fetch(`http://${IPV4}:3000/order-status/${app_trans_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json(); // Nếu phản hồi là JSON
            return data
        }
    } catch (error) {
        console.log('xảy ra lỗi:', error);  // In lỗi chi tiết
    }
  };


