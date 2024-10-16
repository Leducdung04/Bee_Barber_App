import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ThreeImagesLayout from './ThreeImagesLayout';
import { useNavigation } from '@react-navigation/native';

const TopSearch = () => {
  const scrollTrackWidth = useRef(0);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  const nav = useNavigation()
  const searchItems = [
    {
      image1: require('../../Resources/assets/images/anh9.jpg'),
      image2: require('../../Resources/assets/images/anh10.jpg'),
      image3: require('../../Resources/assets/images/anh11.jpg'),
      text: 'Sữa rửa mặt',
      action: () => nav.navigate('TopSearchScreen'),
    },
    {
      image1: require('../../Resources/assets/images/anh12.jpg'),
      image2: require('../../Resources/assets/images/anh9.jpg'),
      image3: require('../../Resources/assets/images/anh10.jpg'),
      text: 'Sáp vuốt tóc',
      action: () => console.log('Sáp vuốt tóc'),
    },
    {
      image1: require('../../Resources/assets/images/anh12.jpg'),
      image2: require('../../Resources/assets/images/anh10.jpg'),
      image3: require('../../Resources/assets/images/anh9.jpg'),
      text: 'Kem chống nắng',
      action: () => console.log('Kem chống nắng'),
    },
    {
      image1: require('../../Resources/assets/images/anh9.jpg'),
      image2: require('../../Resources/assets/images/anh10.jpg'),
      image3: require('../../Resources/assets/images/anh11.jpg'),
      text: 'Dưỡng da',
      action: () => console.log('Dưỡng da'),
    },
    {
      image1: require('../../Resources/assets/images/anh12.jpg'),
      image2: require('../../Resources/assets/images/anh9.jpg'),
      image3: require('../../Resources/assets/images/anh10.jpg'),
      text: 'Pre Styling',
      action: () => console.log('Pre Styling'),
    },
    {
      image1: require('../../Resources/assets/images/anh12.jpg'),
      image2: require('../../Resources/assets/images/anh10.jpg'),
      image3: require('../../Resources/assets/images/anh9.jpg'),
      text: 'Gôm giữ nếp',
      action: () => console.log('Gôm giữ nếp'),
    },
    {
      image1: require('../../Resources/assets/images/anh12.jpg'),
      image2: require('../../Resources/assets/images/anh10.jpg'),
      image3: require('../../Resources/assets/images/anh9.jpg'),
      text: 'Khử mùi cơ thể',
      action: () => console.log('Khử mùi cơ thể'),
    },
  ];

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const completeWidth = contentSize.width;
    const visibleWidth = layoutMeasurement.width;

    const scrollRatio = contentOffset.x / (completeWidth - visibleWidth);

    const newScrollBarWidth = scrollRatio * scrollTrackWidth.current;

    setScrollBarWidth(Math.min(newScrollBarWidth, scrollTrackWidth.current));
  };
 
 
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#15397f',
          fontSize: 24,
          marginHorizontal: 16,
          marginVertical: 16,
          fontWeight: 'bold',
        }}>
        TOP TÌM KIẾM
      </Text>
      <View style={styles.scrollContainer}>
        <View
          style={styles.scrollTrack}
          onLayout={event => {
            scrollTrackWidth.current = event.nativeEvent.layout.width;
          }}>
          <View style={[styles.scrollIndicator, {width: scrollBarWidth}]} />
        </View>
        <ScrollView
          horizontal={true}
          onScroll={handleScroll}
          scrollEventThrottle={19}
          showsHorizontalScrollIndicator={false}>
          {searchItems.map((item, index) => (
            <TouchableOpacity onPress={item.action} key={index}>
              <ThreeImagesLayout
                image1={item.image1}
                image2={item.image2}
                image3={item.image3}
                text={item.text}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TopSearch;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    position: 'relative',
  },
  scrollTrack: {
    height: 4,
    backgroundColor: '#a0c9eb',
    marginTop: 5,
    marginEnd: 20,
    bottom: 0,
    left: 10,
    right: 10,
  },
  scrollIndicator: {
    height: '100%',
    backgroundColor: '#15397f',
    width: 100,
  },
});
