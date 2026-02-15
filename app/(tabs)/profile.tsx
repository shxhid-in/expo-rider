import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Avatar, List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import { User, FileText, Landmark, Bell, LogOut, ChevronRight, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#008080';

export default function ProfileScreen() {
    const [isAvailable, setIsAvailable] = useState(true);
    const router = useRouter();

    const user = {
        name: 'Rahul Sharma',
        email: 'rahul.s@bezgofresh.com',
        phone: '+91 9876543210',
        avatar: null,
    };

    const handleLogout = () => {
        router.replace('/login');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Icon size={80} icon="account" style={{ backgroundColor: PRIMARY_COLOR }} />
                <Title style={styles.name}>{user.name}</Title>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
            </View>

            <View style={styles.content}>
                {/* Availability Card */}
                <Card style={styles.availabilityCard}>
                    <Card.Content>
                        <View style={styles.availabilityRow}>
                            <View>
                                <Title style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    {isAvailable ? 'Available for Orders' : 'Offline'}
                                </Title>
                                <Text variant="bodySmall" style={{ color: '#666' }}>
                                    Toggle to start or stop receiving deliveries
                                </Text>
                            </View>
                            <Switch
                                value={isAvailable}
                                onValueChange={setIsAvailable}
                                color={PRIMARY_COLOR}
                            />
                        </View>
                    </Card.Content>
                </Card>

                {/* Menu List */}
                <Card style={styles.menuCard}>
                    <List.Section>
                        <List.Item
                            title="Personal Details"
                            description="Name, Email, Phone Number"
                            left={props => <View style={styles.iconCircle}><User size={20} color={PRIMARY_COLOR} /></View>}
                            right={props => <ChevronRight size={20} color="#999" style={{ alignSelf: 'center' }} />}
                            onPress={() => { }}
                        />
                        <Divider />
                        <List.Item
                            title="Documents"
                            description="Aadhaar, PAN, DL Verification"
                            left={props => <View style={styles.iconCircle}><FileText size={20} color={PRIMARY_COLOR} /></View>}
                            right={props => <ChevronRight size={20} color="#999" style={{ alignSelf: 'center' }} />}
                            onPress={() => { }}
                        />
                        <Divider />
                        <List.Item
                            title="Bank Account"
                            description="Payout settings & Bank details"
                            left={props => <View style={styles.iconCircle}><Landmark size={20} color={PRIMARY_COLOR} /></View>}
                            right={props => <ChevronRight size={20} color="#999" style={{ alignSelf: 'center' }} />}
                            onPress={() => { }}
                        />
                        <Divider />
                        <List.Item
                            title="Notifications"
                            description="Order alerts & system updates"
                            left={props => <View style={styles.iconCircle}><Bell size={20} color={PRIMARY_COLOR} /></View>}
                            right={props => <ChevronRight size={20} color="#999" style={{ alignSelf: 'center' }} />}
                            onPress={() => { }}
                        />
                        <Divider />
                        <List.Item
                            title="Settings"
                            description="App preferences & Dark mode"
                            left={props => <View style={styles.iconCircle}><Settings size={20} color={PRIMARY_COLOR} /></View>}
                            right={props => <ChevronRight size={20} color="#999" style={{ alignSelf: 'center' }} />}
                            onPress={() => { }}
                        />
                    </List.Section>
                </Card>

                <Button
                    mode="contained"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    buttonColor="#f44336"
                    icon={() => <LogOut size={18} color="#fff" />}
                >
                    Logout
                </Button>

                <Text variant="bodySmall" style={styles.versionText}>Version 2.0.1 (Expo Go)</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 4,
    },
    name: {
        marginTop: 15,
        fontWeight: 'bold',
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
        padding: 16,
        paddingBottom: 40,
    },
    availabilityCard: {
        backgroundColor: '#fff8f2',
        borderWidth: 1,
        borderColor: '#ffe8d6',
        borderRadius: 12,
        marginBottom: 20,
        marginTop: 10,
    },
    availabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        marginBottom: 20,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff1e6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 5,
    },
    logoutButton: {
        borderRadius: 12,
        paddingVertical: 4,
    },
    versionText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 30,
    }
});
