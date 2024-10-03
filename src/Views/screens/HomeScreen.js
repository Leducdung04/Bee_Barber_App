import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {API_Get_List_Banner} from "@env"

const HomeScreen = () => {
  const [list, setlist] = useState([])
  useEffect(() => {
     const getlist = async ()=>{
       const res = await fetch(`http://0.0.0.0:3000/api/get_list_banner`)
       const data = await res.json()
       console.log('get list', data)
     }
     getlist()
  }, [])
  
  return (
    <View>
      <FlatList
          data={list}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) =>{ 
            let img = item.image.replace("localhost", "192.168.1.3")
            console.log("img", img)
            return (
            <View>
            <Text>{item.title}</Text>
            <Image source={{uri : img}} style={{width:100,height:100}}/>
            </View>
          )}}
        
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})