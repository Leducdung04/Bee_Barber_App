import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { get_list_cart_item, add_cart_item, delete_cart_item } from '../../Services/utils/httpCartItem';
import { get_user_cart } from '../../Services/utils/httpCart';
import { get_product_detail } from '../../Services/utils/httpProduct';
import { replaceLocalhostWithIP } from '../../Services/utils/replaceLocalhostWithIP';
import eventEmitter from '../../Services/utils/event';
import { useNavigation } from '@react-navigation/native';
import { getUserlocal } from '../../Services/utils/user__AsyncStorage';
import colors from '../../Resources/styles/colors';


const Product = ({ item, onAdd, onRemove, onDelete, onSelect }) => (
  <View style={styles.cartItem}>
    <CheckBox value={item.selected} onValueChange={() => onSelect(item._id)} />
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price_selling.toLocaleString('vi-VN')} đ</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => onRemove(item._id)} style={styles.quantityButton}>
          <Text style={styles.quantityText}> - </Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onAdd(item._id)} style={styles.quantityButton}>
          <Text style={styles.quantityText}> + </Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={() => onDelete(item._id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>🗑️</Text>
    </TouchableOpacity>
  </View>
);


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [userProfile, setUserProfile] = useState(null)
  const [cartId, setCartId] = useState(null)
  const [ModalDN, setModalDN] = useState(false); // Modal for sign-in check


  const nav = useNavigation()
  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const user = await getUserlocal();
        if (!user) {
          setModalDN(true); 
          return;
        }

        setUserProfile(user);
        const userCart = await get_user_cart(user._id);
        if (!userCart || !userCart._id) {
          console.error("No cart found or cart ID is undefined.");
          return;
        }
        setCartId(userCart._id);

      } catch (error) {
        console.error("Error fetching user or cart:", error.message);
      }
    };

    fetchUserAndCart();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!cartId) return;

      try {
        const items = await get_list_cart_item(cartId);
        const productIds = items.map(item => item.product_id);
        const productDetails = await Promise.all(
          productIds.map(id => get_product_detail(id))
        );

        const updatedItems = items.map(item => {
          const productResponse = productDetails.find(product => product.data._id === item.product_id);
          if (!productResponse || !productResponse.data) {
            return { ...item };
          }
          const product = productResponse.data;
          return {
            ...item,
            image: replaceLocalhostWithIP(product.image),
            title: product.name,
            price_selling: product.price_selling,
            import_price: product.import_price
          };
        });
        setCartItems(updatedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, [cartId]);


  const handleAdd = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) {
      console.error(`Item with id ${id} not found in cart.`);
      return;
    }
    try {
      await add_cart_item(cartId, {
        product_id: item.product_id,
        quantity: item.quantity + 1,
        total: item.price_selling * (item.quantity + 1),
      });

      setCartItems(
        cartItems.map((i) =>
          i._id === id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
      eventEmitter.emit('cartUpdated');
    } catch (error) {
      console.error(`Error adding item with id ${id}:`, error.message);
    }
  };



  const handleRemove = async (id) => {
    const item = cartItems.find((i) => i._id === id);

    if (!item) {
      console.error(`Item with id ${id} not found in cart.`);
      return;
    }

    if (item.quantity > 1) {
      try {

        setCartItems(cartItems.map((i) =>
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        ));
      } catch (error) {
        console.error(`Error removing item with id ${id}:`, error.message);
      }
    } else {
      try {
        await delete_cart_item(id);
        setCartItems(cartItems.filter((i) => i._id !== id));
        eventEmitter.emit('cartUpdated');
      } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error.message);
      }
    }
  };


  const handleDelete = async (id) => {
    try {
      await delete_cart_item(id);
      setCartItems(cartItems.filter((i) => i._id !== id));
      eventEmitter.emit('cartUpdated');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSelect = (id) => {
    setCartItems(cartItems.map((i) => (i._id === id ? { ...i, selected: !i.selected } : i)));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(cartItems.map((i) => ({ ...i, selected: newSelectAll })));
  };

  const handlePlaceOrder = () => {
    const selectedItems = cartItems.filter((i) => i.selected);
    if (selectedItems.length > 0) {
      nav.navigate("OrderConfirmationScreen", { selectedItems })
    } else {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một sản phẩm để đặt hàng.');
    }
  };

  const selectedItemCount = cartItems.filter((i) => i.selected).length;
  const subtotal = cartItems.reduce((sum, i) => sum + (i.selected ? i.price_selling * i.quantity : 0), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Product item={item} onAdd={handleAdd} onRemove={handleRemove} onDelete={handleDelete} onSelect={handleSelect} />
        )}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.checkboxContainer}>
            <CheckBox value={selectAll} onValueChange={handleSelectAll} />
            <Text style={styles.selectAllText}>Tất Cả</Text>
          </View>
          <View style={styles.subtotalContainer}>
            <View style={styles.subtotalContainer1}>
              <Text style={styles.subtotalLabel}>Tạm tính: </Text>
              <Text style={styles.subtotalValue}>{subtotal.toLocaleString('vi-VN')} đ</Text>
            </View>
            <Text style={styles.subtotal1}>({selectedItemCount} sản phẩm)</Text>
          </View>
          <TouchableOpacity style={[
            styles.placeOrderButton,
            selectedItemCount > 0 ? styles.activeButton : styles.inactiveButton,
          ]} onPress={handlePlaceOrder}>
            <Text style={styles.buttonText}>ĐẶT HÀNG</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Kiểm tra đăng nhập */}
      <Modal visible={ModalDN} animationType='slide' transparent={true} >
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ height: 180, backgroundColor: 'white', margin: 32, borderRadius: 4, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Đăng nhập</Text>
            <Text style={{ fontSize: 17 }}>Đăng nhập ngay để sủ dụng tính năng này ?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { setModalDN(false) }}>
                <View style={{ height: 45, width: 120, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, marginHorizontal: 12, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Để sau</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { nav.navigate('LoginScreen') }}>
                <View style={{ height: 45, width: 120, marginHorizontal: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Đồng ý</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  price: {
    fontSize: 14,
    color: '#DD0000',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 15,
  },
  quantityText: {
    fontSize: 20,
    color: '#000000',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 15,
  },
  deleteButtonText: {
    fontSize: 24,
    color: 'red',
  },
  footer: {
    marginTop: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000000',
  },
  subtotalContainer: {
    flex: 1,
    alignItems: 'flex-end',
    margin:
      10,
  },
  subtotalContainer1: {
    flexDirection: 'row', // Hiển thị theo hàng ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#000', // Màu của phần "Tạm tính"
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: 16,
    color: '#FF0000', // Màu của phần giá trị (subtotal)
    fontWeight: 'bold', // Bạn có thể tăng độ đậm của chữ nếu muốn
  },
  subtotal1: {
    fontSize: 16,
    textAlign: 'right',
    color: '#000000',
  },
  placeOrderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF0000', // Màu đỏ cho nút hoạt động
  },
  inactiveButton: {
    backgroundColor: '#ccc', // Màu xám cho nút không hoạt động
  },
  buttonText: {
    color: '#FFFFFF', // Màu chữ trên nút
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
