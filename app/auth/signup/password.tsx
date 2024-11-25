import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
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

	const [downloadURL, setDownloadURL] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [accountCreationSuccessful, setAccountCreationSuccessful] =
		useState(false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const {
		email,
		type,
		category,
		name,
		userImage,
	}: {
		email: string;
		type: string;
		category: string;
		name: string;
		userImage: string;
	} = useLocalSearchParams();

	const onUserAccountCreation = () => {
		setLoading(true);

		const userImageRef = `users/${auth().currentUser?.uid}/profile.jpg`;

		console.log(userImage);

		auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				firestore
					.collection('users')
					.doc(user.user.uid)
					.set({
						name: name,
						type: type,
						category: category ? category : 'null',
						photoURL: downloadURL,
						createdAt: new Date(),
					})
					.catch((error) => {
						console.log(error);
						setError(error);
						return;
					});
				router.replace('/');
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
function manipulateAsync(
	localUri: any,
	arg1: never[],
	arg2: { compress: number; format: any; base64: boolean }
) {
	throw new Error('Function not implemented.');
}
