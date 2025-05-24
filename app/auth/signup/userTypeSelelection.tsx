import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { UserAccountType } from '@/types/UserAccountType';
import { router, useLocalSearchParams } from 'expo-router';

import { View, Text, TextInput, TextButton } from '@/components/themed';

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
		<View style={styles.container}>
			<Text type="title">What describes you?</Text>
			<View style={styles.userTypeButton}>
				<View>
					<Text type="heading">Artist</Text>
					<Text style={styles.bulletpoint}>- Band</Text>
					<Text style={styles.bulletpoint}>- Musician</Text>
					<Text style={styles.bulletpoint}>- Magician</Text>
					<Text style={styles.bulletpoint}>- Comedian</Text>
				</View>
				<TextButton onPress={() => onButtonPress(UserAccountType.Artist)}>
					I'm an artist
				</TextButton>
			</View>
			<View style={styles.userTypeButton}>
				<View>
					<Text type="heading">Planner</Text>
					<Text style={styles.bulletpoint}>- Pubs</Text>
					<Text style={styles.bulletpoint}>- Venue</Text>
					<Text style={styles.bulletpoint}>- Bars</Text>
				</View>
				<TextButton onPress={() => onButtonPress(UserAccountType.Planner)}>
					I'm a planner
				</TextButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 48,
	},
	typeText: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#222',
	},
	userTypeButton: {
		flex: 1 / 2,
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
