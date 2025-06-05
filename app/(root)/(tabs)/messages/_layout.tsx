import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
export default function StackLayout() {
	const lightMode = useColorScheme() === 'light';
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />

			<Stack.Screen
				name="requests"
				options={{
					headerShown: true,
					headerTitle: '',
					headerBackTitle: 'Messages',
					headerTintColor: lightMode ? '#000' : '#fefefe',
					headerTransparent: true,
				}}
			/>
		</Stack>
	);
}
