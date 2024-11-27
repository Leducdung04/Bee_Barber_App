import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP';
import { useNavigation } from '@react-navigation/native';


const widthScreen =Dimensions.get('window').width
const ProductLayout = ({ item }) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity  onPress={() => nav.navigate("ProductScreen", item)}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item.image ? replaceLocalhostWithIP(item.image) : replaceLocalhostWithIP('http://localhost:3000/uploads/image-1730628816225.jpg'), }}
          style={styles.productImage}
          defaultSource={require('../../../Resources/assets/images/anh2.png')}
          onError={() => console.log("Image failed to load")}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.productPrice}>{item.price_selling.toLocaleString()} VNĐ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductLayout;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'column',
    alignItems:'center',
    paddingVertical:12,
    margin:6,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    width: (widthScreen/2)-12,
    borderRadius: 12,
  },
  productImage: {
    width: 150,
    height: 140,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
  },
});
