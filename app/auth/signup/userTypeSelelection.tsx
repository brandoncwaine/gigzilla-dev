import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { UserAccountType } from '@/types/UserAccountType';
import { router, useLocalSearchParams } from 'expo-router';

import {
	ThemedTextInput as Input,
	ThemedTextButton as TextButton,
} from '@/components/common';

const userTypeSelelection = () => {
	const { email } = useLocalSearchParams();

	const onButtonPress = (type: UserAccountType) => {
		if (type === UserAccountType.Artist) {
			router.push({
				pathname: '/auth/signup/artistCategorySelection',
				params: {
					email: email,
					type: type,
				},
			});
			return;
		} else if (type === UserAccountType.Planner) {
			router.push({
				pathname: '/auth/signup/details',
				params: {
					email: email,
					type: type,
				},
			});
			return;
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>What are you?</Text>
			<View style={styles.userTypeButton}>
				<View>
					<Text style={styles.typeText}>Artist</Text>
					<Text style={styles.bulletpoint}>- Band</Text>
					<Text style={styles.bulletpoint}>- Musician</Text>
					<Text style={styles.bulletpoint}>- Magician</Text>
					<Text style={styles.bulletpoint}>- Comedian</Text>
				</View>
				<TextButton
					text="I'm an artist"
					onPress={() => onButtonPress(UserAccountType.Artist)}
				/>
			</View>
			<View style={styles.userTypeButton}>
				<View>
					<Text style={styles.typeText}>Planner</Text>
					<Text style={styles.bulletpoint}>- Pubs</Text>
					<Text style={styles.bulletpoint}>- Venue</Text>
					<Text style={styles.bulletpoint}>- Bars</Text>
				</View>
				<TextButton
					text="I'm a planner"
					onPress={() => onButtonPress(UserAccountType.Planner)}
				/>
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
	heading: {
		fontSize: 22,
		color: '#666',
	},
	typeText: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#222',
	},
	userTypeButton: {
		flex: 1 / 2,
		margin: 12,
		borderRadius: 4,
		padding: 12,
		justifyContent: 'space-between',
	},
	bulletpoint: {
		fontSize: 18,
		marginVertical: 4,
	},
});

export default userTypeSelelection;
