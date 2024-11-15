import { router, useLocalSearchParams } from 'expo-router';
import {
	SafeAreaView,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	Platform,
} from 'react-native';

import {
	ThemedTextInput as Input,
	ThemedTextButton as TextButton,
} from '@/components/common';
import { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function CreateAccount() {
	const firestore = getFirestore();
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const {
		email,
		type,
		category,
		name,
		imageURI,
	}: {
		email: string;
		type: string;
		category: string;
		name: string;
		imageURI: string;
	} = useLocalSearchParams();

	const onUserAccountCreation = async () => {
		setLoading(true);

		const userImageRef = storage().ref(
			`users/${auth().currentUser?.uid}/profile.jpg`
		);

		const uploadURI =
			Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI;

		await auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				firestore
					.collection('users')
					.doc(auth().currentUser?.uid)
					.set({
						name: name,
						type: type,
						category: category,
						photoURL: imageURI,
						createdAt: new Date(),
					})
					.catch((error) => {
						console.log(error);
						setError(error);
						return;
					});

				router.replace('/');
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});

		setLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				keyboardVerticalOffset={-50}
			>
				<Text style={styles.title}>Just one more thing.</Text>
				<Text style={styles.heading}>Let's set a password for your account.</Text>
				{error && <Text>{error}</Text>}
				<Input
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
				<Input
					placeholder="Confirm Password"
					onChangeText={(text) => setPasswordConfirmation(text)}
					secureTextEntry
				/>

				<TextButton
					text="Create account"
					onPress={onUserAccountCreation}
					disabled={loading}
				/>
			</KeyboardAvoidingView>
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
});
