import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, Chip } from 'react-native-paper';
import { Wallet, TrendingUp, Trophy } from 'lucide-react-native';
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

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    {/* Weekly Summary Container */}
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

                    {/* Achievements Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Weekly Goal Progress</Text>
                    </View>

                    <View style={styles.streakCard}>
                        <View style={styles.streakHeader}>
                            <View style={styles.pentagonBadge}>
                                <Trophy size={32} color="#fff" />
                            </View>
                            <Text style={styles.streakTitle}>3 Day Streak!</Text>
                            <Text style={styles.streakSubtitle}>You are on the right track</Text>
                        </View>

                        <View style={styles.daysRow}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                                const isCompleted = index < 3;
                                const isToday = index === 3;
                                return (
                                    <View key={day} style={styles.dayItem}>
                                        <Text style={styles.dayLabel}>{day}</Text>
                                        <View style={[
                                            styles.dayStatus,
                                            isCompleted && styles.dayCompleted,
                                            isToday && styles.dayToday
                                        ]}>
                                            {isCompleted ? (
                                                <TrendingUp size={14} color="#fff" />
                                            ) : (
                                                <Text style={[styles.dayNumber, isToday && styles.dayNumberToday]}>{index + 8}</Text>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <View style={styles.achievementCardCentered}>
                        <View style={styles.achievementInfoCentered}>
                            <Text style={styles.achievementTitleCentered}>Target Order</Text>
                            <Text style={styles.achievementProgressCentered}>82/100 orders this week</Text>
                            <View style={styles.progressBarBgLarge}>
                                <View style={[styles.progressBarFillLarge, { width: '82%' }]} />
                            </View>
                        </View>
                    </View>
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
        paddingTop: 8,
        paddingBottom: 160,
    },
    weeklyCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    cardContent: {
        padding: 20,
    },
    weeklyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 4,
    },
    payoutChip: {
        backgroundColor: PRIMARY_COLOR,
        height: 28,
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
        borderRadius: 15,
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    streakCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 24,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        alignItems: 'center',
    },
    streakHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    pentagonBadge: {
        width: 60,
        height: 60,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16,
        transform: [{ rotate: '45deg' }],
    },
    streakTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    streakSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    dayItem: {
        alignItems: 'center',
        gap: 8,
    },
    dayLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
    },
    dayStatus: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayCompleted: {
        backgroundColor: PRIMARY_COLOR,
    },
    dayToday: {
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#fff',
    },
    dayNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    dayNumberToday: {
        color: PRIMARY_COLOR,
    },
    achievementCardCentered: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    achievementInfoCentered: {
        alignItems: 'center',
    },
    achievementTitleCentered: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    achievementProgressCentered: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
    },
    progressBarBgLarge: {
        height: 8,
        backgroundColor: '#f1f1f1',
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFillLarge: {
        height: '100%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 4,
    }
});
