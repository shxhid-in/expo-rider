import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ title: 'Login' }} />
                <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
            </Stack>
        </PaperProvider>
    );
}
