import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withLayoutContext, useSegments } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import ScreenHeader from '../../components/ScreenHeader';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
    const segments = useSegments();

    // Determine title based on current segment
    // segments will be something like ["(tabs)", "index"]
    const currentTab = segments[segments.length - 1];

    let headerTitle = 'Dashboard';
    if (currentTab === 'orders') headerTitle = 'Orders';
    if (currentTab === 'earnings') headerTitle = 'Earnings';

    return (
        <View style={styles.container}>
            {/* The Header is now STATIC and does not swipe with pages */}
            <ScreenHeader title={headerTitle} />

            <MaterialTopTabs
                tabBarPosition="bottom"
                tabBar={(props: any) => <CustomTabBar {...props} />}
                initialRouteName="index"
                screenOptions={{
                    swipeEnabled: true,
                }}
            >
                <MaterialTopTabs.Screen name="orders" options={{ title: 'Orders' }} />
                <MaterialTopTabs.Screen name="index" options={{ title: 'Home' }} />
                <MaterialTopTabs.Screen name="earnings" options={{ title: 'Earnings' }} />
            </MaterialTopTabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
