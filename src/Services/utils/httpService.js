import {API,API_GET_SERVICE_BY_CATEGORY} from "@env"

export const get_Service_By_Category= async (id_category)=>{
        try {
            const response = await fetch(`${API}${API_GET_SERVICE_BY_CATEGORY}/${id_category}`);
            const data = await response.json();
            return data;
          console.log("lấy dữ liệu thành công")
          console.log(data)

        } catch (error) {
            console.log('Error getting list Banner', error)
            return []
        }
}