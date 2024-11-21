import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import colors from '../../../Resources/styles/colors'
import globalStyles from '../../../Resources/styles/globalStyles'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


const CategoryProductList = ({ onScrollStart, onScrollEnd, categoryProductList }) => {
  const nav = useNavigation()
  const Item_Category_Product = ({ item }) => {
    const url = replaceLocalhostWithIP(item.image)
    console.log(item.image);
    console.log("ảnh", url)
    return (
      <TouchableOpacity onPress={() => nav.navigate("CategoryScreen",{ category:item})}>
        <View style={{ marginHorizontal: 8 }} >
          <ImageBackground source={require('../../../Resources/assets/images/backgrougCategoryPt.png')} style={{ width: 62, height: 62, margin: 12, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: url }} style={{ width: 36, height: 36 }} />
          </ImageBackground>
          <Text style={{ width: 80, textAlign: 'center', color: 'black' }}>{item.name}</Text>
        </View>
      </TouchableOpacity>)
  }

  return (
    <View style={{ margin: 12 }}>
      <View style={styles.titleContainer}>
        <View style={styles.TitleContainerRight}></View>
        <Text style={[globalStyles.textTitle, { marginStart: 12 }]}>Barber Shop </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // onScrollBeginDrag={onScrollStart}
        // onMomentumScrollEnd={onScrollEnd}
        data={categoryProductList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Item_Category_Product item={item} />}

        ListEmptyComponent={() => {
          return <View style={{ marginHorizontal: 8, flexDirection: 'row' }}>
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
          </View>
        }

        }
      />
    </View>
  )
}

export default CategoryProductList

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  TitleContainerRight: {
    width: 6, height: 30, backgroundColor: colors.primary300, borderRadius: 4
  },
  gridItem: {
    width: 54, height: 54, borderRadius: 36, marginHorizontal: 12
  }

})