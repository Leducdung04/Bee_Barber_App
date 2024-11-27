import React, { useEffect, useState } from 'react'
import { get_List_Banner } from '../Services/utils/httpBanner';
import { get_List_Category } from '../Services/utils/httpCategory';
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';
import { get_list_barber } from '../Services/api/httpStylist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBarbers } from '../stores/features/barbersSlice';

const useHomeTab = () => {
   // const [listBanner, setlistBanner] = useState([]);
    //const [categoryProductList, setcategoryProductList] = useState([])
    // Lấy trạng thái từ Redux store
    const  barberList  = useSelector((state) => state.barbers.barbers);
    const  categoryList  = useSelector((state) => state.categorys.categorys);
    const  listBanner  = useSelector((state) => state.banners.banners);
    const  categoryProductList  = useSelector((state) => state.categoryProducts.categoryProducts);
    useEffect(() => {
       
       async function getListBanner() {
          let list = await get_List_Banner()
          console.log("Home banner: " + list)
          setlistBanner(list)
       }
       async function getListCategoryProduct(){
         let listCategoryProduct_response= await get_List_Category_Product()
         console.log('Home category product: ' + listCategoryProduct_response)
         setcategoryProductList(listCategoryProduct_response)
       }
      // getListCategoryProduct()
       // getListBanner()
    }, [])

    return {listBanner,categoryList,categoryProductList,barberList}
    
}

export default useHomeTab
