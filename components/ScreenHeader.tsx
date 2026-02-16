import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { User, Wallet } from 'lucide-react-native';
import ProfileSheet from './ProfileSheet';
import WalletSheet from './WalletSheet';

interface ScreenHeaderProps {
    title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
    const [profileVisible, setProfileVisible] = useState(false);
    const [walletVisible, setWalletVisible] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(title);

    // Animation values
    const titleFade = useRef(new Animated.Value(1)).current;
    const walletFade = useRef(new Animated.Value(title === 'Earnings' ? 1 : 0)).current;

    // Hardcoded for now as per requirement
    const walletBalance = "1,250.00";

    useEffect(() => {
        // Animate title change
        Animated.sequence([
            Animated.timing(titleFade, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(titleFade, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            })
        ]).start();

        // Update title text in the middle of animation
        setTimeout(() => setDisplayTitle(title), 150);

        // Animate wallet icon visibility
        Animated.timing(walletFade, {
            toValue: title === 'Earnings' ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [title]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Animated.View style={{ opacity: titleFade }}>
                    <Text variant="headlineSmall" style={styles.title}>{displayTitle}</Text>
                </Animated.View>

                <View style={styles.rightIcons}>
                    <Animated.View style={{ opacity: walletFade }}>
                        <TouchableOpacity
                            onPress={() => setWalletVisible(true)}
                            style={styles.iconButton}
                            disabled={title !== 'Earnings'}
                        >
                            <Wallet size={24} color="#666" />
                        </TouchableOpacity>
                    </Animated.View>

                    <TouchableOpacity
                        onPress={() => setProfileVisible(true)}
                        style={styles.iconButton}
                    >
                        <User size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileSheet
                visible={profileVisible}
                onDismiss={() => setProfileVisible(false)}
            />

            <WalletSheet
                visible={walletVisible}
                onDismiss={() => setWalletVisible(false)}
                balance={walletBalance}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
    },
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconButton: {
        padding: 5,
    }
});
