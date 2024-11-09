import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { replaceLocalhostWithIP } from '../../../Services/utils/replaceLocalhostWithIP'
import globalStyles from '../../../Resources/styles/globalStyles'
import colors from '../../../Resources/styles/colors'

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10; // Khoảng cách giữa các item
const ITEM_WIDTH = (width / 2) - ITEM_MARGIN - 20; // Chiều rộng của mỗi item
// const [selectedItem1, setSelectedItem1] = useState(null);

// const handleItemPresss = (item) => {
//     if (selectedItem1 === item) {
//       setSelectedItem1(null);
//     } else {
//       setSelectedItem1(item);
//     }
//   };

const Itemservices = ({ item, onSelect }) => {
    console.log("item", item)
    const url = replaceLocalhostWithIP(item.images);

    return (
        <View style={[styles.item1, { width: ITEM_WIDTH }]}>
            <Image source={{ uri: url }} style={styles.itemImage} />
            <View style={styles.viewTitle}>
                <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemText2}>⏱ {item.duration}</Text>
            </View>
            <View>
                <Text style={styles.itemText3} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.itemText4}>{item.ttthem}</Text>
                <Text style={styles.itemText5}>{item.danhgia}</Text>
                <Text style={styles.itemText6}>{item.price}k</Text>
            </View>
            <TouchableOpacity onPress={() => onSelect(item)}>
                <Text style={styles.itemText7}>Thêm dịch vụ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Itemservices

const styles = StyleSheet.create({
    item1: {
        flex: 1,
        height: 350,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 7,
        marginVertical: 10,
        elevation: 5, // Đối với Android
        shadowColor: '#000', // Màu bóng
        shadowOffset: { width: 0, height: 2 }, // Độ dời bóng
        shadowOpacity: 0.3, // Độ mờ bóng
        shadowRadius: 4, // Bán kính bóng
        flexDirection: 'column', // Căn chỉnh các thành phần theo chiều dọc
        justifyContent: 'space-between', // Giúp phân bố không gian đều
    },
    selectedItem1: {
        borderWidth: 2,
        borderColor: 'blue',
    },
    itemImage: {
        width: '100%', // Chỉnh kích thước ảnh
        height: 117,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Tách name và time ra 2 phía
        alignItems: 'center',
        paddingHorizontal: 5, // Tạo khoảng cách cho hai bên
        alignItems: 'flex-start', // Căn trên
    },
    itemText: {
        // paddingTop: 5,
        fontWeight: '500',
        color: '#000099',
        maxWidth: '70%',  // Giới hạn chiều rộng tối đa là 70% của phần tử cha
        minHeight: 35,
    },
    itemText2: {
        paddingRight: 5,
        color: '#000099',
    },
    itemText3: {
        color: 'gray',
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 5,
        lineHeight: 18,
        minHeight: 36,
    },
    itemText4: {
        marginLeft: 5,
        marginTop: 20,
        marginRight: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
        backgroundColor: 'orange',
        alignSelf: 'flex-start', // Đảm bảo phần tử co dãn theo nội dung
        fontSize: 12,
    },
    itemText5: {
        alignSelf: 'center',
        fontSize: 12,
        paddingTop: 15,
        color: '#000099',
        fontWeight: '500',
    },
    itemText6: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    itemText7: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '400',
        borderRadius: 3,
        backgroundColor: '#000099',
        color: 'white',
        padding: 5,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 15,
    },
})