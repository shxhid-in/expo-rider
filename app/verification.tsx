import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Image } from 'react-native';
import { Text, Button, Card, Title } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { ShieldCheck, Camera, FileText, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const PRIMARY_COLOR = '#008080';
const { width } = Dimensions.get('window');

export default function VerificationScreen() {
    const router = useRouter();
    const [selfie, setSelfie] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const takeSelfie = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access camera was denied');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: false,
            quality: 0.8,
        });

        if (!result.canceled) {
            setSelfie(result.assets[0].uri);
            setIsVerifying(true);

            // Mocking a short verification delay
            setTimeout(() => {
                setIsVerifying(false);
            }, 2000);
        }
    };

    const removeSelfie = () => {
        setSelfie(null);
        setIsVerifying(false);
    };

    const handleComplete = () => {
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <ShieldCheck size={48} color={PRIMARY_COLOR} />
                    <Title style={styles.headerTitle}>Verification</Title>
                    <Text style={styles.headerSub}>Verify your identity to start work</Text>
                </View>

                <View style={styles.cardList}>
                    {/* Selfie Option */}
                    <Card style={[styles.card, selfie && styles.cardActive]}>
                        <View style={styles.cardPadding}>
                            <View style={styles.row}>
                                <View style={[styles.iconBox, { backgroundColor: selfie ? 'white' : '#f0f7f7' }]}>
                                    <Camera size={24} color={selfie ? PRIMARY_COLOR : '#666'} />
                                </View>
                                <View style={styles.info}>
                                    <Text style={[styles.cardTitle, selfie && { color: '#fff' }]}>Take a Selfie</Text>
                                    <Text style={[styles.cardDesc, selfie && { color: 'rgba(255,255,255,0.8)' }]}>
                                        Open front camera and click a snap
                                    </Text>
                                </View>
                                {selfie ? (
                                    <CheckCircle2 size={24} color="#fff" />
                                ) : (
                                    <TouchableOpacity style={styles.verifyBtn} onPress={takeSelfie}>
                                        <Text style={styles.verifyBtnText}>Capture</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {selfie && (
                                <View style={styles.selfiePreviewContainer}>
                                    <Image source={{ uri: selfie }} style={styles.selfieImage} />
                                    {isVerifying ? (
                                        <View style={styles.verifyingOverlay}>
                                            <Text style={styles.verifyingText}>Verifying...</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={styles.removeBtn} onPress={removeSelfie}>
                                            <Trash2 size={16} color="#ff4444" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    </Card>

                    {/* Document Verification (Disabled) */}
                    <Card style={[styles.card, styles.disabledCard]}>
                        <View style={styles.cardPadding}>
                            <View style={styles.row}>
                                <View style={styles.iconBox}>
                                    <FileText size={24} color="#999" />
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.cardTitleDisabled}>Document Verification</Text>
                                    <Text style={styles.cardDesc}>Upload Aadhaar, PAN or DL</Text>
                                </View>
                                <View style={styles.comingSoonBadge}>
                                    <Text style={styles.comingSoonText}>SOON</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>

                <Button
                    mode="contained"
                    onPress={handleComplete}
                    disabled={!selfie || isVerifying}
                    style={[styles.mainBtn, (!selfie || isVerifying) && { opacity: 0.5 }]}
                    contentStyle={styles.mainBtnContent}
                    buttonColor={PRIMARY_COLOR}
                >
                    Get Started
                </Button>

                <View style={styles.safetyInfo}>
                    <AlertCircle size={14} color="#999" />
                    <Text style={styles.safetyText}>Secure verification system powered by Bezgo</Text>
                </View>
            </ScrollView>

            {/* DEV MODE SKIP BUTTON */}
            <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => router.replace('/(tabs)')}
            >
                <Text style={styles.skipText}>Skip Setup (Dev Only)</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfdfd',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 48,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        marginTop: 16,
    },
    headerSub: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    cardList: {
        gap: 20,
        marginBottom: 40,
    },
    card: {
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        overflow: 'hidden',
    },
    cardActive: {
        backgroundColor: PRIMARY_COLOR,
    },
    disabledCard: {
        backgroundColor: '#f5f5f5',
        opacity: 0.7,
    },
    cardPadding: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    cardTitleDisabled: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#999',
    },
    cardDesc: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    verifyBtn: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    verifyBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    comingSoonBadge: {
        backgroundColor: '#eee',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    comingSoonText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#999',
    },
    selfiePreviewContainer: {
        marginTop: 20,
        alignItems: 'center',
        position: 'relative',
    },
    selfieImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        backgroundColor: '#000',
    },
    verifyingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyingText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    removeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
        elevation: 2,
    },
    mainBtn: {
        borderRadius: 18,
        elevation: 0,
    },
    mainBtnContent: {
        height: 56,
    },
    safetyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        gap: 6,
    },
    safetyText: {
        fontSize: 12,
        color: '#999',
    },
    skipBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
    },
    skipText: {
        fontSize: 12,
        color: '#ccc',
        textDecorationLine: 'underline',
    }
});
