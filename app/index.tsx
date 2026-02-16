import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Phone, ShieldCheck, ChevronLeft } from 'lucide-react-native';

const PRIMARY_COLOR = '#008080';
const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const router = useRouter();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // OTP Input Refs
    const inputRefs = useRef<Array<any>>([]);

    useEffect(() => {
        let interval: any;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    const handleSendOtp = () => {
        if (phoneNumber.length === 10) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setIsOtpSent(true);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();

                // Reset OTP if sent again
                setOtp(['', '', '', '', '', '']);
            });
        }
    };

    const handleVerifyOtp = (finalOtp: string) => {
        // Simple mock check
        // If correct, it automatically proceeds
        if (finalOtp.length === 6) {
            router.push('/verification');
        }
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto verify if last digit is entered
        if (index === 5 && value) {
            handleVerifyOtp(newOtp.join(''));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Bezgo</Text>
                    <Text style={styles.riderText}>RIDERS</Text>
                    <View style={styles.headerLine} />
                    <Text style={styles.tagline}>Partner App</Text>
                </View>
            </View>

            <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                {!isOtpSent ? (
                    <View>
                        <Text variant="headlineSmall" style={styles.title}>Welcome!</Text>
                        <Text variant="bodyMedium" style={styles.subtitle}>Enter your phone number to login</Text>

                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCode}>
                                <Text style={styles.countryCodeText}>+91</Text>
                            </View>
                            <TextInput
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                mode="flat"
                                keyboardType="phone-pad"
                                maxLength={10}
                                style={styles.input}
                                activeUnderlineColor={PRIMARY_COLOR}
                                left={<TextInput.Icon icon={() => <Phone size={20} color="#666" />} />}
                            />
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleSendOtp}
                            disabled={phoneNumber.length !== 10}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                            buttonColor={PRIMARY_COLOR}
                        >
                            Send OTP
                        </Button>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={() => setIsOtpSent(false)}
                            style={styles.backButton}
                        >
                            <ChevronLeft size={20} color="#666" />
                            <Text style={styles.backButtonText}>Change Number</Text>
                        </TouchableOpacity>

                        <Text variant="headlineSmall" style={styles.title}>Confirm OTP</Text>
                        <Text variant="bodyMedium" style={styles.subtitle}>OTP sent to +91 {phoneNumber}</Text>

                        <View style={styles.otpGrid}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref: any) => (inputRefs.current[index] = ref)}
                                    value={digit}
                                    onChangeText={(v) => handleOtpChange(v, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    mode="outlined"
                                    style={styles.otpInput}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    outlineColor="#e0e0e0"
                                    activeOutlineColor={PRIMARY_COLOR}
                                />
                            ))}
                        </View>

                        <View style={styles.timerRow}>
                            {timer > 0 ? (
                                <Text style={styles.timerText}>Resend OTP in <Text style={{ fontWeight: 'bold' }}>00:{timer < 10 ? `0${timer}` : timer}</Text></Text>
                            ) : (
                                <TouchableOpacity onPress={() => setTimer(30)}>
                                    <Text style={styles.resendText}>Resend OTP</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push('/signup')}
                            style={styles.registerLink}
                        >
                            <Text style={styles.registerText}>
                                New rider? <Text style={styles.registerLinkBold}>Register here</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>

            <View style={styles.footer}>
                <ShieldCheck size={16} color="#999" />
                <Text style={styles.footerText}>Secure Login Powered by Bezgo</Text>
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
        height: '40%',
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        paddingHorizontal: 40,
        borderBottomLeftRadius: 40,
    },
    logoContainer: {
        marginTop: 40,
    },
    logoText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1,
    },
    riderText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: -10,
        letterSpacing: 4,
    },
    // Fix for the View which was accidentally written as div
    headerLine: {
        width: 40,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        marginVertical: 15,
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    formContainer: {
        padding: 30,
        flex: 1,
        marginTop: -30,
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
    },
    title: {
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        color: '#666',
        marginBottom: 32,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    countryCode: {
        paddingHorizontal: 12,
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginRight: 10,
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 50,
    },
    otpGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpInput: {
        width: width * 0.12,
        height: 50,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 10,
        borderRadius: 15,
        elevation: 0,
    },
    buttonContent: {
        height: 56,
    },
    timerRow: {
        alignItems: 'center',
        marginBottom: 32,
    },
    timerText: {
        color: '#999',
        fontSize: 14,
    },
    resendText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 14,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginLeft: -4,
    },
    backButtonText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
        color: '#666',
    },
    registerLinkBold: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        gap: 8,
    },
    footerText: {
        fontSize: 12,
        color: '#999',
    },
});
