import React, { useState } from 'react';
import { View, Text } from '@/components/themed';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/constants/Colors';

const genres = ['Rock', 'Metal', 'RnB', 'Pop', 'Jazz', 'Hip-hop'];

export default function ArtistFilter({ onApplyFilters }) {
	const [artistType, setArtistType] = useState('');
	const [maxFee, setMaxFee] = useState('');
	const [selectedGenres, setSelectedGenres] = useState([]);
	const filterHeight = useSharedValue(0);
	const [isExpanded, setIsExpanded] = useState(false);

	const animatedStyle = useAnimatedStyle(() => ({
		height: withTiming(isExpanded ? 300 : 0, { duration: 300 }),
	}));

	const toggleFilters = () => {
		setIsExpanded(!isExpanded);
	};

	const toggleGenre = (genre) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		);
	};

	const applyFilters = () => {
		onApplyFilters({ artistType, maxFee, selectedGenres });
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={toggleFilters}>
				<Text style={styles.buttonText}>
					{isExpanded ? 'Save Filters' : 'Apply Filters'}
				</Text>
			</TouchableOpacity>

			<Animated.View style={[styles.filterContainer, animatedStyle]}>
				<Text type="subheading">Artist Type:</Text>
				<View style={styles.buttonGroup}>
					<TouchableOpacity
						style={[
							styles.optionButton,
							artistType === 'band' && styles.selectedOption,
						]}
						onPress={() => setArtistType('band')}
					>
						<Text
							style={{
								fontSize: 12,
								color: artistType === 'band' ? 'white' : 'black',
							}}
						>
							Band
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.optionButton,
							artistType === 'solo' && styles.selectedOption,
						]}
						onPress={() => setArtistType('solo')}
					>
						<Text
							style={{
								fontSize: 12,
								color: artistType === 'solo' ? 'white' : 'black',
							}}
						>
							Solo Artist
						</Text>
					</TouchableOpacity>
				</View>

				<Text type="subheading">Max Gig Fee (£):</Text>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={maxFee}
					onChangeText={setMaxFee}
					placeholder="Enter amount"
				/>

				<Text type="subheading">Genres:</Text>
				<View style={styles.genreContainer}>
					{genres.map((genre) => (
						<TouchableOpacity
							key={genre}
							onPress={() => toggleGenre(genre)}
							style={[
								styles.chip,
								selectedGenres.includes(genre) && styles.selectedChip,
							]}
						>
							<Text
								type="default"
								style={{
									fontSize: 12,
									color: selectedGenres.includes(genre) ? 'white' : 'black',
								}}
							>
								{genre}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</Animated.View>
			<View style={styles.activeFiltersContainer}>
				{artistType ? (
					<Text style={styles.activeFilter}>Artist: {artistType}</Text>
				) : null}
				{maxFee ? (
					<Text style={styles.activeFilter}>Max Fee: £{maxFee}</Text>
				) : null}
				{selectedGenres.length > 0 ? (
					<Text style={styles.activeFilter}>
						Genres: {selectedGenres.join(', ')}
					</Text>
				) : null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		borderRadius: 8,
		marginBottom: 10,
	},
	filterContainer: {
		overflow: 'hidden',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 8,
		marginVertical: 8,
	},
	button: {
		backgroundColor: Colors.light.tint,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		marginVertical: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
		gap: 8,
	},
	optionButton: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.light.tint,
		borderRadius: 5,
		flex: 1,
		alignItems: 'center',
	},
	selectedOption: {
		backgroundColor: Colors.light.tint,
	},
	genreContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginVertical: 10,
	},
	chip: {
		padding: 10,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: Colors.light.tint,
		borderRadius: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	selectedChip: {
		backgroundColor: Colors.light.tint,
	},
	activeFiltersContainer: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	activeFilter: {
		fontSize: 12,
		color: '#222',
	},
});
