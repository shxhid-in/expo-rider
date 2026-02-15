import { Redirect } from 'expo-router';

export default function Index() {
    // UI Only: Default to login screen
    return <Redirect href="/login" />;
}
