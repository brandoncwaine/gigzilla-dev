import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';

import {
	getFirestore,
	query,
	collection,
	getDocs,
	where,
} from '@react-native-firebase/firestore';

import ArtistProfileCard from '@/components/cards/ArtistProfileCard';

export default function SearchResults() {
	const [users, setUsers] = useState<any | null>([]);

	const currentUserData = useCurrentUserData();
	const searchParams = useLocalSearchParams();

	useEffect(() => {
		async () => {
			let isUserPlanner = currentUserData?.type == 'planner';
			const db = getFirestore();
			const q = query(
				collection(db, 'users'),
				where('type', '==', isUserPlanner ? 'artist' : 'planner'),
				where('gigFee', '<=', searchParams?.maxFee || 1000)
			);

			await getDocs(q)
				.then((querySnapshot) => {
					const users = querySnapshot.docs.map((doc) => {
						return {
							uid: doc.id,
							name: doc.data()?.name,
							category: doc.data()?.category,
						};
					});
					setUsers(users);
				})
				.catch((error) => {
					console.error('Error fetching users:', error);
				});
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={users}
				ListHeaderComponentStyle={{}}
				ListHeaderComponent={<Text>Search results</Text>}
				keyExtractor={(item) => item.uid.toString()}
				contentContainerStyle={styles.listContainer}
				ListEmptyComponent={<Text>No users found.</Text>}
				renderItem={({ item }) => (
					<ArtistProfileCard
						uid={item.uid}
						name={item.name}
						category={item.category}
					/>
				)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		padding: 16,
	},
});
