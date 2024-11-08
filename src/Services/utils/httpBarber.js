import {API,API_GET_LIST_CATEGORY_BARBER} from "@env"

export const get_List_Barber= async ()=>{
        try {
            const response = await fetch(`${API}${API_GET_LIST_CATEGORY_BARBER}`);
            const data = await response.json();
            console.log("lấy dữ liệu Barber thành công")
            return data;
        } catch (error) {
            console.log('Error getting list Barber', error)
            return []
        }
}