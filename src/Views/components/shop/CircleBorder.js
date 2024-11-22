import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Badge } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import { get_list_cart_item } from '../../../Services/utils/httpCartItem';
import eventEmitter from '../../../Services/utils/event';

export default function CircleBorder({
  border = 'white',
  name,
  size,
  color = 'black',
  onPress,
  circleSize = 31,
  background = 'white',
}) {
  const [badgeCount, setBadgeCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      const cartItems = await get_list_cart_item();
      setBadgeCount(cartItems.length);
    } catch (error) {
      console.error('Lỗi lấy sản phẩm:', error.message);
    }
  };

  const isImage = !['sort-variant', 'dots-three-vertical', 'search-outline'].includes(name);

  const renderIcon = () => {
    switch (name) {
      case 'sort-variant':
        return (
          <Icon2
            name={name}
            size={size}
            color={color}
            style={styles.mirrorIcon}
          />
        );
      case 'dots-three-vertical':
        return <Icon3 name={name} size={size} color={color} />;
      case 'search-outline':
        return <Icon1 name={name} size={size} color={color} />;
      default:
        return (
          <Image
            source={require('../../../Resources/assets/icons/cart.png')}
            style={styles.icon}
          />
        );
    }
  };

  useEffect(() => {
    fetchCartItems();
    const listener = eventEmitter.on('cartUpdated', fetchCartItems);

    return () => listener.removeListener();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {renderIcon()}
        {isImage && badgeCount > 0 && (
          <Badge style={styles.badge}>{badgeCount}</Badge>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -9,
    backgroundColor: '#15397F',
    color: 'white',
    fontSize: 10,
    height: 18,
    minWidth: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
