import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../../../Resources/styles/globalStyles'
import colors from '../../../Resources/styles/colors'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'


const widthScreen= Dimensions.get('window').width
const heightScreen= Dimensions.get('window').height
const Item_Category =({index,item,widthItem})=>{
  const navigation = useNavigation()

  function onClick(){
    navigation.navigate('ServiceByCategoryScreen',item)
  }
  const url = replaceLocalhostWithIP(item.image)
  const itemHeight = index % 2 === 0 ? (widthScreen / 2) * 1.4 : (widthScreen / 2) * 1.2;

   return <TouchableOpacity onPress={()=>onClick()}>
   <View style={[globalStyles.containerShadow,{margin:4,height:itemHeight,marginVertical:8}]}>
      <Image style={{height:itemHeight,width:widthItem,borderRadius:12}}
                            source={{uri : url}}>
      </Image>
      <View style={{height:itemHeight/3,width:widthItem,
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
  const [numColumnsList, setnumColumnsList] = useState(2)
  const [widthItem, setwidthItem] = useState((widthScreen/2)-12)

  useEffect(() => {
     if(widthScreen <360){
        setnumColumnsList(2)
        setwidthItem((widthScreen/2)-12)
     }else{
        setnumColumnsList(3)
        setwidthItem((widthScreen/3)-12)
     }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.TitleContainerRight}></View>
        <Text style={[globalStyles.textTitle,{marginStart:12}]}>Dịch vụ </Text>
      </View>
      <FlatList key={numColumnsList}
                style={{marginTop:24}}
                data={categoryList}
                numColumns={numColumnsList}
                keyExtractor={(item) => item._id.toString()}
               renderItem={(item)=> <Item_Category widthItem={widthItem} index={item.index+1} item={item.item}/>}

               ListEmptyComponent={()=>{
                  return <FlatList
                  key={numColumnsList}
                        style={{marginBottom:100}}
                        data={[1,2,3,4]}
                        numColumns={ numColumnsList}
                        renderItem={({item})=>{
                          const itemHeight = item % 2 === 0 ? (widthScreen / 2) * 1.4 : (widthScreen / 2) * 1.2;

                          return <LinearGradient keyExtractor={item}
                        colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[globalStyles.containerShadow,{width:(widthScreen/3)-12,margin:8,height:itemHeight,marginVertical:8,justifyContent:'center',alignItems:'center',borderRadius:4}]}>
                            {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
                            <ActivityIndicator size={'small'} color='gray'/>
                        </LinearGradient>}}
                      />
               }}
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