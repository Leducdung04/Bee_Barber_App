
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import ProductLayout from './ProductLayout';
import useShopTab from '../../../ViewModels/useShopTab';
import { get_List_Product_By_Category } from '../../../Services/utils/httpProduct';
import colors from '../../../Resources/styles/colors';

const MaterialTopApp = () => {
  const { productList, categoryProductList } = useShopTab();
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);  

  useEffect(() => {
  
    if (categoryProductList.length > 0 && selectedCategory === null) {
      const defaultCategoryId = categoryProductList[0]._id;
      setSelectedCategory(defaultCategoryId);
    }
  }, [categoryProductList]);

  useEffect(() => {

    const fetchProductsByCategory = async () => {
      if (selectedCategory !== null) {
        const productsByCategory = await get_List_Product_By_Category(selectedCategory);
        setFilteredProducts(productsByCategory);
      } else {
        setFilteredProducts(productList); 
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory, productList]);

  const handleTabPress = categoryId => {
    setSelectedCategory(categoryId); 
  };

  const ProductRecomendationsList = ({products}) => (
    <FlatList
     style={{backgroundColor:colors.background}}
      data={products}
      numColumns={2}
      renderItem={({item}) => <ProductLayout item={item} onPress={item.onPress} />}
      keyExtractor={item => item.id?.toString() || Math.random().toString()} 
      scrollEnabled={false}
      ListHeaderComponent={HeaderTabs}
      onContentSizeChange={(contentWidth, contentHeight) => setContentHeight(contentHeight)}  
      contentContainerStyle={{
        paddingBottom: contentHeight > 0 ? 100 : 0,  
      }}
    />
  );

  const HeaderTabs = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}  style={styles.tabContainer}>
        {categoryProductList.map((item, index) => (
          <TouchableOpacity
            key={`${item._id}-${index}`} 
            style={styles.tabButton}
            onPress={() => handleTabPress(item._id)}>
            <Text style={styles.tabText}>{item.name}</Text>
            {selectedCategory === item._id && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ProductRecomendationsList products={filteredProducts} />
    </View>
  );
};

export default MaterialTopApp;

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: 'white',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  indicator: {
    marginTop: 5,
    height: 4,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 2,
  },
});
