import {API,API_GET_LIST_CATEGORY} from "@env"

export const get_List_Category= async ()=>{
        try {
            const response = await fetch(`${API}${API_GET_LIST_CATEGORY}`);
            console.log("API",`${API}${API_GET_LIST_CATEGORY}`)
            const data = await response.json();
            return data;
          console.log("lấy dữ liệu thành công")
          console.log(data)

        } catch (error) {
            console.log('Error getting list Banner', error)
            return []
        }
}