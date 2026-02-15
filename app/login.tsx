import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Card, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Lock, User } from 'lucide-react-native';

const PRIMARY_COLOR = '#FF6B00';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        // UI Only: Just navigate to home
        router.replace('/(tabs)');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                {/* Placeholder for a wavy background or logo */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Rider Joy</Text>
                    <Text style={styles.tagline}>Swift & Reliable Deliveries</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Sign in to start your shift</Text>

                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#e0e0e0"
                    activeOutlineColor={PRIMARY_COLOR}
                    left={<TextInput.Icon icon={() => <User size={20} color="#666" />} />}
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    outlineColor="#e0e0e0"
                    activeOutlineColor={PRIMARY_COLOR}
                    left={<TextInput.Icon icon={() => <Lock size={20} color="#666" />} />}
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    buttonColor={PRIMARY_COLOR}
                >
                    Sign In
                </Button>

                <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.footerText}>
                        Don't have an account? <Text style={styles.linkText}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: '35%',
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 5,
    },
    formContainer: {
        padding: 30,
        flex: 1,
        marginTop: -20,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        color: '#666',
        marginBottom: 30,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 20,
        borderRadius: 12,
        elevation: 4,
    },
    buttonContent: {
        height: 50,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#666',
    },
    linkText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    }
});
