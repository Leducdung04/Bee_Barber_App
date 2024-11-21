import { API, API_ADD_Review} from "@env";

export const Add_Review_API = async (review) => {
  try {
    const response = await fetch(`${API}${API_ADD_Review}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    const data = await response.json();
    if (!response.ok) {
      return false;
    }
    console.log("Lấy dữ liệu thành công", data);
    return data;
  } catch (error) {
    console.log('Error add appointment', error);
    return false;
  }
};
