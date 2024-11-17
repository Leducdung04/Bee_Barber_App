import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_SEND_NOTIFICATION, API } from '@env'
import { getToken, requestUserPermission,initializeFCM,sendLocalNotification,sendRemoteNotification } from '../../../Services/api/notificationhelper'

const ProductScreen = () => {
  const route = useRoute();
  const nav = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState(null);

  const product = route.params;
  const url = replaceLocalhostWithIP(product.image);
  const totalPrice = product.price_selling * quantity;

  useEffect(() => {
    const setupNotifications = async () => {
      await requestUserPermission();
      await initializeFCM(getToken, setToken);
    };
    setupNotifications();
  }, []);

  const handleAddToCartNotification = async () => {
    if (!token) {
      console.warn('FCM Token is not available. Notifications might not be sent.');
      return;
    }

    const payload = {
      user_id: '66fe1856faa0e86597afdbae',
      relates_id: product._id,
      type: 'general',
      content: `Sản phẩm ${product.name} đã được thêm vào giỏ hàng.`,
      deviceToken: token,
    };

    try {
      console.log('Sending remote notification payload:', payload);

      // Send remote notification
      const result = await sendRemoteNotification({
        url: `${API}${API_SEND_NOTIFICATION}`,
        payload,
      });
      console.log('Remote notification sent successfully:', result);

      // Send local notification
      sendLocalNotification({
        channelId: 'default-channel',
        title: 'Sản phẩm đã được thêm vào giỏ hàng',
        message: `Sản phẩm ${product.name} đã được thêm vào giỏ hàng.`,
        data: { relates_id: product._id, user_id: '66fe1856faa0e86597afdbae' },
      });
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: url }} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productPrice}>
            {product.price_selling.toLocaleString()} VNĐ
          </Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            {
              console.log('Current token before notification:', token);
              handleAddToCartNotification(product);
              nav.navigate('Cart');
            }
          }}
        >
          <MaterialIcons name="add-shopping-cart" size={23} color="black" />
          <Text style={styles.buttonText}>THÊM GIỎ HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={openModal}>
          <Text style={styles.buyButtonText}>MUA HÀNG</Text>
          <Text style={styles.subText}>Không ưng đổi ngay</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent animationType="slide">
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalItemContainer}>
              <Image source={{ uri: url }} style={styles.modalProductImage} />
              <View style={styles.modalProductDetails}>
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>
                  {product.price_selling.toLocaleString()} VNĐ
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                    <MaterialIcons name="remove" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                    <MaterialIcons name="add" size={24} color="white" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalTotalPrice}>
                  Total: {totalPrice.toLocaleString()} VNĐ
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default ProductScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  productImage: {
    width: '100%',
    height: 290,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buyButton: {
    backgroundColor: '#1b4283',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'papayawhip',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalProductImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  modalProductDetails: {
    flex: 1,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalProductPrice: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: 'white',
  },
  modalTotalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
});
