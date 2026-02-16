import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { Text, Title, Divider } from 'react-native-paper';
import { ChevronLeft, ChevronRight, TrendingUp, HandCoins, CalendarDays, Package, IndianRupee, X } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#008080';

export default function EarningsScreen() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    // Mock data
    const dailyData: any = {
        '2026-02-15': {
            orders: 3,
            earnings: 115,
            orderBreakdown: [
                { id: '8842', amount: 45, time: '10:30 AM' },
                { id: '8845', amount: 35, time: '12:15 PM' },
                { id: '8849', amount: 35, time: '02:45 PM' }
            ]
        },
        '2026-02-14': {
            orders: 2,
            earnings: 80,
            orderBreakdown: [
                { id: '8830', amount: 40, time: '11:00 AM' },
                { id: '8835', amount: 40, time: '03:30 PM' }
            ]
        },
        'default': { orders: 0, earnings: 0, orderBreakdown: [] }
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
        if (nextDate <= today) {
            setSelectedDate(nextDate);
        }
    };

    const onDateSelect = (day: any) => {
        setSelectedDate(new Date(day.timestamp));
        setIsCalendarVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Premium Date Selection Box */}
                    <View style={styles.dateSelectorCard}>
                        <View style={styles.dateSelectorContent}>
                            <TouchableOpacity onPress={() => changeDate(-1)} style={styles.arrowButton}>
                                <ChevronLeft size={28} color={PRIMARY_COLOR} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsCalendarVisible(true)}
                                style={styles.dateInfo}
                                activeOpacity={0.7}
                            >
                                <CalendarDays size={20} color={PRIMARY_COLOR} style={{ marginBottom: 4 }} />
                                <Text variant="titleMedium" style={styles.dateText}>{displayDate(selectedDate)}</Text>
                                {formatDate(selectedDate) === formatDate(today) && (
                                    <View style={styles.todayBadge}>
                                        <Text style={styles.todayBadgeText}>TODAY</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => changeDate(1)}
                                style={[styles.arrowButton, formatDate(selectedDate) === formatDate(today) && { opacity: 0.2 }]}
                                disabled={formatDate(selectedDate) === formatDate(today)}
                            >
                                <ChevronRight size={28} color={PRIMARY_COLOR} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Summary for Selected Date */}
                    <View style={styles.summaryGrid}>
                        <View style={styles.statCard}>
                            <View style={styles.statContent}>
                                <TrendingUp size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.statValue}>{currentData.orders}</Text>
                                <Text style={styles.statLabel}>Orders</Text>
                            </View>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statContent}>
                                <HandCoins size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.statValue}>₹{currentData.earnings}</Text>
                                <Text style={styles.statLabel}>Earnings</Text>
                            </View>
                        </View>
                    </View>

                    {/* Per Order Earnings List */}
                    <View style={styles.sectionHeader}>
                        <Title style={styles.sectionTitle}>Order Breakdown</Title>
                        <Text style={styles.orderCountBadge}>{currentData.orderBreakdown.length} Orders</Text>
                    </View>

                    {currentData.orderBreakdown.length > 0 ? (
                        currentData.orderBreakdown.map((order: any, index: number) => (
                            <View key={index} style={styles.orderRowCard}>
                                <View style={styles.orderRowContent}>
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
                                </View>
                            </View>
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

            {/* Custom Premium Calendar Modal */}
            <Modal
                visible={isCalendarVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsCalendarVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <Pressable style={styles.backdrop} onPress={() => setIsCalendarVisible(false)} />
                    <View style={styles.calendarContainer}>
                        <View style={styles.calendarHeader}>
                            <Text style={styles.calendarHeaderTitle}>Select Date</Text>
                            <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                                <X size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <Calendar
                            current={formatDate(selectedDate)}
                            maxDate={formatDate(today)}
                            onDayPress={onDateSelect}
                            markedDates={{
                                [formatDate(selectedDate)]: { selected: true, selectedColor: PRIMARY_COLOR }
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: PRIMARY_COLOR,
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: PRIMARY_COLOR,
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: PRIMARY_COLOR,
                                selectedDotColor: '#ffffff',
                                arrowColor: PRIMARY_COLOR,
                                monthTextColor: '#1a1a1a',
                                indicatorColor: PRIMARY_COLOR,
                                textDayFontWeight: '500',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: 'bold',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 12,
                            }}
                            style={styles.calendarStyle}
                        />
                    </View>
                </View>
            </Modal>
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
        borderRadius: 15,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dateSelectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    arrowButton: {
        padding: 8,
    },
    dateInfo: {
        alignItems: 'center',
        flex: 1,
    },
    dateText: {
        fontWeight: 'bold',
        color: '#1a1a1a',
        fontSize: 20,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
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
        borderRadius: 16,
        marginBottom: 12,
        elevation: 1,
        borderLeftWidth: 4,
        borderLeftColor: PRIMARY_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    orderRowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
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
    },
    // Calendar Styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    calendarContainer: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingBottom: 10,
        overflow: 'hidden',
        elevation: 10,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    calendarHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    calendarStyle: {
        borderRadius: 15,
    },
});
