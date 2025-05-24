import {
	ActivityIndicator,
	StyleSheet,
	SafeAreaView,
	RefreshControl,
} from 'react-native';

import { useEffect, useState } from 'react';

import { View, Text, ScrollView } from '@/components/themed';

import { EventCard } from '@/components/cards';
import StatsCard from '@/components/artist/StatsCard';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';

import firestore, { query } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function DashboardScreen() {
	const [upcomingEventId, setUpcomingEventId] = useState<string | null>(null);

	const [loading, setLoading] = useState(false);
	const currentUserData = useCurrentUserData();

	const getUpcomingGig = async () => {
		if (!auth().currentUser) return;

		firestore()
			.collection('gigs')
			.where('artist', '==', auth().currentUser?.uid)
			.limit(1)
			.get()
			.then((querySnapshot) => {
				if (querySnapshot && querySnapshot.docs && querySnapshot.docs.length > 0) {
					setUpcomingEventId(querySnapshot.docs[0].id);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getUpcomingGig();
	}, []);

	if (loading) {
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
						refreshing={loading}
						onRefresh={() => {
							setLoading(true);
							setTimeout(() => {
								setLoading(false);
							}, 1000);
						}}
					/>
				}
			>
				<Text type="heading">Upcoming Events</Text>
				{upcomingEventId !== null ? (
					<EventCard eventId={upcomingEventId} />
				) : (
					<View style={styles.noGigsContainer}>
						<Text type="subheading">No upcoming gigs.</Text>
					</View>
				)}
				<Text type="heading">Your Statistics</Text>
				<StatsCard
					zillaScore={currentUserData?.zillaScore}
					gigsPlayed={currentUserData?.gigsPlayed}
					gigFee={currentUserData?.gigFee}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noGigsContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingVertical: 24,
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
