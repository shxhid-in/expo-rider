import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, IconButton, Divider } from 'react-native-paper';
import { ChevronLeft, ChevronRight, TrendingUp, HandCoins, CalendarDays, Package, IndianRupee } from 'lucide-react-native';

const PRIMARY_COLOR = '#008080';

export default function EarningsScreen() {
    // Current date logic (Mocking)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);

    // Mock data for specific days with individual order breakdowns
    const dailyData: any = {
        '2026-02-15': {
            orders: 3,
            earnings: 115,
            distance: 12,
            orderBreakdown: [
                { id: '8842', amount: 45, time: '10:30 AM' },
                { id: '8845', amount: 35, time: '12:15 PM' },
                { id: '8849', amount: 35, time: '02:45 PM' }
            ]
        },
        '2026-02-14': {
            orders: 2,
            earnings: 80,
            distance: 8,
            orderBreakdown: [
                { id: '8830', amount: 40, time: '11:00 AM' },
                { id: '8835', amount: 40, time: '03:30 PM' }
            ]
        },
        'default': { orders: 0, earnings: 0, distance: 0, orderBreakdown: [] }
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const displayDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const currentData = dailyData[formatDate(selectedDate)] || dailyData['default'];

    const changeDate = (days: number) => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(nextDate);
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    {/* Premium Date Selection Box */}
                    <Card style={styles.dateSelectorCard}>
                        <Card.Content style={styles.dateSelectorContent}>
                            <TouchableOpacity onPress={() => changeDate(-1)}>
                                <ChevronLeft size={28} color={PRIMARY_COLOR} />
                            </TouchableOpacity>

                            <View style={styles.dateInfo}>
                                <CalendarDays size={20} color={PRIMARY_COLOR} style={{ marginBottom: 4 }} />
                                <Text variant="titleMedium" style={styles.dateText}>{displayDate(selectedDate)}</Text>
                                {formatDate(selectedDate) === formatDate(today) && (
                                    <View style={styles.todayBadge}>
                                        <Text style={styles.todayBadgeText}>TODAY</Text>
                                    </View>
                                )}
                            </View>

                            <TouchableOpacity onPress={() => changeDate(1)}>
                                <ChevronRight size={28} color={PRIMARY_COLOR} />
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>

                    {/* Summary for Selected Date */}
                    <View style={styles.summaryGrid}>
                        <Card style={styles.statCard}>
                            <Card.Content style={styles.statContent}>
                                <TrendingUp size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.statValue}>{currentData.orders}</Text>
                                <Text style={styles.statLabel}>Orders</Text>
                            </Card.Content>
                        </Card>
                        <Card style={styles.statCard}>
                            <Card.Content style={styles.statContent}>
                                <HandCoins size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.statValue}>₹{currentData.earnings}</Text>
                                <Text style={styles.statLabel}>Earnings</Text>
                            </Card.Content>
                        </Card>
                    </View>

                    {/* Per Order Earnings List */}
                    <View style={styles.sectionHeader}>
                        <Title style={styles.sectionTitle}>Order Breakdown</Title>
                        <Text style={styles.orderCountBadge}>{currentData.orderBreakdown.length} Orders</Text>
                    </View>

                    {currentData.orderBreakdown.length > 0 ? (
                        currentData.orderBreakdown.map((order: any, index: number) => (
                            <Card key={index} style={styles.orderRowCard}>
                                <Card.Content style={styles.orderRowContent}>
                                    <View style={styles.orderInfo}>
                                        <View style={styles.iconCircle}>
                                            <Package size={18} color={PRIMARY_COLOR} />
                                        </View>
                                        <View>
                                            <Text style={styles.orderIdText}>Order #{order.id}</Text>
                                            <Text style={styles.orderTimeText}>{order.time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.amountContainer}>
                                        <IndianRupee size={12} color={PRIMARY_COLOR} />
                                        <Text style={styles.orderAmountText}>{order.amount}</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Package size={48} color="#ddd" />
                            <Text style={styles.emptyStateText}>No orders for this date</Text>
                        </View>
                    )}

                    {currentData.earnings > 0 && (
                        <View style={styles.totalFooter}>
                            <Divider style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Grand Total</Text>
                                <Text style={styles.totalDayAmount}>₹{currentData.earnings}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 18,
        paddingBottom: 160,
    },
    dateSelectorCard: {
        backgroundColor: '#fff',
        elevation: 6,
        borderRadius: 20,
        marginBottom: 24,
    },
    dateSelectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    dateInfo: {
        alignItems: 'center',
    },
    dateText: {
        fontWeight: 'bold',
        color: '#1a1a1a',
        fontSize: 18,
    },
    todayBadge: {
        backgroundColor: 'rgba(0, 128, 128, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    todayBadgeText: {
        color: PRIMARY_COLOR,
        fontSize: 10,
        fontWeight: 'bold',
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 2,
    },
    statContent: {
        alignItems: 'center',
        paddingVertical: 15,
        gap: 6,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    orderCountBadge: {
        fontSize: 12,
        color: '#999',
        fontWeight: 'bold',
    },
    orderRowCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        borderLeftWidth: 3,
        borderLeftColor: PRIMARY_COLOR,
    },
    orderRowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    orderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderIdText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    orderTimeText: {
        fontSize: 11,
        color: '#999',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f0f7f7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    orderAmountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyStateText: {
        color: '#bbb',
        fontSize: 14,
    },
    totalFooter: {
        marginTop: 10,
    },
    divider: {
        marginVertical: 15,
        backgroundColor: '#eee',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    totalDayAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    }
});
