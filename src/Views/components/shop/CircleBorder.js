import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import { Badge } from 'react-native-paper';
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
  refreshTrigger
}) {
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
      default:
        return <Icon1 name={name} size={size} color={color} />;
    }
  };
  const [badgeCount, setBadgeCount] = useState(0);
  const fetchCartItems = async () => {
    try {
      const cartItems = await get_list_cart_item();
      setBadgeCount(cartItems.length);
    } catch (error) {
      console.error('Lỗi lấy sản phẩm:', error.message);
    }
  };
  useEffect(() => {
    fetchCartItems();
    const listener = eventEmitter.on('cartUpdated', fetchCartItems);

    return () => listener.removeListener(); 
  }, []);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <View
          style={[
            styles.circle,
            {
              borderColor: border,
              backgroundColor: background,
              width: circleSize,
              height: circleSize,
            },
          ]}>
          {renderIcon()}
        </View>
        {name === 'cart-outline' && badgeCount > 0 && (
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
  circle: {
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirrorIcon: {
    transform: [{ scaleX: -1 }],
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -5,
    backgroundColor: '#15397F',
    color: 'white',
  },
});
