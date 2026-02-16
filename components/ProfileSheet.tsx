import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable, Animated, Platform } from 'react-native';
import { Text, Title, Avatar, Divider, Switch, Button } from 'react-native-paper';
import { User, FileText, Landmark, Bell, LogOut, ChevronRight, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#008080';
const SECONDARY_BG = '#e0f2f2';
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ProfileSheetProps {
    visible: boolean;
    onDismiss: () => void;
}

export default function ProfileSheet({ visible, onDismiss }: ProfileSheetProps) {
    const [isAvailable, setIsAvailable] = useState(true);
    const router = useRouter();

    // Animation refs
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Open animation
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
            // Reset values for next open
            slideAnim.setValue(SCREEN_HEIGHT);
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
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            onDismiss();
        });
    };

    const user = {
        name: 'Rahul Sharma',
        email: 'rahul.s@bezgofresh.com',
        phone: '+91 9876543210',
        avatar: null,
    };

    const handleLogout = () => {
        onDismiss();
        // Give the modal a moment to animate out before switching stacks
        setTimeout(() => {
            router.replace('/');
        }, 150);
    };

    const MenuItem = ({ icon: Icon, title, onPress, showDivider = true }: any) => (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.menuItem}>
                <View style={styles.menuLeft}>
                    <View style={styles.iconCircle}>
                        <Icon size={18} color={PRIMARY_COLOR} />
                    </View>
                    <Text style={styles.menuTitle}>{title}</Text>
                </View>
                <ChevronRight size={18} color="#ccc" />
            </TouchableOpacity>
            {showDivider && <Divider style={styles.menuDivider} />}
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none" // Custom animation
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
                    <View style={styles.dragHandle} />

                    <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                        <X size={24} color="#666" />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        <View style={styles.header}>
                            <Avatar.Icon size={70} icon="account" style={{ backgroundColor: PRIMARY_COLOR }} />
                            <Title style={styles.name}>{user.name}</Title>
                            <View style={styles.userInfoSub}>
                                <Text style={styles.email}>{user.email}</Text>
                                <Text style={styles.phone}>{user.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.content}>
                            {/* Availability Box */}
                            <View style={[styles.availabilityBox, { backgroundColor: isAvailable ? '#f0fff4' : '#fff5f5' }]}>
                                <View style={styles.availabilityRow}>
                                    <View>
                                        <Text style={[styles.availStatusText, { color: isAvailable ? '#2f855a' : '#c53030' }]}>
                                            {isAvailable ? 'Available for Orders' : 'Offline'}
                                        </Text>
                                        <Text style={styles.availSubtext}>
                                            Toggle to start/stop receiving orders
                                        </Text>
                                    </View>
                                    <Switch
                                        value={isAvailable}
                                        onValueChange={setIsAvailable}
                                        color={isAvailable ? '#48bb78' : PRIMARY_COLOR}
                                    />
                                </View>
                            </View>

                            {/* Menu List */}
                            <View style={styles.menuCard}>
                                <MenuItem icon={User} title="Profile" onPress={() => { }} />
                                <MenuItem icon={FileText} title="Documents" onPress={() => { }} />
                                <MenuItem icon={Landmark} title="Bank Account" onPress={() => { }} />
                                <MenuItem icon={Bell} title="Notifications" onPress={() => { }} showDivider={false} />
                            </View>

                            <Button
                                mode="contained"
                                onPress={handleLogout}
                                style={styles.logoutBtn}
                                contentStyle={styles.logoutBtnContent}
                                buttonColor="#ff4d4d"
                                icon={() => <LogOut size={20} color="#fff" />}
                            >
                                Logout
                            </Button>

                            <Text style={styles.versionText}>Version 2.0.1 (Expo Go)</Text>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheetContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: SCREEN_HEIGHT * 0.85,
        width: '100%',
        paddingTop: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 20,
            }
        })
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#eee',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 10,
        padding: 5,
    },
    header: {
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center',
    },
    name: {
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 22,
        color: '#1a1a1a',
    },
    userInfoSub: {
        alignItems: 'center',
        marginTop: 4,
    },
    email: {
        color: '#666',
        fontSize: 14,
    },
    phone: {
        color: '#999',
        fontSize: 13,
        marginTop: 2,
    },
    content: {
        padding: 20,
        paddingBottom: 60,
    },
    availabilityBox: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    availStatusText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    availSubtext: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 28,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: SECONDARY_BG,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    menuDivider: {
        backgroundColor: '#f8f8f8',
        marginHorizontal: 20,
    },
    logoutBtn: {
        borderRadius: 18,
        marginTop: 10,
        elevation: 0,
    },
    logoutBtnContent: {
        height: 56,
    },
    versionText: {
        textAlign: 'center',
        color: '#ccc',
        marginTop: 30,
        fontSize: 12,
    }
});
