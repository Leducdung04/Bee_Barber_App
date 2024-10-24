import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import globalStyles from '../../../Resources/styles/globalStyles'
import colors from '../../../Resources/styles/colors'

const BarberList = ({barberList}) => {

    const Item_Barber=({item})=>{
       console.log('item Barber',item)
        const imageUrl = item.image ? replaceLocalhostWithIP(item.image) : require('../../../Resources/assets/images/barberBackgroug.png');
  
        return <View style={{margin:8,alignItems:'center'}}>
              <View style={{backgroundColor:'#c2dcf7',borderRadius:12}}>
              <Image  source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={{width:130,height:220,borderRadius:12}}/>
              </View>
              <Text style={{color:colors.primary,marginTop:6,fontWeight:'bold'}}>{item.name}</Text>
        </View>
       
    }
  return (
    <View style={{margin:12}}>
      <View style={styles.titleContainer}>
        <View style={styles.TitleContainerRight}></View>
        <Text style={[globalStyles.textTitle,{marginStart:12}]}>Stylist </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={barberList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item})=> <Item_Barber item={item}/>}
        ListFooterComponent={()=><View style={{height:400}}></View>}
        ListEmptyComponent={()=>{
          return <View style={{marginHorizontal:8,flexDirection:'row'}}>
            <LinearGradient
          colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gridItem}>
              {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
              {/* <ActivityIndicator size={'small'} color='#D3D3D4'/> */}
          </LinearGradient>
          <LinearGradient
          colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gridItem}>
              {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
              {/* <ActivityIndicator size={'small'} color='#D3D3D4'/> */}
          </LinearGradient>
          <LinearGradient
          colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gridItem}>
              {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
              {/* <ActivityIndicator size={'small'} color='#D3D3D4'/> */}
          </LinearGradient>
          <LinearGradient
          colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gridItem}>
              {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
              {/* <ActivityIndicator size={'small'} color='#D3D3D4'/> */}
          </LinearGradient>
          </View>}
     
        }
      />
    </View>
  )
}

export default BarberList

const styles = StyleSheet.create({
    gridItem:{
        width:54,height:54,borderRadius:36,marginHorizontal:12
    },
    titleContainer:{
      flexDirection:'row',
  },
  TitleContainerRight:{
      width:6,height:30,backgroundColor:colors.primary300,borderRadius:4
  }
})