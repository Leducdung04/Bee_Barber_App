import { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

const usebanner = ({ listBanner }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const dotContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNextImage();
    }, 6000); // Tự động cuộn sau 3 giây

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const scrollToNextImage = () => {
    if (!scrollViewRef.current) return; // Kiểm tra nếu ref chưa được gán giá trị

    const nextIndex = (currentImageIndex + 1) % listBanner.length;
    scrollViewRef.current.scrollTo({
      x: Dimensions.get('window').width * nextIndex,
      animated: true,
    });
    setCurrentImageIndex(nextIndex);
  };

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get('window').width;
    const newIndex = Math.floor(contentOffsetX / screenWidth);
    setCurrentImageIndex(newIndex);
  };

  const scrollToDot = (index) => {
    if (!scrollViewRef.current) return; // Kiểm tra nếu ref chưa được gán giá trị

    scrollViewRef.current.scrollTo({
      x: Dimensions.get('window').width * index,
      animated: true,
    });
    setCurrentImageIndex(index);
  };

  return {
    scrollToNextImage,
    handleScrollEnd,
    scrollToDot,
    scrollViewRef,
    dotContainerRef,
    currentImageIndex,
  };
};

export default usebanner;
