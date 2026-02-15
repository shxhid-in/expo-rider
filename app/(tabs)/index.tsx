import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Chip } from 'react-native-paper';
import { Wallet, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#008080';

export default function HomeScreen() {
    const router = useRouter();

    const weeklySummary = {
        weekRange: 'Feb 9 – Feb 15',
        totalOrders: 48,
        grossEarnings: 6240.00,
        codCollected: 12500.00,
        achievementBonus: 500.00,
        finalPayout: 6740.00,
    };

    const activeOrders = [
        {
            id: 'ORD001',
            customerName: 'Rahul Sharma',
            address: '123, MG Road, Bangalore',
            status: 'Out-for-pickup',
            distanceEarning: 65,
        },
        {
            id: 'ORD002',
            customerName: 'Priya Verma',
            address: '45, Indiranagar, Bangalore',
            status: 'Picked Up',
            distanceEarning: 48,
        }
    ];

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    {/* Weekly Summary Container (Standard View for better corner control) */}
                    <View style={styles.weeklyCard}>
                        <View style={styles.cardContent}>
                            <View style={styles.weeklyHeader}>
                                <View>
                                    <Title style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Weekly Summary</Title>
                                    <Text variant="bodySmall" style={{ color: '#666' }}>{weeklySummary.weekRange}</Text>
                                </View>
                                <Chip mode="flat" style={styles.payoutChip} textStyle={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                                    Payout: Sunday
                                </Chip>
                            </View>

                            <View style={styles.grid}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridValue}>{weeklySummary.totalOrders}</Text>
                                    <Text style={styles.gridLabel}>Orders</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridValue}>₹{weeklySummary.grossEarnings}</Text>
                                    <Text style={styles.gridLabel}>Gross</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridValue}>₹{weeklySummary.codCollected}</Text>
                                    <Text style={styles.gridLabel}>COD</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridValue}>₹{weeklySummary.achievementBonus}</Text>
                                    <Text style={styles.gridLabel}>Bonus</Text>
                                </View>
                            </View>

                            <View style={styles.payoutStrip}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <Wallet size={20} color={PRIMARY_COLOR} />
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Final Payout</Text>
                                </View>
                                <Text variant="titleLarge" style={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
                                    ₹{weeklySummary.finalPayout}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Active Orders Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Active Orders
                        </Text>
                    </View>

                    {activeOrders.map((order) => (
                        <TouchableOpacity
                            key={order.id}
                            activeOpacity={0.7}
                            onPress={() => router.push('/orders')}
                            style={styles.orderCard}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.orderHeader}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View>
                                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Order #{order.id}</Text>
                                            <Text variant="bodySmall" style={{ color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: 2 }}>
                                                {order.status}
                                            </Text>
                                        </View>
                                        <Text variant="titleLarge" style={{ color: '#333', fontWeight: 'bold' }}>₹{order.distanceEarning}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 8, // Reduced top margin
        paddingBottom: 160,
    },
    weeklyCard: {
        backgroundColor: '#fff',
        borderRadius: 15, // Slighly more rounded
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    cardContent: {
        padding: 20, // Proper internal spacing
    },
    weeklyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Better alignment with Title
        marginBottom: 20,
        paddingTop: 4,
    },
    payoutChip: {
        backgroundColor: PRIMARY_COLOR,
        height: 28, // Slighly taller for better text vertical centering
        borderRadius: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    gridItem: {
        width: '48%',
        backgroundColor: '#f1f8f8',
        padding: 15,
        borderRadius: 16, // Rounded
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0f2f2',
    },
    gridValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    gridLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    payoutStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 16, // Decreased from TitleLarge default
        fontWeight: 'bold',
        color: '#333',
    },
    orderCard: {
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 2,
        borderRadius: 16, // Rounded
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
