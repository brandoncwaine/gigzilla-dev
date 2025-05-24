import { useCallback, useMemo, useState } from 'react';
import { View, Text } from '@/components/themed';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const TODAYS_DATE = new Date().toISOString().split('T')[0];

export default function NewGigScreen() {
	const artistUid = useLocalSearchParams().artistUid as string;
	const [selected, setSelected] = useState(TODAYS_DATE);
	const [date, setDate] = useState<string>(TODAYS_DATE);
	const [time, setTime] = useState<Date>(new Date());

	const getDate = (count: number) => {
		const date = new Date(TODAYS_DATE);
		const newDate = date.setDate(date.getDate() + count);
		return CalendarUtils.getCalendarDateString(newDate);
	};

	function onRequestGig() {
		firestore()
			.collection('gigRequests')
			.doc()
			.set({
				sender: auth().currentUser?.uid,
				artist: artistUid,
				requestedDate: date,
				timestamp: new Date().toISOString(),
			})
			.then(() => {
				Alert.alert('Gig request sent!');
				router.dismiss();
			})
			.catch((error) => {
				console.log(error);
				Alert.alert('Something went wrong!', error.message);
			});
	}

	const onDayPress = useCallback((day) => {
		setSelected(day.dateString);
	}, []);

	const marked = useMemo(() => {
		return {
			[selected]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: '#0a7ea4',
				selectedTextColor: '#fff',
			},
		};
	}, [selected]);

	return (
		<View style={styles.container}>
			<View style={styles.calendarContainer}>
				<Text type="defaultSemiBold">Select a date for the gig</Text>
				<Calendar
					enableSwipeMonths
					allowSelectionOutOfRange={false}
					minDate={TODAYS_DATE}
					maxDate={getDate(90)}
					current={TODAYS_DATE}
					onDayPress={onDayPress}
					markedDates={marked}
				/>
				<Text type="defaultSemiBold">Select a time for the gig</Text>
				<RNDateTimePicker
					mode="time"
					value={time}
					minuteInterval={5}
					style={{ alignSelf: 'flex-start' }}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={onRequestGig}>
				<Text style={styles.buttonText}>Send request</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 16,
		paddingBottom: 24,
		gap: 24,
	},
	calendarContainer: {
		flexDirection: 'column',
		gap: 24,
	},
	calendar: {
		width: '100%',
	},
	button: {
		backgroundColor: '#1E1E1E',
		padding: 12,
		borderRadius: 8,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
