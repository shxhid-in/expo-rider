import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Lock, User, Phone, Mail } from 'lucide-react-native';

const PRIMARY_COLOR = '#008080';

export default function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = () => {
        // UI Only: Just navigate to login
        router.replace('/login');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={styles.title}>Join Rider Joy</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>Start your journey with us today</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                        outlineColor="#e0e0e0"
                        activeOutlineColor={PRIMARY_COLOR}
                        left={<TextInput.Icon icon={() => <User size={20} color="#666" />} />}
                    />

                    <TextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType="email-address"
                        style={styles.input}
                        outlineColor="#e0e0e0"
                        activeOutlineColor={PRIMARY_COLOR}
                        left={<TextInput.Icon icon={() => <Mail size={20} color="#666" />} />}
                    />

                    <TextInput
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        mode="outlined"
                        keyboardType="phone-pad"
                        style={styles.input}
                        outlineColor="#e0e0e0"
                        activeOutlineColor={PRIMARY_COLOR}
                        left={<TextInput.Icon icon={() => <Phone size={20} color="#666" />} />}
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
                        onPress={handleSignup}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        buttonColor={PRIMARY_COLOR}
                    >
                        Create Account
                    </Button>

                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.footerText}>
                            Already have an account? <Text style={styles.linkText}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        padding: 30,
        paddingTop: 60,
        backgroundColor: PRIMARY_COLOR,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 5,
    },
    formContainer: {
        padding: 30,
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
