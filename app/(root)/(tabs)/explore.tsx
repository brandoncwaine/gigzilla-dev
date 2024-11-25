import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ArtistProfileCard } from '@/components/cards';

const ExploreScreen = () => {
	const [artists, setArtists] = useState<any | null>([]);

	useEffect(() => {
		firestore()
			.collection('users')
			.where('type', '==', 'artist')
			.get()
			.then((querySnapshot) => {
				const artists = querySnapshot.docs.map((doc) => {
					return {
						uid: doc.id,
						name: doc.data()?.name,
						category: doc.data()?.category,
					};
				});
				setArtists(artists);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={artists}
				keyExtractor={(item) => item.uid.toString()}
				renderItem={({ item }) => (
					<ArtistProfileCard
						uid={item.id}
						name={item.name}
						category={item.category}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
});

export default ExploreScreen;
