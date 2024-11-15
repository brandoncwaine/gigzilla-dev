import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

const artistCompleteCreation = () => {
	const [selectedMusicianType, setSelectedMusicianType] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Great, almost done.</Text>
			<View style={styles.section}>
				<Text style={styles.label}> Are you a solo musician or a band? </Text>
				<View style={styles.buttonRow}>
					<TouchableOpacity
						onPress={() => setSelectedMusicianType('solo')}
						style={[
							styles.button,
							{ backgroundColor: selectedMusicianType === 'solo' ? '#fff' : '#000' },
						]}
					>
						<Text style={styles.buttonText}>Solo musician</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setSelectedMusicianType('band')}
						style={[
							styles.button,
							{ backgroundColor: selectedMusicianType === 'solo' ? '#fff' : '#000' },
						]}
					>
						<Text style={styles.buttonText}>Band</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setSelectedMusicianType('dj')}
						style={[
							styles.button,
							{ backgroundColor: selectedMusicianType === 'solo' ? '#fff' : '#000' },
						]}
					>
						<Text style={styles.buttonText}>DJ</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.divider} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 28,
		padding: 12,
		fontWeight: 'bold',
	},
	section: {
		marginHorizontal: 12,
	},
	divider: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	label: {
		fontSize: 16,
		color: '#222',
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 24,
	},
	button: {
		width: 120,
		padding: 12,
		borderRadius: 4,
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
});

export default artistCompleteCreation;
