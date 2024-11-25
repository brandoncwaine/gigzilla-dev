import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

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
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Text style={styles.title}>What type of artist are you?</Text>
				<TouchableOpacity
					style={styles.artistCategoryButton}
					onPress={() => onButtonPress('band')}
				>
					<Text style={styles.artistCategoryButtonText}>Band</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.artistCategoryButton}
					onPress={() => onButtonPress('solo')}
				>
					<Text style={styles.artistCategoryButtonText}>Solo Artist</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 12,
	},
	title: {
		fontSize: 28,
		padding: 12,
		fontWeight: 'bold',
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
