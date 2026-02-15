import React from 'react';
import { Tabs } from 'expo-router';
import { Home, ClipboardList, Wallet, User } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#FF6B00',
            tabBarStyle: {
                height: 60,
                paddingBottom: 10,
                paddingTop: 5,
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="earnings"
                options={{
                    title: 'Earnings',
                    tabBarIcon: ({ color }) => <Wallet size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
