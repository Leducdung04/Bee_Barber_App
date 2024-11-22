import React, { useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from 'react-native';

const statuses = ["Tất Cả", "Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã giao", "Đã hủy"];

const OrderScreen = () => {
    const scrollTrackWidth = useRef(0); // Width of the scroll track
    const [scrollBarWidth, setScrollBarWidth] = useState(new Animated.Value(0)); // Animated width for scroll indicator
    const [selectedStatus, setSelectedStatus] = useState("Tất Cả"); // Track the selected status

    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const completeWidth = contentSize.width;
        const visibleWidth = layoutMeasurement.width;
        const scrollRatio = contentOffset.x / (completeWidth - visibleWidth);

        // Animate the scroll indicator width
        Animated.timing(scrollBarWidth, {
            toValue: Math.min(
                scrollRatio * scrollTrackWidth.current,
                scrollTrackWidth.current
            ),
            duration: 50,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.statusContainer}
                >
                    {statuses.map((status, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.statusItem,
                                selectedStatus === status && styles.activeStatusItem,
                            ]}
                            onPress={() => setSelectedStatus(status)}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    selectedStatus === status && styles.activeStatusText,
                                ]}
                            >
                                {status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Đang hiển thị trạng thái: {selectedStatus}
                </Text>
            </View>
        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    scrollContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    scrollTrack: {
        height: 4,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 20,
        borderRadius: 2,
    },
    scrollIndicator: {
        height: '100%',
        backgroundColor: '#15397f',
        borderRadius: 2,
    },
    statusContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    statusItem: {
        marginRight: 15,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeStatusItem: {
        backgroundColor: '#15397f',
    },
    statusText: {
        fontSize: 14,
        color: '#555',
    },
    activeStatusText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 16,
        color: '#333',
    },
});
