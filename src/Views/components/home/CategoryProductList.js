import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import colors from '../../../Resources/styles/colors'
import globalStyles from '../../../Resources/styles/globalStyles'


const CategoryProductList = ({categoryProductList}) => {

  const Item_Category_Product= ({item})=>{
       const url=replaceLocalhostWithIP(item.image)
       console.log("ảnh",url)
    return <View style={{marginHorizontal:8}}>
                <ImageBackground source={require('../../../Resources/assets/images/backgrougCategoryPt.png')} style={{width:62,height:62,margin:12,justifyContent:'center',alignItems:'center'}}>
                        <Image source={{uri:url}} style={{width:36,height:36}}/>
                </ImageBackground>
                <Text style={{width:80,textAlign:'center',color:'black'}}>{item.name}</Text>
            </View>
  }
  return (
    <View style={{margin:12}}>
      <View style={styles.titleContainer}>
        <View style={styles.TitleContainerRight}></View>
        <Text style={[globalStyles.textTitle,{marginStart:12}]}>Barber Shop </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categoryProductList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item})=> <Item_Category_Product item={item}/>}
      />
    </View>
  )
}

export default CategoryProductList

const styles = StyleSheet.create({
  titleContainer:{
    flexDirection:'row',
},
TitleContainerRight:{
    width:6,height:30,backgroundColor:colors.primary300,borderRadius:4
}
})