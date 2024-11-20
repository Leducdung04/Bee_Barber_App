import React, { useEffect, useState } from 'react'
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';
import { get_List_Product } from '../Services/utils/httpProduct';

const useShopTab = () => {
    const [productList, setProductList] = useState([]);
    const [categoryProductList, setcategoryProductList] = useState([]);
    useEffect(() => {
       async function getListCategoryProduct(){
         const listCategoryProduct_response= await get_List_Category_Product()
         setcategoryProductList(listCategoryProduct_response)
       }
       async function getListProduct(){
        const listProduct_response= await get_List_Product()
        setProductList(listProduct_response)
       }
       getListCategoryProduct()
       getListProduct()
       
    }, [])
    return {productList,categoryProductList}
    
}

export default useShopTab
