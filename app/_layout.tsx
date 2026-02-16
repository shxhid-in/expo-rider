import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" options={{ title: 'Login' }} />
                    <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
                    <Stack.Screen name="verification" options={{ title: 'Verification' }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
