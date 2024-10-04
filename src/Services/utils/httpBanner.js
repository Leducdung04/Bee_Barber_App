import {API,API_Get_List_Banner} from "@env"

export const get_List_Banner= async ()=>{
        try {
            const response = await fetch(`${API}${API_Get_List_Banner}`);
            console.log("API",`${API}${API_Get_List_Banner}`)
            const data = await response.json();
            return data;
          console.log("lấy dữ liệu thành công")
          console.log(data)

        } catch (error) {
            console.log('Error getting list Banner', error)
            return []
        }
}