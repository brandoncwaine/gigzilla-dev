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

const TEST_DATA_LIST = ['This, That, Thing, Who'];

const ArtistTypeSelection = ({
	type,
	...rest
}: {
	type: string;
	onPress: any;
}) => {
	return (
		<TouchableOpacity style={styles.artistTypeButton} {...rest}>
			<Text>{type}</Text>
		</TouchableOpacity>
	);
};

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
			<Text style={styles.title}>What type of artist are you?</Text>
			<FlatList
				data={TEST_DATA_LIST}
				renderItem={({ item }) => (
					<ArtistTypeSelection type={item} onPress={() => onButtonPress(item)} />
				)}
				keyExtractor={(item) => item.toString()}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	title: {
		fontSize: 28,
		padding: 12,
		fontWeight: 'bold',
	},
	artistTypeButton: {
		backgroundColor: '#ccc',
	},
});

export default artistCategorySelection;
