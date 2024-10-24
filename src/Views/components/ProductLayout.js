import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductLayout = ({item, onPress}) => {

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={16}
          color="#FFD700"
        />,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.touchableContainer} onPress={onPress}>
      <View style={styles.productContainer}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.priceRange}</Text>
          {/* <View style={styles.rating}>{renderStars(item.rating)}</View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductLayout;

const styles = StyleSheet.create({
  touchableContainer: {
    margin: 2,
  },
  productContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 17,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 4,
    
    borderRadius: 10,
  },
  productImage: {
    width: 187,
    height: 142,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'center',
  },
  productInfo: {
    alignItems: 'baseline',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
    fontWeight: '600',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
