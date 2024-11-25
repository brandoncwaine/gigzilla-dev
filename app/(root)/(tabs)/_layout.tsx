import { Redirect, router, Tabs } from 'expo-router';

import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import firestore from '@react-native-firebase/firestore';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'index',
};

export default function TabsLayout() {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [isUserPlanner, setIsUserPlanner] = useState(false);

	// Handle user state changes
	function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	useEffect(() => {
		if (!user) return;
		firestore()
			.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setIsUserPlanner(doc.data()?.type === 'planner');
				}
			});
	}, [user]);

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
					headerTitleAlign: 'left',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'grid' : 'grid-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: 'Messages',
					headerTitleAlign: 'left',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'chatbox' : 'chatbox-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			{isUserPlanner ? (
				<Tabs.Screen
					name="explore"
					options={{
						title: 'Search',
						headerTitleAlign: 'left',
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? 'search' : 'search-outline'}
								color={color}
								size={24}
							/>
						),
					}}
				/>
			) : (
				<Tabs.Screen
					name="explore"
					options={{
						href: null,
					}}
				/>
			)}
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',
					headerTitleAlign: 'left',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'calendar' : 'calendar-outline'}
							color={color}
							size={24}
						/>
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
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'person' : 'person-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
