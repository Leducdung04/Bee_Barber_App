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
import { add_cart_item } from '../../../Services/utils/httpCartItem';
import { getToken, requestUserPermission, initializeFCM, sendLocalNotification, sendRemoteNotification } from '../../../Services/api/notificationhelper'
import eventEmitter from '../../../Services/utils/event';


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

  useEffect(() => {
    if (product.category_id.name) {
      nav.setOptions({
        title: product.category_id.name, 
      });
    }
  }, [product.category_id.name, nav]);


  const handleAddToCart = async () => {
    try {
      const cartItem = {
        product_id: product._id,
        quantity,
        total: totalPrice,
      };

      const addedItem = await add_cart_item(cartItem);
      console.log("Cart item added successfully:", addedItem);
      eventEmitter.emit('cartUpdated');
      await handleAddToCartNotification();

      nav.navigate("Cart");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleBuyNow = async () => {
    try {
      const cartItem = {
        product_id: product._id,
        quantity,
        total: totalPrice,
      };

      const addedItem = await add_cart_item(cartItem);
      console.log("Cart item added successfully:", addedItem);
      eventEmitter.emit('cartUpdated');
      await handleAddToCartNotification();

      nav.navigate("OrderConfirmationScreen",{selectedItem: cartItem});
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  }
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

      const result = await sendRemoteNotification({
        url: `${API}${API_SEND_NOTIFICATION}`,
        payload,
      });
      console.log('Remote notification sent successfully:', result);
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
    }).start(() => {
      setShowModal(false);
      setQuantity(1);
    });
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
              handleAddToCart()
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
      <Modal visible={showModal} transparent animationType="fade">
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
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <MaterialIcons name="close" style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.modalItemContainer}>
              <Image source={{ uri: url }} style={styles.modalProductImage} />
              <View style={styles.modalProductDetails}>
                <Text style={styles.modalProductName}>{product.name}</Text>
                <Text style={styles.modalProductPrice}>
                  {product?.price_selling?.toLocaleString() ?? "N/A"} VNĐ
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
            <TouchableOpacity style={styles.modalButton} onPress={handleBuyNow}>
              <Text style={styles.modalButtonText}>Add to Cart</Text>
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
    backgroundColor: '#ffffff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    elevation: 10, // Add a shadow for modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalProductImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 20,
    resizeMode: 'cover',
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  modalProductDetails: {
    flex: 1,
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#1E40AF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalTotalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 15,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
    padding: 8,
  },
  closeIcon: {
    fontSize: 20,
    color: '#4B5563',
  },
});
