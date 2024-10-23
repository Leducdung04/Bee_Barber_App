import React, { useEffect, useState } from 'react'
import { get_List_Banner } from '../Services/utils/httpBanner';
import { get_List_Category } from '../Services/utils/httpCategory';
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';
import { get_List_Barber } from '../Services/utils/httpBarber';

const useHomeTab = () => {
    const [listBanner, setlistBanner] = useState([]);
    const [categoryList, setcategoryList] = useState([])
    const [categoryProductList, setcategoryProductList] = useState([])
    const [barberList, setbarberList] = useState([])


    useEffect(() => {
      async function getListBarber() {
        let list = await get_List_Barber()
        setbarberList(list)
     }
       
       async function getListBanner() {
          let list = await get_List_Banner()
          setlistBanner(list)
       }
       async function getListCategory(){
         let listCategory_response= await get_List_Category()
         setcategoryList(listCategory_response)
       }
       async function getListCategoryProduct(){
         let listCategoryProduct_response= await get_List_Category_Product()
         setcategoryProductList(listCategoryProduct_response)
       }
       getListCategoryProduct()
       getListBanner()
       getListCategory()
       getListBarber()
    }, [])

    return {listBanner,categoryList,categoryProductList,barberList}
    
}

export default useHomeTab
