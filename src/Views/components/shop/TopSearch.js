import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ThreeImagesLayout from './ThreeImagesLayout';
import {get_List_Product_By_Category} from '../../../Services/utils/httpProduct';
import useShopTab from '../../../ViewModels/useShopTab';

const defaultImage = require('../../../Resources/assets/images/anh7.png');

const TopSearch = () => {
  const scrollTrackWidth = useRef(0);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  const nav = useNavigation();
  const {categoryProductList} = useShopTab();
  const [categoryImages, setCategoryImages] = useState({});

  const fetchCategoryImages = async () => {
    const imagesMap = {};
    for (const category of categoryProductList) {
      const products = await get_List_Product_By_Category(category._id);
      console.log("Your phhone linging",products.image);
      const productImages = products
        .slice(0, 3) 
        .map(product => ({ uri: product.image || '' }));
      imagesMap[category._id] = [
        productImages[0] || defaultImage,
        productImages[1] || defaultImage,
        productImages[2] || defaultImage,
      ]; 
    }
    setCategoryImages(imagesMap);
  };
  

  useEffect(() => {
    fetchCategoryImages();
  }, [categoryProductList]);

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const completeWidth = contentSize.width;
    const visibleWidth = layoutMeasurement.width;
    const scrollRatio = contentOffset.x / (completeWidth - visibleWidth);
    setScrollBarWidth(
      Math.min(
        scrollRatio * scrollTrackWidth.current,
        scrollTrackWidth.current,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TOP TÌM KIẾM</Text>
      <View style={styles.scrollContainer}>
        <View
          style={styles.scrollTrack}
          onLayout={event =>
            (scrollTrackWidth.current = event.nativeEvent.layout.width)
          }>
          <View style={[styles.scrollIndicator, {width: scrollBarWidth}]} />
        </View>
        <ScrollView
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={19}
          showsHorizontalScrollIndicator={false}>
          {categoryProductList.map(category => (
            <TouchableOpacity
              key={category._id}
              onPress={() =>
                category && nav.navigate('TopSearchScreen', {category})
              }>
              <ThreeImagesLayout
               image1={categoryImages[category._id]?.[0]}
               image2={categoryImages[category._id]?.[1]}
               image3={categoryImages[category._id]?.[2]}
               text={category.name}
               category={category} 
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TopSearch;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  title: {
    color: '#15397f',
    fontSize: 24,
    margin: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    position: 'relative',
  },
  scrollTrack: {
    height: 4,
    backgroundColor: '#a0c9eb',
    marginTop: 5,
    marginHorizontal: 20,
  },
  scrollIndicator: {
    height: '100%',
    backgroundColor: '#15397f',
  },
});
