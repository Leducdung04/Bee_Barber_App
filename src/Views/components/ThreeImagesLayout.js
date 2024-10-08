import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';

const ThreeImagesLayout = ({image1, image2, image3, text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.overlayText}>{text}</Text>
      
      <View style={[styles.leftSection, styles.shadow]}>
        <ImageBackground 
          source={image1} 
          style={styles.largeImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.rightSection}>
        <View style={[styles.smallImageContainer, styles.shadow]}>
          <Image
            source={image2}
            style={styles.smallImage}
          />
        </View>
        <View style={[styles.smallImageContainer, styles.shadow]}>
          <Image
            source={image3}
            style={styles.smallImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 290,
    height: 210,
    padding: 10,
    position: 'relative',
  },
  leftSection: {
    flex: 2,
    marginRight: 5,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 5,
  },
  largeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  smallImageContainer: {
    width: '100%',
    height: '49%',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  overlayText: {
    position: 'absolute',  
    bottom: 12,                
    fontSize: 18,
    width:"100%",
    fontWeight: '400',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginLeft:10,
    padding: 5,
    borderRadius: 5,
    textAlign: 'left', 
    zIndex: 1,             
  },
});

export default ThreeImagesLayout;
