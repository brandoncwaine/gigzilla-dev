import {
	TouchableOpacity,
	ImageBackground,
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { router } from 'expo-router';
import { useEventDetails } from '@/hooks/useEventDetails';

type EventCardProps = {
	eventId: string;
};

const EventCard = ({ eventId }: EventCardProps) => {
	const eventDetails = useEventDetails({ eventId: eventId });

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: '/gigDetails',
					params: {
						eventId: eventId,
					},
				})
			}
		>
			<ImageBackground
				style={styles.upcomingEventsContainer}
				source={{
					uri: eventDetails?.data?.photoURL,
				}}
			>
				<View style={styles.upcomingEventsInnerContainer}>
					<Text style={styles.venueName}>{eventDetails?.data?.name}</Text>
					<Text style={styles.eventDate}>{eventDetails?.requestedDate}</Text>
					<Text style={styles.eventTime}>7:00 PM</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	upcomingEventsContainer: {
		overflow: 'hidden',
		borderRadius: 6,
		height: 250,
	},
	upcomingEventsInnerContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.5)',
	},
	userCategory: {
		fontSize: 16,
		color: '#666',
		marginBottom: 12,
	},
	venueName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
	eventDate: {
		color: '#fff',
		fontSize: 16,
	},
	eventTime: {
		color: '#fff',
		fontSize: 14,
	},
});

export default EventCard;
