import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import globalStyles from '../../../Resources/styles/globalStyles'
import colors from '../../../Resources/styles/colors'


const widthScreen= Dimensions.get('window').width
const heightScreen= Dimensions.get('window').height
const ItemService = ({item}) => {
    console.log("item",item)
   const url = replaceLocalhostWithIP(item.images)

  return (
    <TouchableOpacity >
        <View style={styles.container}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text numberOfLines={3} style={styles.textDescription}>{item.description}</Text>
            <Image source={{uri:url}} style={{width:(widthScreen/2)-40,height:120,borderRadius:8}}/>
            <View style={{position:'absolute',flexDirection:'row',marginTop:12,bottom:20,start:12}}>
                <View style={{borderWidth:2,borderColor:colors.primary100,paddingHorizontal:16,paddingVertical:2,borderRadius:8}}>
                    <Text style={{fontSize:16,color:colors.primary}}>{item.duration} Phút</Text>
                </View>
                <View style={{backgroundColor:colors.primary,justifyContent:'center',marginHorizontal:12,borderRadius:8,padding:4}}> 
                     <Text style={{color:'white',fontWeight:'bold'}}>Chỉ từ {item.price}k</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ItemService

const styles = StyleSheet.create({
    container:{
        width: (widthScreen/2)-24,
        height:heightScreen/3,
        marginVertical:8,
        marginHorizontal:6,
        borderRadius:12,
        backgroundColor:'white',
        padding:12
    },
    textName:{
        color:'black',
        fontSize:16,
        fontWeight:'bold',
    },
    textDescription:{
        marginVertical:12,
        minHeight:24
    }
})