import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { View, Text, TextInput, TextButton } from '@/components/themed';
import { useState } from 'react';

const validateEmail = (email: string) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export default function CreateAccount() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const onUserAccountCreation = () => {
		// Check if email is valid

		if (email === '') {
			setError('Please enter an email address');
			return;
		}

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		router.push({
			pathname: '/auth/signup/userTypeSelelection',
			params: {
				email: email,
			},
		});
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				contentContainerStyle={{ gap: 12 }}
				keyboardVerticalOffset={-50}
			>
				<Text type="title">Create an account.</Text>
				<Text type="heading">Let's get started by getting your email</Text>
				{error && <Text style={styles.error}>{error}</Text>}
				<TextInput
					placeholder="Email"
					onChangeText={(text) => setEmail(text)}
					autoCapitalize="none"
					textContentType="emailAddress"
				/>
				<TextButton onPress={onUserAccountCreation}>Next</TextButton>
			</KeyboardAvoidingView>
			<View style={styles.signupContainer}>
				<Text type="default">Already have an account?</Text>
				<Text onPress={() => router.push('/auth')} type="default">
					Sign in
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 12,
		paddingBottom: 48,
	},
	logo: {
		alignSelf: 'center',
		objectFit: 'contain',
		width: 250,
		height: 250,
	},
	signupContainer: {
		alignItems: 'center',
	},
	error: {
		color: 'red',
		fontSize: 16,
	},
});
