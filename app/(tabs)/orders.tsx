import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip, Divider, SegmentedButtons } from 'react-native-paper';
import { MapPin, Phone, Package, Navigation, Clock, CreditCard, ChevronDown } from 'lucide-react-native';

const PRIMARY_COLOR = '#FF6B00';

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
                { name: 'Chicken Curry Cut', quantity: 2, cuttype: 'Medium', butcher: 'Aslam' },
                { name: 'Mutton Chops', quantity: 1, cuttype: 'Regular', butcher: 'Aslam' }
            ]
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
                { name: 'Fish Fry Cut', quantity: 1, cuttype: 'Slices', butcher: 'Rahman' }
            ]
        }
    ];

    const completedOrders = [
        {
            id: '3',
            orderNumber: '8830',
            customerName: 'Amit Singh',
            address: 'Near Metro Station, Bangalore',
            deliveredAt: '10:30 AM',
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Title style={styles.headerTitle}>My Orders</Title>
            </View>

            <View style={styles.tabContainer}>
                <SegmentedButtons
                    value={activeTab}
                    onValueChange={setActiveTab}
                    style={styles.segmentedButtons}
                    buttons={[
                        { value: 'active', label: 'Active', checkedColor: '#fff', uncheckedColor: '#666' },
                        { value: 'completed', label: 'Completed', checkedColor: '#fff', uncheckedColor: '#666' },
                    ]}
                    theme={{ colors: { secondaryContainer: PRIMARY_COLOR } }}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {activeTab === 'active' ? (
                    activeOrders.map((order) => (
                        <Card key={order.id} style={styles.orderCard}>
                            <Card.Content>
                                <View style={styles.orderTopRow}>
                                    <Text variant="titleMedium" style={styles.orderId}>#ORDER-{order.orderNumber}</Text>
                                    <Chip
                                        mode="flat"
                                        style={[styles.statusChip, { backgroundColor: order.status === 'Out-for-pickup' ? '#E65100' : '#1B5E20' }]}
                                        textStyle={{ color: '#fff', fontSize: 10 }}
                                    >
                                        {order.status}
                                    </Chip>
                                </View>

                                <View style={styles.customerBox}>
                                    <Text variant="titleMedium" style={styles.customerName}>{order.customerName}</Text>
                                    <View style={styles.infoRow}>
                                        <Phone size={14} color={PRIMARY_COLOR} />
                                        <Text variant="bodySmall" style={styles.customerPhone}>{order.customerPhone}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <MapPin size={14} color="#666" />
                                        <Text variant="bodySmall" style={styles.addressText}>{order.address}</Text>
                                    </View>

                                    <Divider style={styles.paymentDivider} />

                                    <View style={styles.paymentRow}>
                                        <View style={styles.paymentMethod}>
                                            <CreditCard size={14} color={order.paymentMode === 'COD' ? '#E65100' : '#1B5E20'} />
                                            <Text style={[styles.paymentLabel, { color: order.paymentMode === 'COD' ? '#E65100' : '#1B5E20' }]}>
                                                {order.paymentMode}
                                            </Text>
                                        </View>
                                        {order.paymentMode === 'COD' && (
                                            <Text variant="titleMedium" style={styles.amountText}>₹{order.totalAmount}</Text>
                                        )}
                                    </View>
                                </View>

                                <View style={styles.itemsBox}>
                                    <Text variant="labelSmall" style={styles.itemsHeader}>ORDER ITEMS</Text>
                                    {order.items.map((item, idx) => (
                                        <View key={idx} style={styles.itemRow}>
                                            <Text variant="bodySmall" style={styles.itemName}>
                                                {item.quantity} x {item.name} ({item.cuttype})
                                            </Text>
                                            <Text variant="bodySmall" style={styles.butcherName}>{item.butcher}</Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.actionRow}>
                                    <Button
                                        mode="outlined"
                                        onPress={() => { }}
                                        style={styles.actionButton}
                                        textColor="#0288D1"
                                        icon={() => <Phone size={16} color="#0288D1" />}
                                    >
                                        Call
                                    </Button>
                                    <Button
                                        mode="contained"
                                        onPress={() => { }}
                                        style={[styles.actionButton, { backgroundColor: PRIMARY_COLOR }]}
                                        icon={() => <Navigation size={16} color="#fff" />}
                                    >
                                        Navigate
                                    </Button>
                                </View>

                                <Button
                                    mode="outlined"
                                    onPress={() => { }}
                                    style={styles.statusButton}
                                    textColor={order.status === 'Out-for-pickup' ? '#0288D1' : '#1B5E20'}
                                    outlineColor={order.status === 'Out-for-pickup' ? '#0288D1' : '#1B5E20'}
                                >
                                    {order.status === 'Out-for-pickup' ? 'Mark as Picked Up' : 'Mark as Delivered'}
                                </Button>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    completedOrders.map((order) => (
                        <Card key={order.id} style={styles.completedCard}>
                            <Card.Content>
                                <View style={styles.orderTopRow}>
                                    <Text variant="titleMedium" style={[styles.orderId, { color: '#1B5E20' }]}>#ORDER-{order.orderNumber} • Delivered</Text>
                                </View>
                                <Text variant="bodyMedium" style={styles.customerName}>{order.customerName}</Text>
                                <View style={styles.infoRow}>
                                    <MapPin size={14} color="#666" />
                                    <Text variant="bodySmall" style={styles.addressText}>{order.address}</Text>
                                </View>
                                <View style={[styles.infoRow, { marginTop: 10 }]}>
                                    <Package size={16} color="#1B5E20" />
                                    <Text variant="bodySmall" style={{ color: '#1B5E20', fontWeight: 'bold' }}>Completed at {order.deliveredAt}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    headerTitle: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
    tabContainer: {
        padding: 16,
    },
    segmentedButtons: {
        borderRadius: 8,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    orderCard: {
        marginBottom: 20,
        backgroundColor: '#fff',
        elevation: 4,
        borderLeftWidth: 4,
        borderLeftColor: PRIMARY_COLOR,
    },
    completedCard: {
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#1B5E20',
    },
    orderTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    orderId: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    statusChip: {
        height: 24,
    },
    customerBox: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 15,
    },
    customerName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },
    customerPhone: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        color: '#666',
    },
    addressText: {
        color: '#666',
        flexShrink: 1,
    },
    paymentDivider: {
        marginVertical: 10,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    paymentLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    amountText: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    itemsBox: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 20,
    },
    itemsHeader: {
        color: '#999',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    itemName: {
        flex: 1,
    },
    butcherName: {
        color: '#999',
        fontStyle: 'italic',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    actionButton: {
        flex: 1,
        borderRadius: 8,
    },
    statusButton: {
        borderRadius: 8,
    }
});
