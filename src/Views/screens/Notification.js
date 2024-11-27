import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getNotification } from '../../Services/api/httpNotification';

const Notification = ({ navigation }) => {
    const [listNotification, setlistNotification] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Trạng thái khi làm mới

    // Hàm lấy dữ liệu
    async function getData() {
        const data = await getNotification();
        setlistNotification(data);
    }

    // Hàm xử lý làm mới
    const onRefresh = async () => {
        setRefreshing(true); // Bắt đầu trạng thái làm mới
        await getData(); // Gọi API lấy dữ liệu mới
        setRefreshing(false); // Kết thúc trạng thái làm mới
    };

    useEffect(() => {
        getData();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={listNotification}
                keyExtractor={(item, index) => index.toString()} // Đặt key cho mỗi item
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationText}>{item.content}</Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 60, fontSize: 18 }}>Bạn không có thông báo</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } // Thêm tính năng kéo để làm mới
            />
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    notificationItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 16,
    },
});
