import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import LocationPicker from "./LocationPicker";
import CustomRadioButton from "./CustomRadioButton";
import { useRoute } from "@react-navigation/native";
import color from '../../../Resources/styles/colors'
import { getUserInfoById } from "../../../Services/utils/httpSingup";
import { getUserlocal } from "../../../Services/utils/user__AsyncStorage";
import { OderProduct } from "../../../ViewModels/OderProduct";
import { Modal } from "react-native-paper";
import colors from "../../../Resources/styles/colors";
import { deleteZaloPayload } from "../../../Services/utils/ZaloPay_AsyncStorage";

const OrderConfirmationScreen = ({ navigation }) => {
    
    const { handle_Order, isModalSuccc, modalIsloading, modalCheck, dataChechZaloPay } = OderProduct()
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
    const [UserProfile, setUserProfile] = useState(null)

    useEffect(() => {
        async function getUser() {
            const user = await getUserlocal()
            setUserProfile(user)
        }
        getUser()
    }, [])

    const handlePayment = () => {
        if (!locationDetails.province || !locationDetails.district || !locationDetails.commune || !locationDetails.street) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ.");
            return;
        }
        if (!method) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

        let total_price_import = 0
        let total_price_sold = 0

        products.forEach((item) => {
            total_price_import += item.import_price * item.quantity
            total_price_sold += item.price_selling * item.quantity
        })

        const orderData = {
            order: {
                user_id: UserProfile._id,
                location: locationDetails.province.name + ", " + locationDetails.district.name + ", " + locationDetails.commune.name + ", " + locationDetails.street,
                listProduct: products,
                paymentMethod: method == 1 ? "cash" : "ZaloPay",
                order_date: currentDate.toISOString().split("T")[0],
                total_price_import: total_price_import + shippingFee,
                total_price_sold: total_price_sold,
            },
            payment: {
                user_id: UserProfile._id,
                pay_type: "oder",
                pay_method: method == 1 ? "cash" : "ZaloPay",
                time: currentTime,
                date: currentDate.toISOString().split("T")[0],
                price: parseInt(totalPrice + shippingFee, 10),
                pay_method_status: method == 2 ? 'Success' : 'Unpaid'
            }

        };
        handle_Order(orderData)
        console.log("Order Data:", orderData);


    };

    const products = selectedItems?.map(item => ({
        id: item._id,
        name: item.title,
        price: item.price_selling,
        quantity: item.quantity,
        image: item.image,
        import_price: item.import_price,
        price_selling: item.price_selling,
        cartItem_id : item. cartItem_id
    })) || [];
    
    const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const shippingFee = 21000;
    const discount = 100000;

    useEffect(() => {
        async function get_product_detail() {
            const data = await getUserInfoById()
            setUserDetails(data.data);
        }
        get_product_detail()
    }, [navigation]);

    const data = [
        {
            title: 'Thông Tin Nhận Hàng',
            component: <LocationPicker userLocation={userDetails} onLocationChange={(location) => setLocationDetails(location)} />
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
                {/* <View style={styles.orderInfoRow}>
                    <Text style={styles.label}>Khuyến Mãi</Text>
                    <Text style={styles.value}>₫ {discount.toLocaleString()}</Text>
                </View> */}
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
                    <Text style={styles.totalAmount}>₫ {(totalPrice + shippingFee).toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: color.primary }]} onPress={() => handlePayment()}>
                    <Text style={styles.buttonText} >Thanh Toán</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={modalCheck} animationType='fade' transparent={true}>
                <View style={{ backgroundColor: colors.background, paddingVertical: 100 }}>
                    <Text style={{ textAlign: 'center', marginTop: 32, fontSize: 20, fontWeight: 'bold', color: 'green' }}>Bạn đang có giao dịch </Text>
                    <View style={{ marginHorizontal: 24, borderRadius: 24, marginTop: 24, alignItems: 'center' }}>
                        <Image source={require('../../../Resources/assets/logo/Bee_Barber.png')} style={{ width: 120, height: 22, margin: 12 }} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                        <Image style={{ width: 80, height: 80 }} source={dataChechZaloPay?.return_code === 1 ? require('../../../Resources/assets/icons/Success.png') : require('../../../Resources/assets/icons/filled.png')} />
                    </View>

                    <Text style={{ textAlign: 'center', marginTop: 12, fontSize: 16, color: dataChechZaloPay?.return_code === 1 ? 'green' : 'red' }}>{dataChechZaloPay?.return_message}</Text>

                    {dataChechZaloPay?.return_code === 1 ? <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('title4') }}>
                            <View style={{ width: 100, height: 45, borderWidth: 1, borderColor: colors.primary100, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40, backgroundColor: colors.primary }}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View> :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => { deleteZaloPayload(); navigation.navigate('title1') }}>
                                <View style={{ width: 100, height: 45, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40, }}>
                                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Hủy</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handlePayment() }}>
                                <View style={{ paddingHorizontal: 12, height: 45, borderWidth: 1, borderColor: colors.primary100, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40, backgroundColor: colors.primary }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Thanh toán lại</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                </View>
            </Modal>
            <Modal visible={isModalSuccc} animationType='fade' transparent={true}>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 100 }}>
                    <Text style={{ fontSize: 20, marginBottom: 60, color: 'green' }}>Đặt đơn thành công</Text>
                    <Image source={require('../../../Resources/assets/icons/Success.png')} style={{ width: 80, height: 80 }} />
                    <TouchableOpacity onPress={() => { navigation.navigate('title4') }}>
                        <View style={{ width: 100, height: 45, borderWidth: 1, borderColor: colors.primary100, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                            <Text style={{ fontWeight: 'bold', color: colors.primary }}>OK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal visible={modalIsloading} animationType='fade' transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 120, height: 120, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                        <ActivityIndicator size={50} color={colors.primary} />
                    </View>
                </View>
            </Modal>
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
