import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip, Divider, ProgressBar, MD3Colors } from 'react-native-paper';
import { MapPin, Phone, ClipboardList } from 'lucide-react-native';

const PRIMARY_COLOR = '#FF6B00';

export default function HomeScreen() {
    // Mock data as requested
    const earnings = {
        ordersCompleted: 12,
        totalEarnings: 1560.50,
        codCollected: 4500.00,
        totalDistance: 45,
    };

    const weeklyData = {
        totalOrders: 48,
        totalEarnings: 6240.00,
        totalCodCollected: 12500.00,
        finalPayout: 6240.00,
        achievementBonus: 0,
    };

    const activeOrders = [
        {
            id: 'ORD001',
            customerName: 'Rahul Sharma',
            address: '123, MG Road, Bangalore',
            customerPhone: '+91 9876543210',
            status: 'Out-for-pickup',
            totalKilometre: 5.2,
            distanceEarning: 65,
        },
        {
            id: 'ORD002',
            customerName: 'Priya Verma',
            address: '45, Indiranagar, Bangalore',
            customerPhone: '+91 9123456789',
            status: 'Picked Up',
            totalKilometre: 3.8,
            distanceEarning: 48,
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text variant="headlineMedium" style={styles.header}>
                    Delivery Dashboard
                </Text>

                {/* Today's Summary */}
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Title style={styles.cardTitle}>Today's Summary</Title>
                        <View style={styles.grid}>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>{earnings.ordersCompleted}</Text>
                                <Text style={styles.labelText}>Orders</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>₹{earnings.totalEarnings.toFixed(2)}</Text>
                                <Text style={styles.labelText}>Earnings</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>₹{earnings.codCollected.toFixed(2)}</Text>
                                <Text style={styles.labelText}>COD</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>{earnings.totalDistance} km</Text>
                                <Text style={styles.labelText}>Distance</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                {/* Weekly Summary */}
                <Card style={styles.weeklyCard}>
                    <Card.Content>
                        <View style={styles.weeklyHeader}>
                            <Title style={styles.cardTitle}>Weekly Summary</Title>
                            <Text variant="bodySmall" style={styles.payoutText}>Payout: Sunday</Text>
                        </View>
                        <View style={styles.grid}>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>{weeklyData.totalOrders}</Text>
                                <Text style={styles.labelText}>Total Orders</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Text style={styles.valueText}>₹{weeklyData.totalEarnings.toFixed(2)}</Text>
                                <Text style={styles.labelText}>Weekly Earnings</Text>
                            </View>
                        </View>

                        <View style={styles.progressSection}>
                            <View style={styles.progressHeader}>
                                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Progress</Text>
                                <Text variant="bodySmall">{weeklyData.totalOrders}/75 orders</Text>
                            </View>
                            <ProgressBar progress={weeklyData.totalOrders / 75} color={PRIMARY_COLOR} style={styles.progressBar} />
                        </View>
                    </Card.Content>
                </Card>

                {/* Active Orders */}
                <Text variant="titleLarge" style={styles.sectionTitle}>
                    Active Orders ({activeOrders.length})
                </Text>

                {activeOrders.map((order) => (
                    <Card key={order.id} style={styles.orderCard}>
                        <Card.Content>
                            <View style={styles.orderHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{order.customerName}</Text>
                                    <View style={styles.infoRow}>
                                        <MapPin size={14} color="#666" />
                                        <Text variant="bodySmall" style={styles.infoText}>{order.address}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Phone size={14} color="#666" />
                                        <Text variant="bodySmall" style={styles.infoText}>{order.customerPhone}</Text>
                                    </View>
                                </View>
                                <Chip mode="flat" style={styles.statusChip} textStyle={{ color: '#fff' }}>
                                    {order.status}
                                </Chip>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.orderFooter}>
                                <View>
                                    <Text variant="bodySmall">Distance: {order.totalKilometre} km</Text>
                                    <Text variant="bodySmall">Earnings: ₹{order.distanceEarning}</Text>
                                </View>
                                <Button
                                    mode="contained"
                                    buttonColor={PRIMARY_COLOR}
                                    onPress={() => { }}
                                    style={styles.detailsButton}
                                >
                                    Details
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    summaryCard: {
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: PRIMARY_COLOR,
        backgroundColor: '#fff',
        elevation: 4,
    },
    weeklyCard: {
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 15,
        alignItems: 'center',
    },
    valueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    labelText: {
        fontSize: 12,
        color: '#666',
    },
    weeklyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    payoutText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
    progressSection: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    sectionTitle: {
        marginVertical: 15,
        fontWeight: 'bold',
    },
    orderCard: {
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 5,
    },
    infoText: {
        color: '#666',
        flexShrink: 1,
    },
    statusChip: {
        backgroundColor: PRIMARY_COLOR,
        height: 32,
    },
    divider: {
        marginVertical: 12,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsButton: {
        borderRadius: 8,
    }
});
