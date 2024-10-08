import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge} from 'react-native-paper';

export default function CircleBorder({border = "white", name, size, color = "black", onPress, badgeCount}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.circle, {borderColor: border}]}>
          {name === 'sort-variant' ? (
            <Icon2
              name={name}
              size={size}
              color={color}
              style={styles.mirrorIcon}
            />
          ) : (
            <Icon1 name={name} size={size} color={color} />
          )}
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
    width: 35,
    height: 35,
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirrorIcon: {
    transform: [{scaleX: -1}],
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -5,
    backgroundColor: '#15397F', 
    color: 'white',
  },
});
