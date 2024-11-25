import {
	TouchableOpacity,
	ImageBackground,
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { router } from 'expo-router';

const EventCard = () => {
	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: '/(root)/eventDetails',
					params: {
						id: '1',
						venueName: 'Bear Cave',
						date: 'Saturday 10/12/2024',
						time: '7:00 PM',
						image:
							'https://distortedsoundmag.com/wp-content/uploads/2023/05/devplacephotos_heriot-27-800x445.jpg',
					},
				})
			}
		>
			<ImageBackground
				style={styles.upcomingEventsContainer}
				source={{
					uri: 'https://distortedsoundmag.com/wp-content/uploads/2023/05/devplacephotos_heriot-27-800x445.jpg',
				}}
			>
				<View style={styles.upcomingEventsInnerContainer}>
					<Text style={styles.venueName}>Bear Cave</Text>
					<Text style={styles.eventDate}>Saturday 10/12/2024</Text>
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
