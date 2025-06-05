import { Redirect, Tabs } from 'expo-router';
import { View, Text } from '@/components/themed';

import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import TabsHeader from '@/components/common/TabsHeader';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'index',
};

export default function TabsLayout() {
	// Auth Context and state
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	const [initializing, setInitializing] = useState(true);

	const iconColor = useThemeColor(
		{ light: Colors.light.tint, dark: Colors.dark.tint },
		'tint'
	);

	// Handle user state changes
	function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
		setUser(user ? user : null); // Set user state
		setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return;

	if (!user) {
		return <Redirect href="/auth" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: iconColor,
				headerShadowVisible: false,
				header: ({ navigation, route, options }) => {
					return <TabsHeader title={options.title} />;
				},
			}}
		>
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

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'chatbox' : 'chatbox-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Search',

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: 'Calendar',

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'calendar' : 'calendar-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: true,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
