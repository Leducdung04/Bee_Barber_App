import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductScreen = () => {
  const product = {
    name: 'Wireless Headphones',
    price: 488000,
    description:
      'High-quality wireless headphones with noise cancellation and 40 hours of battery life. Perfect for music lovers and frequent travelers.',
    imageUrl: require('../../Resources/assets/images/anh11.jpg'),
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={product.imageUrl} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productPrice}>
            {product.price.toLocaleString()} VNĐ
          </Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <MaterialIcons name="add-shopping-cart" size={23} color="black" />
          <Text style={styles.buttonText}>THÊM GIỎ HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>MUA HÀNG</Text>
          <Text style={styles.subText}>Không ưng đổi ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 15,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,

    paddingVertical: 15,
  },
  buyButton: {
    backgroundColor: '#1b4283',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginLeft: 8,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  subText: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
});
