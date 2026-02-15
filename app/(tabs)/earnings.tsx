import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Chip, Divider, IconButton } from 'react-native-paper';
import { ChevronLeft, ChevronRight, Wallet, BadgePercent, TrendingUp, HandCoins } from 'lucide-react-native';

const PRIMARY_COLOR = '#008080';

export default function EarningsScreen() {
    const [currentDayIndex, setCurrentDayIndex] = useState(3); // Mocking Thursday

    const weeklySummary = {
        weekRange: 'Feb 9 – Feb 15',
        totalOrders: 48,
        grossEarnings: 6240.00,
        codCollected: 12500.00,
        achievementBonus: 500.00,
        finalPayout: 6740.00,
    };

    const dailyBreakdown = [
        { day: 'Monday', date: 'Feb 9', orders: 8, earnings: 1040, distance: 32 },
        { day: 'Tuesday', date: 'Feb 10', orders: 10, earnings: 1300, distance: 40 },
        { day: 'Wednesday', date: 'Feb 11', orders: 12, earnings: 1560, distance: 48 },
        { day: 'Thursday', date: 'Feb 12', orders: 9, earnings: 1170, distance: 36 },
        { day: 'Friday', date: 'Feb 13', orders: 0, earnings: 0, distance: 0 },
        { day: 'Saturday', date: 'Feb 14', orders: 0, earnings: 0, distance: 0 },
        { day: 'Sunday', date: 'Feb 15', orders: 0, earnings: 0, distance: 0 },
    ];

    const currentDay = dailyBreakdown[currentDayIndex];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Title style={styles.headerTitle}>Earnings Dashboard</Title>

                {/* Weekly Summary Card */}
                <Card style={styles.weeklyCard}>
                    <Card.Content>
                        <View style={styles.weeklyHeader}>
                            <View>
                                <Title style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Weekly Summary</Title>
                                <Text variant="bodySmall" style={{ color: '#666' }}>{weeklySummary.weekRange}</Text>
                            </View>
                            <Chip mode="flat" style={styles.payoutChip} textStyle={{ color: '#fff', fontSize: 10 }}>
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
                    </Card.Content>
                </Card>

                {/* Daily Breakdown */}
                <View style={styles.sectionHeader}>
                    <Title style={{ fontSize: 18 }}>Daily Breakdown</Title>
                    <View style={styles.dayPicker}>
                        <IconButton
                            icon={() => <ChevronLeft size={20} color={PRIMARY_COLOR} />}
                            onPress={() => setCurrentDayIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentDayIndex === 0}
                        />
                        <Text style={styles.dayText}>{currentDay.day}</Text>
                        <IconButton
                            icon={() => <ChevronRight size={20} color={PRIMARY_COLOR} />}
                            onPress={() => setCurrentDayIndex(prev => Math.min(6, prev + 1))}
                            disabled={currentDayIndex === 6}
                        />
                    </View>
                </View>

                <Card style={styles.dayCard}>
                    <Card.Content>
                        <View style={styles.dayCardHeader}>
                            <Title>{currentDay.day}</Title>
                            <Text variant="bodySmall" style={{ color: '#666' }}>{currentDay.date}</Text>
                        </View>

                        <View style={styles.dayGrid}>
                            <View style={styles.dayItem}>
                                <TrendingUp size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.dayValue}>{currentDay.orders}</Text>
                                <Text style={styles.dayLabel}>Orders</Text>
                            </View>
                            <View style={styles.dayItem}>
                                <HandCoins size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.dayValue}>₹{currentDay.earnings}</Text>
                                <Text style={styles.dayLabel}>Earnings</Text>
                            </View>
                            <View style={styles.dayItem}>
                                <BadgePercent size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.dayValue}>{currentDay.distance}km</Text>
                                <Text style={styles.dayLabel}>Distance</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
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
    headerTitle: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    weeklyCard: {
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 12,
        marginBottom: 20,
    },
    weeklyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    payoutChip: {
        backgroundColor: PRIMARY_COLOR,
        height: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    gridItem: {
        width: '48%',
        backgroundColor: '#fff8f2',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ffe8d6',
    },
    gridValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    gridLabel: {
        fontSize: 12,
        color: '#666',
    },
    payoutStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dayPicker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayText: {
        minWidth: 80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    dayCard: {
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 12,
    },
    dayCardHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    dayGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayItem: {
        alignItems: 'center',
        gap: 5,
    },
    dayValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    dayLabel: {
        fontSize: 12,
        color: '#999',
    }
});
