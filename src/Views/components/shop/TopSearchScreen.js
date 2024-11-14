import {
  Animated,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProductLayout from './ProductLayout';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Divider, Searchbar, Checkbox} from 'react-native-paper';
import useShopTab from '../../../ViewModels/useShopTab'
import { Product } from '../../../Models/Product';
import { useRoute } from '@react-navigation/native';
import { get_List_Product_By_Category } from '../../../Services/utils/httpProduct';

const TopSearchScreen = () => {
  const [value, setValue] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [priceRange, setPriceRange] = useState({from: '', to: ''});
  const {productList,categoryProductList}  = useShopTab()
  const route = useRoute();
  const { categoryId } = route.params;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterModal, slideAnim]);

  const data = [
    {label: 'Mặc định', value: '1'},
    {label: 'Đánh giá cao', value: '2'},
    {label: 'Giá thấp đến cao', value: '3'},
    {label: 'Giá cao đến thấp', value: '4'},
    {label: 'Tên: từ A-Z', value: '5'},
    {label: 'Tên: từ Z-A', value: '6'},
  ];

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (categoryId) {
        const products = await get_List_Product_By_Category(categoryId);
        setFilteredProducts(products);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  const ProductTopRecomendations = ({products}) => (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => <ProductLayout item={item} />}
      keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())} 
    />
  );
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Mặc định"
          searchPlaceholder="Tìm kiếm..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}>
          <Text style={styles.filterText}>Lọc</Text>
          <MaterialCommunityIcons
            name="filter-outline"
            size={24}
            color="darkslategrey"
          />
        </TouchableOpacity>
      </View>
      <ProductTopRecomendations products={categoryId ? filteredProducts : productList} />
      
    </View>
  );
};

export default TopSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#b4b4b4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdown: {
    width: 200,
    height: 40,
    backgroundColor: '#b4b4b4',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  tabContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 7,
    backgroundColor: 'white',
    position: 'relative',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  productItem: {
    backgroundColor: '#eaeaea',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    flex: 1,
  },
  indicator: {
    marginTop: 5,
    height: 4,
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: 290,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  clearFiltersButton: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  clearFiltersText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  applyFiltersButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  applyFiltersText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
  },
  modalSubText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    color: 'dimgrey',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  ratingContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    width: '45%',
    color: 'lightslategrey',
  },
  priceRangeText: {
    fontWeight: '600',
    color: 'darkgrey',
  },
  priceRangeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    color: 'grey',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starCountText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  starText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'dimgrey',
    fontWeight: '600',
  },
  
});
