import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { View, Text, TextInput, TextButton } from '@/components/themed';
import { useState } from 'react';

export default function Details() {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	const {
		email,
		type,
		category,
	}: { email: string; type: string; category: string } = useLocalSearchParams();

	const onNextPress = () => {
		setLoading(true);
		router.push({
			pathname: '/auth/signup/password',
			params: {
				email: email,
				type: type,
				category: category,
				name: name,
			},
		});
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={-50}
				style={styles.keyboardAvoidingView}
				contentContainerStyle={{ gap: 12 }}
			>
				<Text type="heading">What's your name?</Text>
				<TextInput
					placeholder="your artist or venue name..."
					onChangeText={(text) => setName(text)}
				/>

				<TextButton onPress={onNextPress} disabled={loading}>
					Next
				</TextButton>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
	},
	keyboardAvoidingView: {
		flex: 1,
		justifyContent: 'center',
	},
});
