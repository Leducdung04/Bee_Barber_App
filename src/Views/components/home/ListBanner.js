import React, { useEffect } from 'react';
import { View, FlatList, Image, Dimensions, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP';
import usebanner from '../../../ViewModels/scrollBanner';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';


const widthScreen= Dimensions.get('window').width
const heightScreen= Dimensions.get('window').height

const ListBanner = ({listBanner}) => {
  const {
    scrollToNextImage,
    handleScrollEnd,
    scrollToDot,
    scrollViewRef,
    dotContainerRef,
    currentImageIndex,
  } = usebanner({listBanner})

  // const renderItem = ({ item }) => {
  //   let url = replaceLocalhostWithIP(item?.image)
  //   console.log('uri',url)
  //    return <Image source={{uri: url}} style={{flex:1,width:widthScreen,height:heightScreen/6}} />
  // };


  if (!listBanner || listBanner.length === 0) {
    return (
        <LinearGradient
          colors={['#D3D3D3', '#F4F4F4', '#E0E0E0']} // Các màu sáng/tối để tạo hiệu ứng shimmer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          
          style={ { width: widthScreen, height: heightScreen / 6,justifyContent:'center',alignItems:'center' }}>
               {/* <Image style={{width:24,height:24}} source={require('../../../Resources/assets/icons/reload.png')}/> */}
               <ActivityIndicator size={'small'} color='#D3D3D4'/>
          </LinearGradient>
    );
  }
  
  

  return (
    <View style={{  height: heightScreen / 6 }}>
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollEnd}
      scrollEventThrottle={16}
    >
      {listBanner.map((image, index) => {
        const url = replaceLocalhostWithIP(image?.image);
        return (
          <View key={index}>
            <ImageBackground
              source={{ uri: url }}
              style={{ width: widthScreen, height: heightScreen / 6}}
            />
          </View>
        );
      })}
    </ScrollView>
    <View style={styles.dotContainer}>
      {listBanner.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.dot, index === currentImageIndex && styles.activeDot]}
          onPress={() => scrollToDot(index)}
        />
      ))}
    </View>
  </View>
  );
};

export default ListBanner;
const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    height:8,
    width:25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
})
