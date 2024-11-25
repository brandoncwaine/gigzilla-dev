import { router } from 'expo-router';
import {
	SafeAreaView,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	View,
} from 'react-native';

import {
	ThemedTextInput as Input,
	ThemedTextButton as TextButton,
} from '@/components/common';
import { useState } from 'react';

const validateEmail = (email: string) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export default function CreateAccount() {
	const [email, setEmail] = useState('testuser@gmail.com');

	const [error, setError] = useState('');

	const onUserAccountCreation = () => {
		// Check if email is valid

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
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				keyboardVerticalOffset={-50}
			>
				<Text style={styles.title}>Create an account.</Text>
				<Text style={styles.heading}>Let's get started by getting your email</Text>
				{error && <Text style={styles.error}>{error}</Text>}
				<Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
				<TextButton text="Next" onPress={onUserAccountCreation} />
			</KeyboardAvoidingView>
			<View style={styles.signupContainer}>
				<Text style={styles.heading}>Already have an account?</Text>
				<Text onPress={() => router.push('/auth')} style={styles.link}>
					Sign in
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 12,
	},
	logo: {
		alignSelf: 'center',
		objectFit: 'contain',
		width: 250,
		height: 250,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginTop: 24,
	},
	heading: {
		fontSize: 16,
		marginTop: 6,
		marginBottom: 12,
	},

	signupContainer: {
		alignItems: 'center',
	},
	link: {
		fontSize: 16,
		color: 'blue',
	},
	resetPasswordLink: {
		fontSize: 16,
		color: '#666',
		marginTop: 24,
		textAlign: 'center',
	},
	error: {
		color: 'red',
		fontSize: 16,
	},
});
