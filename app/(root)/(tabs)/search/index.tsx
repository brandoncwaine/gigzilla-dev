import { StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from '@react-native-firebase/firestore';

import { Text } from '@/components/themed';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';
import ArtistProfileCard from '@/components/cards/ArtistProfileCard';
import PlannerProfileCard from '@/components/cards/PlannerProfileCard';

const SearchScreen = () => {
	const currentUserData = useCurrentUserData();
	const isUserPlanner = currentUserData?.type == 'planner';

	const [users, setUsers] = useState<any | null>([]);

	useEffect(() => {
		const db = getFirestore();
		const q = query(
			collection(db, 'users'),
			where('type', '==', isUserPlanner ? 'artist' : 'planner')
		);

		getDocs(q)
			.then((querySnapshot) => {
				const users = querySnapshot.docs.map((doc) => {
					console.log('User:', doc.data());
					return {
						uid: doc.id,
						name: doc.data()?.name,
					};
				});
				setUsers(users);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	}, []);

	const buttonColor = useThemeColor(
		{ light: '#ddd', dark: '#111' },
		'secondaryButtonBackground'
	);

	return (
		<FlatList
			data={users}
			ListHeaderComponentStyle={{}}
			ListHeaderComponent={
				<TouchableOpacity
					onPress={() => router.push('/(root)/(modals)/searchfilter')}
					style={[{ backgroundColor: buttonColor }, styles.searchButton]}
				>
					<Text style={styles.searchButtonText}>Search</Text>
					<Ionicons name="search" size={16} color={'#555'} />
				</TouchableOpacity>
			}
			keyExtractor={(item) => item.uid.toString()}
			contentContainerStyle={styles.listContainer}
			ListEmptyComponent={<Text>No users found.</Text>}
			renderItem={({ item }) =>
				isUserPlanner ? (
					<ArtistProfileCard uid={item.uid} name={item.name} />
				) : (
					<PlannerProfileCard uid={item.uid} name={item.name} />
				)
			}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		padding: 12,
		gap: 12,
	},
	listHeaderContainer: {
		padding: 16,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		padding: 12,
		borderRadius: 8,
		marginBottom: 12,
	},
	searchButtonText: {
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default SearchScreen;
