import React, { useEffect, useState } from 'react'
import { get_List_Banner } from '../Services/utils/httpBanner';
import { get_List_Category } from '../Services/utils/httpCategory';
import { get_List_Category_Product } from '../Services/utils/httpCategoryProduct';
import { get_list_barber } from '../Services/utils/httpbarber';

const useHomeTab = () => {
    const [listBanner, setlistBanner] = useState([]);
    const [categoryList, setcategoryList] = useState([])
    const [categoryProductList, setcategoryProductList] = useState([])
    const [barberList, setbarberList] = useState([])


    useEffect(() => {
      async function getListBarber() {
        let list = await get_list_barber()
        console.log("Home bareber: " + list)
        setbarberList(list)
     }
       
       async function getListBanner() {
          let list = await get_List_Banner()
          console.log("Home banner: " + list)
          setlistBanner(list)
       }
       async function getListCategory(){
         let listCategory_response= await get_List_Category()
         console.log('Home category: ' + listCategory_response)
         setcategoryList(listCategory_response)
       }
       async function getListCategoryProduct(){
         let listCategoryProduct_response= await get_List_Category_Product()
         console.log('Home category product: ' + listCategoryProduct_response)
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
