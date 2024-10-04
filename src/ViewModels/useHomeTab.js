import React, { useEffect, useState } from 'react'
import { get_List_Banner } from '../Services/utils/httpBanner';

const useHomeTab = () => {
    const [listBanner, setlistBanner] = useState([]);


    useEffect(() => {
       async function getListBanner() {
          const list = await get_List_Banner()
          setlistBanner(list)
       }
       getListBanner()
    }, [])

    return {listBanner}
    
}

export default useHomeTab
