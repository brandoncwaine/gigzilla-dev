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
				name="(modals)/user"
				options={{
					headerBackTitle: 'Back',
					headerTintColor: '#ffffff',
					headerTransparent: true,
					headerTitle: '',
				}}
			/>
			<Stack.Screen
				name="(modals)/requestGig"
				options={{
					presentation: 'modal',
					title: 'Request a gig',
				}}
			/>
			<Stack.Screen
				name="(modals)/searchfilter"
				options={{
					presentation: 'modal',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="(screens)/gigDetails"
				options={{
					headerBackTitle: 'Back',
					headerTintColor: '#fff',
					headerTransparent: true,
					headerTitle: '',
				}}
			/>
			<Stack.Screen
				name="(screens)/chatroom"
				options={{
					headerBackTitle: 'Back',
				}}
			/>
		</Stack>
	);
}
