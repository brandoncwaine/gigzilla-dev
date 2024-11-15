import { Redirect, router, Tabs } from 'expo-router';

import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'index',
};

export default function TabsLayout() {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	// Handle user state changes
	function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	if (!user) {
		return <Redirect href="/auth/" />;
	}

	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Dashboard',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Ionicons name="grid" color={color} size={24} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Ionicons name="calendar" color={color} size={24} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: true,
					headerTitleAlign: 'left',
					headerRight: () => (
						<TouchableOpacity
							style={{ paddingRight: 16 }}
							onPress={() => router.push('/(root)/settings')}
						>
							<Ionicons name="settings-outline" size={24} color={'#222'} />
						</TouchableOpacity>
					),
					tabBarIcon: ({ color }) => (
						<Ionicons name="person" color={color} size={24} />
					),
				}}
			/>
		</Tabs>
	);
}
