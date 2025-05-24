import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { View, Text } from '@/components/themed';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
	const todaysDate = new Date().toISOString().split('T')[0];
	const [selectedDate, setSelectedDate] = useState({
		[todaysDate]: {
			selected: true,
		},
	});
	const [availability, setAvailability] = useState({});

	// Select a date
	const onDayPress = (day: any) => {
		setSelectedDate({
			[day.dateString]: {
				selected: true,
			},
		});
	};

	const toggleAvailability = () => {
		setAvailability((prev) => {
			return {
				...prev,
				selectedDate,
			};
		});
	};

	useEffect(() => {
		// Get availability for selected dates
		console.log(availability);
	}, [availability]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Artist Availability Calendar</Text>
			<Calendar
				markedDates={selectedDate}
				onDayPress={onDayPress}
				disabledByDefault={true}
			/>
			<View style={styles.buttonContainer}>
				<Button title={'Set'} onPress={() => toggleAvailability()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
	buttonContainer: { marginTop: 20 },
});
