import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native';
import { Text, Card, Title, Avatar, List, Switch, Divider, Button } from 'react-native-paper';
import { User, FileText, Landmark, Bell, LogOut, ChevronRight, Settings, X } from 'lucide-react-native';
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

    const user = {
        name: 'Rahul Sharma',
        email: 'rahul.s@bezgofresh.com',
        phone: '+91 9876543210',
        avatar: null,
    };

    const handleLogout = () => {
        onDismiss();
        router.replace('/login');
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onDismiss}
        >
            <View style={styles.modalOverlay}>
                <Pressable style={styles.backdrop} onPress={onDismiss} />
                <View style={styles.sheetContent}>
                    <View style={styles.dragHandle} />

                    <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
                        <X size={24} color="#666" />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <Avatar.Icon size={70} icon="account" style={{ backgroundColor: PRIMARY_COLOR }} />
                            <Title style={styles.name}>{user.name}</Title>
                            <Text style={styles.email}>{user.email}</Text>
                            <Text style={styles.phone}>{user.phone}</Text>
                        </View>

                        <View style={styles.content}>
                            {/* Availability Card */}
                            <Card style={[styles.availabilityCard, { backgroundColor: isAvailable ? '#f0fff4' : '#fff5f5', borderColor: isAvailable ? '#c6f6d5' : '#fed7d7' }]}>
                                <Card.Content>
                                    <View style={styles.availabilityRow}>
                                        <View>
                                            <Title style={{ fontSize: 16, fontWeight: 'bold', color: isAvailable ? '#2f855a' : '#c53030' }}>
                                                {isAvailable ? 'Available for Orders' : 'Offline'}
                                            </Title>
                                            <Text variant="bodySmall" style={{ color: '#666' }}>
                                                Toggle to start/stop receiving deliveries
                                            </Text>
                                        </View>
                                        <Switch
                                            value={isAvailable}
                                            onValueChange={setIsAvailable}
                                            color={isAvailable ? '#48bb78' : PRIMARY_COLOR}
                                        />
                                    </View>
                                </Card.Content>
                            </Card>

                            {/* Menu List */}
                            <Card style={styles.menuCard}>
                                <List.Section>
                                    <List.Item
                                        title="Profile"
                                        left={props => <View style={styles.iconCircle}><User size={18} color={PRIMARY_COLOR} /></View>}
                                        right={props => <ChevronRight size={18} color="#999" style={{ alignSelf: 'center' }} />}
                                        onPress={() => { }}
                                    />
                                    <Divider />
                                    <List.Item
                                        title="Documents"
                                        left={props => <View style={styles.iconCircle}><FileText size={18} color={PRIMARY_COLOR} /></View>}
                                        right={props => <ChevronRight size={18} color="#999" style={{ alignSelf: 'center' }} />}
                                        onPress={() => { }}
                                    />
                                    <Divider />
                                    <List.Item
                                        title="Bank Account"
                                        left={props => <View style={styles.iconCircle}><Landmark size={18} color={PRIMARY_COLOR} /></View>}
                                        right={props => <ChevronRight size={18} color="#999" style={{ alignSelf: 'center' }} />}
                                        onPress={() => { }}
                                    />
                                    <Divider />
                                    <List.Item
                                        title="Notifications"
                                        left={props => <View style={styles.iconCircle}><Bell size={18} color={PRIMARY_COLOR} /></View>}
                                        right={props => <ChevronRight size={18} color="#999" style={{ alignSelf: 'center' }} />}
                                        onPress={() => { }}
                                    />
                                    <Divider />
                                    <List.Item
                                        title="Settings"
                                        left={props => <View style={styles.iconCircle}><Settings size={18} color={PRIMARY_COLOR} /></View>}
                                        right={props => <ChevronRight size={18} color="#999" style={{ alignSelf: 'center' }} />}
                                        onPress={() => { }}
                                    />
                                </List.Section>
                            </Card>

                            <Button
                                mode="contained"
                                onPress={handleLogout}
                                style={styles.logoutButton}
                                buttonColor="#f44336"
                                icon={() => <LogOut size={16} color="#fff" />}
                            >
                                Logout
                            </Button>

                            <Text variant="bodySmall" style={styles.versionText}>Version 2.0.1 (Expo Go)</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    sheetContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: SCREEN_HEIGHT * 0.85,
        width: '100%',
        paddingTop: 12,
        overflow: 'hidden',
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 1,
    },
    header: {
        padding: 24,
        alignItems: 'center',
    },
    name: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    email: {
        color: '#666',
        fontSize: 14,
    },
    phone: {
        color: '#999',
        fontSize: 12,
        marginTop: 4,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    availabilityCard: {
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 0,
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 0,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 20,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: SECONDARY_BG,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logoutButton: {
        borderRadius: 12,
        paddingVertical: 2,
    },
    versionText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    }
});
