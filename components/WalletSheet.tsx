import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable, Animated, Platform } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { X, Wallet } from 'lucide-react-native';

const PRIMARY_COLOR = '#008080';
const SECONDARY_BG = '#e0f2f2';
const SCREEN_WIDTH = Dimensions.get('window').width;

interface WalletSheetProps {
    visible: boolean;
    onDismiss: () => void;
    balance: string;
}

export default function WalletSheet({ visible, onDismiss, balance }: WalletSheetProps) {
    const slideAnim = useRef(new Animated.Value(-200)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            slideAnim.setValue(-200);
            fadeAnim.setValue(0);
        }
    }, [visible]);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -200,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            onDismiss();
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={handleDismiss}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.backdrop,
                        { opacity: fadeAnim }
                    ]}
                >
                    <Pressable style={{ flex: 1 }} onPress={handleDismiss} />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.sheetContent,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <View style={styles.header}>
                        <View style={styles.headerTitleRow}>
                            <Wallet size={20} color={PRIMARY_COLOR} />
                            <Text style={styles.headerTitle}>Wallet</Text>
                        </View>
                        <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                            <X size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <Divider />

                    <View style={styles.content}>
                        <Text style={styles.balanceLabel}>Current Balance</Text>
                        <Text style={styles.balanceAmount}>₹{balance}</Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheetContent: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        width: '100%',
        paddingBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            }
        })
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 15,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    closeButton: {
        padding: 5,
    },
    content: {
        padding: 24,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    }
});
