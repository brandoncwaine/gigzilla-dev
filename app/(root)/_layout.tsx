import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name="userProfile"
				options={{
					headerBackTitle: 'Back',
					headerTintColor: '#fff',
					headerTransparent: true,
					headerTitle: '',
				}}
			/>
			<Stack.Screen
				name="eventDetails"
				options={{
					headerBackTitle: 'Back',
					headerTintColor: '#fff',
					headerTransparent: true,
					headerTitle: '',
				}}
			/>
			<Stack.Screen
				name="chatroom"
				options={{
					headerBackTitle: 'Back',
					headerTintColor: '#fff',
					headerTransparent: true,
					headerTitle: '',
				}}
			/>
		</Stack>
	);
}
