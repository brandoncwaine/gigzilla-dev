import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
	zillaScore: number;
	gigsPlayed: number;
	gigFee: number;
}

const StatsCard = ({ zillaScore, gigsPlayed, gigFee }: StatsCardProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreValue}>{zillaScore}%</Text>
				<Text style={styles.scoreLabel}>Zilla Score</Text>
			</View>
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreValue}>{gigsPlayed}</Text>
				<Text style={styles.scoreLabel}>Gigs Played</Text>
			</View>
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreValue}>£{gigFee}</Text>
				<Text style={styles.scoreLabel}>Gig Fee</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#fafafa',
		padding: 24,
		borderRadius: 8,
	},
	scoreContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 6,
	},
	scoreValue: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	scoreLabel: {
		fontSize: 12,
		color: '#666',
	},
});

export default StatsCard;
