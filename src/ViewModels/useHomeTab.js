import React, { useEffect, useState } from 'react'
import { get_List_Banner } from '../Services/utils/httpBanner';
import { get_List_Category } from '../Services/utils/httpCategory';
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';

const useHomeTab = () => {
    const [listBanner, setlistBanner] = useState([]);
    const [categoryList, setcategoryList] = useState([])
    const [categoryProductList, setcategoryProductList] = useState([])


    useEffect(() => {
       async function getListBanner() {
          const list = await get_List_Banner()
          setlistBanner(list)
       }
       async function getListCategory(){
         const listCategory_response= await get_List_Category()
         setcategoryList(listCategory_response)
       }
       async function getListCategoryProduct(){
         const listCategoryProduct_response= await get_List_Category_Product()
         setcategoryProductList(listCategoryProduct_response)
       }
       getListCategoryProduct()
       getListBanner()
       getListCategory()
    }, [])

    return {listBanner,categoryList,categoryProductList}
    
}

export default useHomeTab
