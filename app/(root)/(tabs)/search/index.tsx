import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { View, Text, ScrollView } from '@/components/themed';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getFirestore } from '@react-native-firebase/firestore';
const { width } = Dimensions.get('window');
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import NearbyCard from '@/components/cards/NearbyCard';
import { router } from 'expo-router';
import getCurrentUserData from '@/utils/getCurrentUserData';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';

const SearchScreen = () => {
	const firestore = getFirestore();
	const currentUserData = useCurrentUserData();
	const [nearbyArtists, setNearbyArtists] = useState<any[]>([]);

	const getNearbyArtists = async () => {
		// Fetch nearby artists from firebase
		setNearbyArtists([]); // Reset the state before fetching new data

		firestore
			.collection('users')
			.where(
				'type',
				'==',
				currentUserData?.type == 'artist' ? 'planner' : 'artist'
			) // Assuming you have a category field
			.limit(3) // Limit to 3 artists for performance
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.forEach(async (doc) => {
					const id = doc.id;
					const data = await getUserDataFromUID(id);
					setNearbyArtists((prev) => [
						...prev,
						{
							id: id,
							data: data,
						},
					]);
				});
			})
			.catch((error) => {
				console.error('Error fetching nearby artists: ', error);
			});
	};

	useEffect(() => {
		getNearbyArtists();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
				onPress={() => router.push('/(root)/(modals)/searchfilter')}
				style={styles.searchButton}
			>
				<Ionicons name="search" size={16} color="#000" />
				<Text style={styles.searchButtonText}>
					Search for {currentUserData?.type == 'artist' ? 'venues' : 'artists'}
				</Text>
			</TouchableOpacity>
			<View style={styles.nearbyArtistsContainer}>
				<Text type="default">
					Discover all nearby{' '}
					{currentUserData?.type == 'artist' ? 'venues' : 'artists & bands'}
				</Text>
				<Text type="subtitle" style={{ fontSize: 13, paddingBottom: 8 }}>
					Find artists and bands near you to collaborate with or book for gigs.
				</Text>
				<FlatList
					data={nearbyArtists}
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => {
						return <Text>No venues yet</Text>;
					}}
					renderItem={({ item }) => (
						<NearbyCard
							uid={item.id}
							name={item.data.name}
							gigFee={item.data.gigFee}
							type={item.data.type}
							photoURL={item.data.photoURL}
						/>
					)}
					snapToInterval={width * 0.8}
					decelerationRate="fast"
					horizontal
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	searchButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		padding: 16,
		borderRadius: 8,
		gap: 8,
	},
	searchButtonText: {
		fontSize: 14,
	},
	nearbyArtistsContainer: {
		marginVertical: 16,
		gap: 10,
	},
});

export default SearchScreen;
