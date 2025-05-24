import { StyleSheet } from 'react-native';
import { Text, TextButton, View } from '@/components/themed';
import { Stack, useLocalSearchParams } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEventDetails } from '@/hooks/useEventDetails';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const ParralaxOverlay = ({ eventDetails }: { eventDetails: any }) => {
	return (
		<View style={styles.overlay}>
			<Text style={styles.title}>{eventDetails.data?.name}</Text>
			<View style={styles.infoRow}>
				<View style={styles.infoRow}>
					<Ionicons name="calendar" size={16} color="#fff" />
					<Text style={styles.subheading}>{eventDetails.requestedDate}</Text>
				</View>
				<MaterialCommunityIcons name="circle" size={4} color="#fff" />
				<View style={styles.infoRow}>
					<Ionicons name="map" size={16} color="#fff" />
					<Text style={styles.subheading}>123 Test Road, Test City</Text>
				</View>
			</View>
		</View>
	);
};

const eventDetails = () => {
	const { eventId } = useLocalSearchParams();
	const eventDetails = useEventDetails({ eventId: eventId as string });

	return (
		<ParallaxScrollView
			headerImage={eventDetails.data?.photoURL}
			overlay={<ParralaxOverlay eventDetails={eventDetails} />}
			headerBackgroundColor={{
				dark: '#000',
				light: '#fff',
			}}
		>
			<Text type="defaultSemiBold">Venue Information</Text>
			<Text type="default">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quo veniam
				reprehenderit omnis veritatis ab aliquam labore eius saepe eaque quibusdam
				id aut, animi nesciunt! Tempore deserunt at quas expedita.
			</Text>
			<Text type="defaultSemiBold">Gig Information</Text>
			<Text type="default">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, vel
				illum numquam rerum perferendis vero enim eaque error fugiat, inventore
				nobis dolore distinctio porro quaerat quam aperiam ipsam quidem dolorem.
			</Text>
			<Text type="defaultSemiBold">Venue Setup</Text>
			<Image
				source={require('@/assets/images/venuekit.png')}
				style={styles.image}
			/>
			<TextButton>Contact Venue</TextButton>
			<TextButton>Request Cancellation</TextButton>
			<Text type="link" onPress={() => {}}>
				Report an issue
			</Text>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 18,
		color: '#555',
	},
	overlay: {
		width: '100%',
		padding: 12,
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
	subheading: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		fontSize: 16,
		color: '#fff',
	},
	upcomingEventsContainer: {
		overflow: 'hidden',
		borderRadius: 6,
		height: 250,
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
	},
});

export default eventDetails;
