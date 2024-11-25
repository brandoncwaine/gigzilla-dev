import { ThemedView as View, ThemedText as Text } from '@/components/common';
import { TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

type GigRequestProps = {
	title: string;
	venue: string;
	date: string;
};

const GigRequest = ({ title, venue, date }: GigRequestProps) => {
	return (
		<TouchableOpacity
			onPress={() => console.log('GigRequest pressed')}
			style={styles.container}
		>
			<ImageBackground
				source={{ uri: 'https://picsum.photos/200' }}
				style={styles.avatar}
			>
				<View style={styles.contentContainer}>
					<Text type="heading" style={styles.venueText}>
						{venue}
					</Text>
					<Text type="subtitle" style={styles.dateText}>
						{date}
					</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		aspectRatio: 1,
		borderRadius: 8,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	contentContainer: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	venueText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
	dateText: {
		fontSize: 14,
		textAlign: 'center',
		color: 'white',
	},
});

export default GigRequest;
