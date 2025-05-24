import React, { useState } from 'react';
import { Text, TextInput, TextButton } from '@/components/themed';

import {
	View,
	TouchableOpacity,
	Switch,
	ScrollView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';

const ArtistFilterModal = () => {
	const [location, setLocation] = useState('');
	const [headliner, setHeadliner] = useState(false);
	const [genre, setGenre] = useState('');
	const [equipment, setEquipment] = useState('');
	const [is18Plus, setIs18Plus] = useState(false);
	const [maxFee, setMaxFee] = useState(50);
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [showCalendar, setShowCalendar] = useState(false);
	const [artistSize, setArtistSize] = useState('');
	const [paymentType, setPaymentType] = useState('');

	const onSearchSubmit = () => {
		router.dismiss();
		router.push({
			pathname: '/(root)/(tabs)/search/results',
			params: {
				location: location,
				equipment: equipment,
				headliner: headliner ? 'headliner' : 'supporting',
				genre: genre,
				is18Plus: is18Plus ? 'true' : 'false',
				maxFee: maxFee,
				date: calendarDate ? calendarDate.toISOString() : '',
				artistSize: artistSize,
				paymentType: paymentType,
			},
		});
	};

	const handleDateChange = (event: any, selectedDate: any) => {
		setShowCalendar(Platform.OS === 'ios');
		if (selectedDate) {
			setCalendarDate(selectedDate);
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text type="heading">Search</Text>

				<TextInput
					placeholder="Location"
					value={location}
					onChangeText={setLocation}
				/>

				<View style={styles.iconButtonGroup}>
					<TouchableOpacity
						onPress={() => setHeadliner(true)}
						style={[
							styles.iconButton,
							{ backgroundColor: headliner ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="musical-notes" size={24} color={'#222'} />
						<Text>Headliner</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setHeadliner(false)}
						style={[
							styles.iconButton,
							{ backgroundColor: headliner ? undefined : '#ccc' },
						]}
					>
						<Ionicons name="musical-note" size={24} color={'#222'} />
						<Text>Supporting Act</Text>
					</TouchableOpacity>
				</View>

				<TextInput
					placeholder="Genre/Sub Genre"
					value={genre}
					onChangeText={setGenre}
				/>

				<View style={styles.switchRow}>
					<Text>18+ Only</Text>
					<Switch value={is18Plus} onValueChange={setIs18Plus} />
				</View>

				<Text type="defaultSemiBold">Max Fee: £{maxFee}</Text>

				<Slider
					style={{}}
					minimumValue={50}
					maximumValue={500}
					minimumTrackTintColor="#FFFFFF"
					maximumTrackTintColor="#000000"
					onValueChange={(value) => setMaxFee(value)}
					step={50}
				/>

				{showCalendar && (
					<DateTimePicker
						value={calendarDate}
						mode="date"
						display="default"
						onChange={handleDateChange}
					/>
				)}

				<Text>Artist size</Text>
				<View style={styles.iconButtonGroup}>
					<TouchableOpacity
						onPress={() => setArtistSize('1')}
						style={[
							styles.iconButton,
							{ backgroundColor: artistSize === '1' ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="person" size={24} color={'#222'} />
						<Text>1</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setArtistSize('2-4')}
						style={[
							styles.iconButton,
							{ backgroundColor: artistSize === '2-4' ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="people" size={24} color={'#222'} />
						<Text>2-4</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setArtistSize('4+')}
						style={[
							styles.iconButton,
							{ backgroundColor: artistSize === '4+' ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="people" size={24} color={'#222'} />
						<Text>4+</Text>
					</TouchableOpacity>
				</View>

				<Text>Accepted Payment Type</Text>
				<View style={styles.iconButtonGroup}>
					<TouchableOpacity
						onPress={() => setPaymentType('cash')}
						style={[
							styles.iconButton,
							{ backgroundColor: paymentType === 'cash' ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="cash" size={24} color={'#222'} />
						<Text>Cash</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setPaymentType('cash-digital')}
						style={[
							styles.iconButton,
							{ backgroundColor: paymentType === 'cash-digital' ? '#ccc' : undefined },
						]}
					>
						<Ionicons name="card" size={24} color={'#222'} />
						<Text>Cash & Digital</Text>
					</TouchableOpacity>
				</View>

				<TextButton onPress={() => onSearchSubmit()}>Search</TextButton>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		paddingTop: 30,
		paddingBottom: 50,
		gap: 12,
	},

	switchRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	iconButtonGroup: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
	},
	iconButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		borderWidth: 1,
		borderColor: '#ccc',
	},
});

export default ArtistFilterModal;
