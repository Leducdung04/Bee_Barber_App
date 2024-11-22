import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { search_product_by_name } from '../../../Services/utils/httpProduct';
import ProductLayout from './ProductLayout';
import { useRoute } from '@react-navigation/native';

const SearchProduct = ({ navigation }) => {
  const route = useRoute();
  const [searchTerm, setSearchTerm] = useState(route.params?.searchTerm || ''); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchProducts = async () => {
        const result = await search_product_by_name(searchTerm);
        setProducts(result);
      };
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    navigation.setParams({ searchTerm });
  }, [searchTerm, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductLayout item={item} />}
        ListEmptyComponent={<Text>Không có kết quả.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: 313,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 17,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginVertical: 1,
    height: 33,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },
  iconContainer: {
    marginRight: 1,
  },
});

export default SearchProduct;
