import { API} from "@env";

export const ProducByID = async (id) => {
  try {
    const response = await fetch(`${API}products/get_product_detail/${id}`);
    const data = await response.json();
    if (!response.ok) {
      console.log('Error:', data);
      return false;
    }
    console.log(" lấy dữ liệu thành công ", data);
    return data.data;
  } catch (error) {
    console.log('Error add oder', error);
    return false;
  }
};
