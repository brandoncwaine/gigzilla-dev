import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { ThemedText as Text, ThemedView as View } from '@/components/common';

import auth from '@react-native-firebase/auth';

const Profile = () => {
	const signOut = () => {
		auth().signOut();
	};

	return (
		<ParallaxScrollView
			headerImage={'https://picsum.photos/id/10/2000/1000'}
			headerBackgroundColor={{
				dark: '#000',
				light: '#fff',
			}}
		>
			<View style={styles.introContainer}>
				<Text style={styles.artistGenres}>pop / rock / cover songs</Text>
				<Text style={styles.artistDetails}>Headliner and supporting act</Text>
				<View style={styles.artistStats}>
					<View style={styles.scoreContainer}>
						<Text style={styles.scoreValue}>100%</Text>
						<Text style={styles.scoreLabel}>Zilla Score</Text>
					</View>
					<View style={styles.scoreContainer}>
						<Text style={styles.scoreValue}>12</Text>
						<Text style={styles.scoreLabel}>Gigs Played</Text>
					</View>
					<View style={styles.scoreContainer}>
						<Text style={styles.scoreValue}>£150</Text>
						<Text style={styles.scoreLabel}>Gig Fee</Text>
					</View>
				</View>
			</View>
			<Text style={styles.header}>About us</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text style={styles.header}>Our artists</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text style={styles.header}>Reviews</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text onPress={signOut}>Sign out</Text>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	introContainer: {},
	artistName: {
		fontSize: 26,
		fontWeight: 'bold',
	},
	artistGenres: {
		fontSize: 14,
		color: '#666',
	},
	artistDetails: {
		fontSize: 14,
		color: '#666',
	},
	artistStats: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#fafafa',
		padding: 24,
		borderRadius: 8,
		marginVertical: 24,
	},
	scoreContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 6,
	},
	scoreValue: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
	},
	scoreLabel: {
		fontSize: 12,
		color: '#666',
		marginLeft: 4,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	paragraph: {
		fontSize: 16,
		color: '#666',
		marginBottom: 12,
	},
});

export default Profile;
