import React, { useEffect, useState } from 'react'
import { get_List_Category } from '../Services/utils/httpCategory';
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';
import { get_List_Product } from '../Services/utils/httpProduct';

const useShopTab = () => {
    const [productList, setProductList] = useState([]);
    const [categoryList, setcategoryList] = useState([])
    const [categoryProductList, setcategoryProductList] = useState([])


    useEffect(() => {
       async function getListCategory(){
         const listCategory_response= await get_List_Category()
         setcategoryList(listCategory_response)
       }
       async function getListCategoryProduct(){
         const listCategoryProduct_response= await get_List_Category_Product()
         setcategoryProductList(listCategoryProduct_response)
       }
       async function getListProduct(){
        const listProduct_response= await get_List_Product()
        setProductList(listProduct_response)
       }
       getListCategoryProduct()
       getListCategory()
       getListProduct()
    }, [])

    return {productList,categoryList,categoryProductList}
    
}

export default useShopTab
