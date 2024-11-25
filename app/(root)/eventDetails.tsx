import { StyleSheet, Image } from 'react-native';
import {
	ThemedText as Text,
	ThemedTextButton,
	ThemedView as View,
} from '@/components/common';
import { useLocalSearchParams } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const eventDetails = () => {
	const { id, venueName, date, time, image } = useLocalSearchParams();
	return (
		<View style={styles.container}>
			<ParallaxScrollView
				headerImage={image}
				headerTitle={`Your booking for ${venueName} on ${date} at ${time}`}
				headerBackgroundColor={{
					dark: '#000',
					light: '#fff',
				}}
			>
				<Text style={styles.header}>{venueName}</Text>
				<Text style={styles.header}>{date}</Text>
				<Text style={styles.header}>{time}</Text>
				<ThemedTextButton text="Contact Venue" onPress={() => {}} />
				<ThemedTextButton text="Cancel Booking" onPress={() => {}} />
			</ParallaxScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 18,
		color: '#555',
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
