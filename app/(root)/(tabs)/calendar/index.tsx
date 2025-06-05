import React, { useState, useMemo, useEffect } from 'react';
import { Alert, StyleSheet, useColorScheme } from 'react-native';
import { View, TextButton } from '@/components/themed';
import { CalendarList } from 'react-native-calendars';
import { getFirestore } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarScreen() {
	const db = getFirestore();
	const todaysDate = new Date().toISOString().split('T')[0];
	const [selectedDate, setSelectedDate] = useState(todaysDate);
	const [availability, setAvailability] = useState<{ [key: string]: boolean }>(
		{}
	);

	const applyChanges = () => {
		// Send to firestore
		db
			.collection('users')
			.doc(getAuth().currentUser?.uid)
			.update({
				avaliableDates: availability,
			})
			.catch((e) => {
				console.log(e);
				Alert.alert(
					'Something went wrong',
					'Could not save changes, please try again.'
				);
			});
	};

	const getAvaliableDates = () => {
		db
			.collection('users')
			.doc(getAuth().currentUser?.uid)
			.get()
			.then((doc) => {
				if (doc.exists && doc.data()) {
					if (doc.data()!.avaliableDates) {
						const avaliableDates = doc.data()!.avaliableDates;
						setAvailability(avaliableDates);
					}
				}
			});
	};

	// Handles date selection
	const onDayPress = (day: any) => {
		setSelectedDate(day.dateString);
	};

	// Toggles availability for the selected date
	const toggleAvailability = () => {
		if (selectedDate) {
			setAvailability((prev) => ({
				...prev,
				[selectedDate]: !prev[selectedDate],
			}));
		}
	};

	// Dynamically generate markedDates for visible range
	const markedDates = useMemo(() => {
		const marks: any = {};

		// Create markings for +/- 60 days around today
		const date = new Date();
		for (let offset = -60; offset <= 120; offset++) {
			const d = new Date(date);
			d.setDate(d.getDate() + offset);
			const dateStr = d.toISOString().split('T')[0];

			const isAvailable = availability[dateStr] === true;
			const isSelected = selectedDate === dateStr;

			marks[dateStr] = {
				customStyles: {
					container: {
						backgroundColor: isSelected ? '#ccc' : 'white',
					},
					text: {
						color: isAvailable ? 'black' : isSelected ? '#888' : '#ccc',
					},
				},
			};
		}

		return marks;
	}, [availability, selectedDate]);

	useEffect(() => {
		getAvaliableDates();
	}, []);

	return (
		<View style={styles.container}>
			<CalendarList
				firstDay={1}
				pastScrollRange={1}
				futureScrollRange={4}
				onDayPress={onDayPress}
				markingType="custom"
				markedDates={markedDates}
			/>
			<View style={styles.buttonContainer}>
				<TextButton onPress={toggleAvailability}>
					{availability[selectedDate] ? 'Mark as unavaliable' : 'Mark as avaliable'}
				</TextButton>
				<TextButton onPress={applyChanges}>
					<Ionicons name="save" color={'white'} size={12} />
					Save changes
				</TextButton>
				<View style={styles.calendarEventContainer}></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		padding: 12,
		gap: 12,
	},
	calendarEventContainer: {
		height: 100,
	},
});
