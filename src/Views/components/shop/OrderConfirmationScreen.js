import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import LocationPicker from "./LocationPicker";
import CustomRadioButton from "./CustomRadioButton";
import MessageInput from "./MessageInput";
import { useRoute } from "@react-navigation/native";
import color from '../../../Resources/styles/colors'
import { getUserDetailById } from "../../../Services/utils/httpUser";

const OrderConfirmationScreen = () => {

    const [locationDetails, setLocationDetails] = useState({
        province: null,
        district: null,
        commune: null,
        street: "",
    });
    const [method, setMethod] = useState(null)
    const [userDetails, setUserDetails] = useState(null);
    const route = useRoute();
    const { selectedItems } = route.params || {};
    const methods = [
        {
            id: "1",
            title: "Thanh toán khi nhận hàng",
            subTitle: ''
        },
        {
            id: "2",
            title: "Thanh toán qua cổng ZaloPay",
            subTitle: ""
        }
    ];

    const handlePayment = () => {
        if (!locationDetails.province || !locationDetails.district || !locationDetails.commune || !locationDetails.street) {
          alert("Vui lòng nhập đầy đủ thông tin địa chỉ.");
          return;
        }
      
        const orderData = {
          location: locationDetails,
          products: products,
          totalAmount: totalPrice + shippingFee - discount,
          paymentMethod: method, 
        };
      
        console.log("Order Data:", orderData);
      
      
      };
      

    const products = selectedItems?.map(item => ({
        id: item._id,
        name: item.title,
        price: item.price_selling,
        quantity: item.quantity,
        image: item.image,
    })) || [];

    const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const shippingFee = 50000;
    const discount = 100000;

    useEffect(() => {
        getUserDetailById().then((data) => {
            setUserDetails(data.data);
            console.log("Fetched user details:", data.data);
        });
    }, []);

    const data = [
        {
            title: 'Thông Tin Nhận Hàng',
            component: <LocationPicker userLocation={userDetails}   onLocationChange={(location) => setLocationDetails(location)}/>
        },
        {
            title: 'Sản Phẩm',
            component: <View style={styles.productContainer}>
                {products.map((product) => (
                    <View key={product.id} style={styles.productRow}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>₫ {product.price.toLocaleString()}</Text>
                            <Text style={styles.productQuantity}>x{product.quantity}</Text>
                        </View>
                    </View>
                ))}
            </View>
        },
        {
            title: 'Phương Thức Thanh Toán',
            component: <CustomRadioButton data={methods} onMethodChange={setMethod} />
        },
        {
            title: 'Thông Tin Đơn Hàng',
            component: <View style={styles.orderInfoContainer}>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.label}>Tổng Tiền Hàng</Text>
                    <Text style={styles.value}>₫ {totalPrice.toLocaleString()}</Text>
                </View>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.label}>Phí Giao Hàng</Text>
                    <Text style={styles.value}>₫ {shippingFee.toLocaleString()}</Text>
                </View>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.label}>Khuyến Mãi</Text>
                    <Text style={styles.value}>₫ {discount.toLocaleString()}</Text>
                </View>
            </View>
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {data.map((item, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{item.title}</Text>
                        {item.component}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Tổng Cộng: </Text>
                    <Text style={styles.totalAmount}>₫ {(totalPrice + shippingFee - discount).toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: color.primary }]} onPress={() => handlePayment()}>
                    <Text style={styles.buttonText} >Thanh Toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: 100,
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    productContainer: {
        paddingVertical: 10,
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
        marginBottom: 10,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    productPrice: {
        fontSize: 14,
        color: "#888",
    },
    productQuantity: {
        fontSize: 14,
        color: "#007BFF",
        fontWeight: "bold",
    },
    orderInfoContainer: {
        paddingVertical: 10,
    },
    orderInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: "#333",
    },
    value: {
        fontSize: 14,
        color: "#888",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007BFF",
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
    totalContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    totalText: {
        fontSize: 16,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    checkoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
