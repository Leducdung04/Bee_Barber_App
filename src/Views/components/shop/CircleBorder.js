import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import { useCart } from '../../../Services/utils/cartContext';

export default function CircleBorder({
  name,
  size,
  color = 'black',
  onPress,
}) {
  const { badgeCount } = useCart(); 

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
