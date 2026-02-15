import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { User } from 'lucide-react-native';
import ProfileSheet from './ProfileSheet';

interface ScreenHeaderProps {
    title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
    const [profileVisible, setProfileVisible] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text variant="headlineSmall" style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={() => setProfileVisible(true)}
                    style={styles.profileButton}
                >
                    <User size={24} color="#666" />
                </TouchableOpacity>
            </View>

            <ProfileSheet
                visible={profileVisible}
                onDismiss={() => setProfileVisible(false)}
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
    profileButton: {
        padding: 5,
    }
});
