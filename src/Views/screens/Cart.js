import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Button, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CartItem = ({ item, onAdd, onRemove, onDelete, onSelect }) => {

  
  return (
    <View style={styles.cartItem}>
      <CheckBox value={item.selected} onValueChange={() => onSelect(item.id)} />
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}> - </Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onAdd(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
   
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const handleAdd = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleSelect = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const handlePlaceOrder = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length > 0) {
      Alert.alert('Đặt hàng thành công!', 'Bạn đã đặt hàng thành công.');
    } else {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một sản phẩm để đặt hàng.');
    }
  };

  const selectedItemCount = cartItems.filter(item => item.selected).length;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.selected ? item.price * item.quantity : 0), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem item={item} onAdd={handleAdd} onRemove={handleRemove} onDelete={handleDelete} onSelect={handleSelect} />
        )}
        keyExtractor={item => item.id}
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
          <TouchableOpacity
            style={[
              styles.placeOrderButton,
              selectedItemCount > 0 ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={handlePlaceOrder}
            disabled={selectedItemCount === 0} // Vô hiệu hóa nút nếu không có sản phẩm nào được chọn
          >
            <Text style={styles.buttonText}>ĐẶT HÀNG</Text>
          </TouchableOpacity>
        </View>
      </View>
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
