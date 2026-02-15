import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import * as Haptics from 'expo-haptics';
import { Home, ClipboardList, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = width * 0.6; // User requested closer together

export default function CustomTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
    // Trigger haptics when the active index changes (covers both tapping and swiping)
    const prevIndexRef = useRef(state.index);
    useEffect(() => {
        if (prevIndexRef.current !== state.index) {
            // Stronger impact for global navigation change
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            prevIndexRef.current = state.index;
        }
    }, [state.index]);

    return (
        <View style={styles.outerContainer} pointerEvents="box-none">
            {/* 
                We use an opaque white background at the very bottom 
                and a very dense gradient to ensure content is NOT seen 
                behind the navigation circles.
            */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)', '#ffffff']}
                style={styles.gradient}
                pointerEvents="none"
                locations={[0, 0.4, 1]} // Sharper transition to opaque
            />

            <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <TabItem
                                key={route.key}
                                isFocused={isFocused}
                                onPress={onPress}
                                name={route.name}
                            />
                        );
                    })}
                </View>
            </View>

            {/* Solid white guard at the very bottom to hide all content */}
            <View style={styles.bottomGuard} />
        </View>
    );
}

function TabItem({ isFocused, onPress, name }: { isFocused: boolean, onPress: () => void, name: string }) {
    const anim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(anim, {
            toValue: isFocused ? 1 : 0,
            useNativeDriver: false,
            friction: 8,
            tension: 40,
        }).start();
    }, [isFocused]);

    const scale = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.9, 1.25],
    });

    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10], // Slight lift when active
    });

    const backgroundColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(240, 240, 240, 1)', '#008080'], // Light grey to Teal
    });

    const getIcon = () => {
        const iconColor = isFocused ? '#fff' : '#666';
        const props = {
            size: 24,
            strokeWidth: isFocused ? 2.5 : 2,
            color: iconColor,
        };

        switch (name) {
            case 'index':
                return <Home {...props} />;
            case 'orders':
                return <ClipboardList {...props} />;
            case 'earnings':
                return <Wallet {...props} />;
            default:
                return <Home {...props} />;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.tabItem}
        >
            <Animated.View style={[
                styles.iconContainer,
                {
                    backgroundColor,
                    transform: [{ scale }, { translateY }],
                    shadowOpacity: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.1, 0.4],
                    }),
                    shadowRadius: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                }
            ]}>
                {getIcon()}
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200, // Increased to accommodate tall gradient
        justifyContent: 'flex-end',
        zIndex: 9999,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 170, // Tall enough to create a fade boundary
    },
    bottomGuard: {
        height: 30, // Solid white section at the absolute bottom
        backgroundColor: '#ffffff',
    },
    tabBarContainer: {
        alignItems: 'center',
        paddingBottom: 45, // Elevated position
        zIndex: 10,
    },
    tabBar: {
        flexDirection: 'row',
        width: TAB_BAR_WIDTH,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    }
});
