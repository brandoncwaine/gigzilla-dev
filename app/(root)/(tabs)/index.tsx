import { FlatList, View, Text, ActivityIndicator } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useState, useEffect } from 'react';

export default function Index() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const subscriber = firestore()
			.collection('users')
			.onSnapshot((querySnapshot) => {
				const users = [];

				querySnapshot.forEach((documentSnapshot) => {
					users.push({
						...documentSnapshot.data(),
						key: documentSnapshot.id,
					});
				});

				setUsers(users);
				setLoading(false);
			});

		// Unsubscribe from events when no longer in use
		return () => subscriber();
	}, []);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<FlatList
				data={users}
				renderItem={({ item }) => (
					<View
						style={{
							height: 50,
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text>User ID: {item.uid}</Text>
						<Text>User Name: {item.displayName}</Text>
					</View>
				)}
			/>
		</View>
	);
}
