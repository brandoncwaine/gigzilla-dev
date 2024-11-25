import {
	FlatList,
	ActivityIndicator,
	StyleSheet,
	SafeAreaView,
	RefreshControl,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { useState, useEffect } from 'react';

import {
	ThemedView as View,
	ThemedText as Text,
	ThemedScrollView as ScrollView,
} from '@/components/common';
import { EventCard, ArtistProfileCard } from '@/components/cards';
import StatsCard from '@/components/artist/StatsCard';

export default function Index() {
	const [users, setUsers] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		// Do stuff
	}, []);

	if (refreshing) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="small" color="black" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => {
							setRefreshing(true);
							setTimeout(() => {
								setRefreshing(false);
							}, 1000);
						}}
					/>
				}
			>
				<Text type="heading">Upcoming Events</Text>
				<EventCard />
				<Text type="heading">Your Statistics</Text>
				<StatsCard zillaScore={100} gigsPlayed={12} gigFee={150} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 12,
		gap: 12,
		padding: 16,
	},
	separator: {
		width: 10,
	},
});
