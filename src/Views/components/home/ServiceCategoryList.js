import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '../../../Resources/styles/globalStyles'
import colors from '../../../Resources/styles/colors'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import { useNavigation } from '@react-navigation/native'


const widthScreen= Dimensions.get('window').width
const heightScreen= Dimensions.get('window').height
const Item_Category =({index,item})=>{
  const navigation = useNavigation()
  // const [widthItem, setwidthItem] = useState('')
  function onClick(){
    navigation.navigate('ServiceByCategoryScreen',item)
  }
  // if (widthScreen < 360) {
  //   console.log('Đây là màn hình nhỏ');
  //   setwidthItem((widthScreen/2)-12)
  // } else {
  //   console.log('Đây là màn hình trung bình hoặc lớn');
  //   setwidthItem((widthScreen/3)-12)
  // }

  const url = replaceLocalhostWithIP(item.image)
  const itemHeight = index % 2 === 0 ? (widthScreen / 2) * 1.4 : (widthScreen / 2) * 1.2;
  // (widthScreen/2)*1.2
 // ((widthScreen/2)*1.2)
   return <TouchableOpacity onPress={()=>onClick()}>
   <View style={[globalStyles.containerShadow,{margin:4,height:itemHeight,marginVertical:8}]}>
      <Image style={{height:itemHeight,width:(widthScreen/3)-12,borderRadius:12}}
                            source={{uri : url}}>
      </Image>
      <View style={{height:itemHeight/3,width:(widthScreen/3)-12,
           position:'absolute',
           bottom:10,
           justifyContent:'space-around'
      }}>
        <Text style={[globalStyles.textTitle,{textAlign:'center',marginHorizontal:12}]}>{item.name}</Text>
        <Text style={[globalStyles.textTitle,{textAlign:'center',marginHorizontal:12,fontWeight:'condensed',fontSize:16}]}>Tìm hiểu thêm ➪</Text>
      </View>
    </View>
    </TouchableOpacity>
}

const ServiceCategoryList = ({categoryList}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.TitleContainerRight}></View>
        <Text style={[globalStyles.textTitle,{marginStart:12}]}>Dịch vụ </Text>
      </View>
      <FlatList  style={{marginTop:24}}
                data={categoryList}
                numColumns={ widthScreen <360? 2:3}
                keyExtractor={(item) => item._id.toString()}
               renderItem={(item)=> <Item_Category index={item.index+1} item={item.item}/>}
      />
    </View>
  )
}

export default ServiceCategoryList

const styles = StyleSheet.create({
    container:{
      margin:12
    },
    titleContainer:{
        flexDirection:'row',
    },
    TitleContainerRight:{
        width:6,height:30,backgroundColor:colors.primary300,borderRadius:4
    }
})