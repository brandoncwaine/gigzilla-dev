import { Stack } from 'expo-router';
export default function StackLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="editProfile"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
