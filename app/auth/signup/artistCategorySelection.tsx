import {
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { View, Text, TextButton } from '@/components/themed';

const artistCategorySelection = () => {
	const { email, type } = useLocalSearchParams();

	const onButtonPress = (category: string) => {
		router.push({
			pathname: '/auth/signup/details',
			params: {
				email: email,
				type: type,
				category: category,
			},
		});
	};

	return (
		<View style={styles.container}>
			<Text type="heading">What type of artist are you?</Text>
			<TextButton onPress={() => onButtonPress('band')}>Band</TextButton>
			<TextButton onPress={() => onButtonPress('solo')}>Solo Artist</TextButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingHorizontal: 12,
		gap: 48,
	},
	artistCategoryButton: {
		backgroundColor: '#fafafa',
		padding: 16,
		marginVertical: 6,
		borderRadius: 4,
	},
	artistCategoryButtonText: {
		fontSize: 14,
	},
});

export default artistCategorySelection;
