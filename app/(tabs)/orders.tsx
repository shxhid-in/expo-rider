import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Title, Divider, Chip } from 'react-native-paper';
import { MapPin, Phone, Package, Navigation, Clock, CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#008080';

export default function OrdersScreen() {
    const [activeTab, setActiveTab] = useState('active');

    const activeOrders = [
        {
            id: '1',
            orderNumber: '8842',
            customerName: 'Rahul Sharma',
            customerPhone: '+91 9876543210',
            address: '123, MG Road, Bangalore',
            status: 'Out-for-pickup',
            paymentMode: 'COD',
            totalAmount: 1250,
            items: [
                { name: 'Chicken Curry Cut', qty: 2 },
                { name: 'Mutton Chops', qty: 1 }
            ],
            time: '10 mins ago'
        },
        {
            id: '2',
            orderNumber: '8845',
            customerName: 'Priya Verma',
            customerPhone: '+91 9123456789',
            address: '45, Indiranagar, Bangalore',
            status: 'Picked Up',
            paymentMode: 'Paid',
            totalAmount: 850,
            items: [
                { name: 'Fish Fry Cut', qty: 1 }
            ],
            time: '25 mins ago'
        }
    ];

    const completedOrders = [
        {
            id: '3',
            orderNumber: '8830',
            customerName: 'Amit Singh',
            address: 'Near Metro Station, Bangalore',
            deliveredAt: '10:30 AM',
            totalAmount: 450,
        }
    ];

    return (
        <View style={styles.mainContainer}>
            {/* Top Floating Pill Tabs - White Theme */}
            <View style={styles.topTabContainer}>
                <View style={styles.whitePill}>
                    <TouchableOpacity
                        style={[styles.pillItem, activeTab === 'active' && styles.activePill]}
                        onPress={() => setActiveTab('active')}
                    >
                        <Clock size={16} color={activeTab === 'active' ? '#fff' : '#666'} />
                        <Text style={[styles.pillText, activeTab === 'active' && styles.activePillText]}>Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pillItem, activeTab === 'completed' && styles.activePill]}
                        onPress={() => setActiveTab('completed')}
                    >
                        <CheckCircle2 size={16} color={activeTab === 'completed' ? '#fff' : '#666'} />
                        <Text style={[styles.pillText, activeTab === 'completed' && styles.activePillText]}>Completed</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'active' ? (
                    activeOrders.map((order) => (
                        <TouchableOpacity key={order.id} activeOpacity={0.9}>
                            <View style={styles.compactCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.headerLeft}>
                                        <View style={styles.orderIdBadge}>
                                            <Text style={styles.orderIdText}>#{order.orderNumber}</Text>
                                        </View>
                                        <Text style={styles.timeAgo}>{order.time}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: order.status === 'Picked Up' ? '#e8f5e9' : '#e3f2fd' }]}>
                                        <Text style={[styles.statusBadgeText, { color: order.status === 'Picked Up' ? '#2e7d32' : '#1565c0' }]}>
                                            {order.status.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardBody}>
                                    <View style={styles.mainInfo}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.customerName}>{order.customerName}</Text>
                                            <View style={styles.addressRow}>
                                                <MapPin size={12} color="#999" />
                                                <Text numberOfLines={1} style={styles.addressText}>{order.address}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.priceTag}>
                                            <Text style={styles.priceText}>₹{order.totalAmount}</Text>
                                            <Text style={styles.paymentMethod}>{order.paymentMode}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.itemsListContainer}>
                                        {order.items.map((item, idx) => (
                                            <View key={idx} style={styles.itemLine}>
                                                <Package size={12} color="#999" />
                                                <Text style={styles.itemLineText}>{item.name} ({item.qty})</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <Divider style={styles.cardDivider} />

                                    <View style={styles.cardFooter}>
                                        <TouchableOpacity style={styles.actionBtnSecondary}>
                                            <Phone size={16} color={PRIMARY_COLOR} />
                                            <Text style={styles.btnTextSecondary}>Call</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.actionBtnPrimary}>
                                            <Navigation size={16} color="#fff" />
                                            <Text style={styles.btnTextPrimary}>Navigate</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.statusUpdateButton}>
                                        <Text style={styles.statusUpdateText}>
                                            {order.status === 'Out-for-pickup' ? 'Mark as Picked Up' : 'Mark as Delivered'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    completedOrders.map((order) => (
                        <View key={order.id} style={styles.completedCompactCard}>
                            <View style={styles.completedInfo}>
                                <View style={styles.checkCircle}>
                                    <CheckCircle2 size={16} color="#fff" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.completedOrderTitle}>Order #{order.orderNumber}</Text>
                                    <Text style={styles.completedSubtext}>Delivered to {order.customerName}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.completedTime}>{order.deliveredAt}</Text>
                                    <Text style={styles.completedAmount}>₹{order.totalAmount}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    topTabContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    whitePill: {
        flexDirection: 'row',
        backgroundColor: '#f1f3f5',
        padding: 4,
        borderRadius: 30,
        width: '100%',
        maxWidth: 320,
        justifyContent: 'space-between',
    },
    pillItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 10,
        borderRadius: 25,
    },
    activePill: {
        backgroundColor: PRIMARY_COLOR,
    },
    pillText: {
        color: '#666',
        fontSize: 13,
        fontWeight: 'bold',
    },
    activePillText: {
        color: '#fff',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 160,
    },
    compactCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        overflow: 'visible', // Allow status badge to display correctly if needed
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f9fa',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    orderIdBadge: {
        backgroundColor: '#f0f7f7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    orderIdText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    timeAgo: {
        fontSize: 11,
        color: '#999',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: '900',
    },
    cardBody: {
        padding: 16,
    },
    mainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    addressText: {
        fontSize: 12,
        color: '#777',
    },
    priceTag: {
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    paymentMethod: {
        fontSize: 10,
        color: '#999',
        fontWeight: 'bold',
        marginTop: 2,
    },
    itemsListContainer: {
        backgroundColor: '#fdfdfd',
        borderRadius: 8,
        padding: 10,
        gap: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    itemLine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemLineText: {
        fontSize: 12,
        color: '#555',
        fontWeight: '500',
    },
    cardDivider: {
        marginVertical: 16,
        backgroundColor: '#f0f0f0',
    },
    cardFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtnPrimary: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 12,
        borderRadius: 12,
    },
    btnTextPrimary: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    actionBtnSecondary: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: PRIMARY_COLOR,
    },
    btnTextSecondary: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
    },
    statusUpdateButton: {
        backgroundColor: '#fff',
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    statusUpdateText: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
    },
    completedCompactCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4caf50',
        elevation: 2,
    },
    completedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedOrderTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    completedSubtext: {
        fontSize: 12,
        color: '#777',
    },
    completedTime: {
        fontSize: 11,
        color: '#4caf50',
        fontWeight: 'bold',
    },
    completedAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    }
});
