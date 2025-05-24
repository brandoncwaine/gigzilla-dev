import { router, useLocalSearchParams } from 'expo-router';
import {
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from 'react-native';

import { View, Text, TextInput, TextButton } from '@/components/themed';
import { useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { UploadImage } from '@/utils/UploadImage';

const DEFAULT_AVATAR = '/assets/images/default-avatar.png';

export default function CreateAccount() {
	const firestore = getFirestore();

	const [downloadURL, setDownloadURL] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const {
		email,
		type,
		category,
		name,
	}: {
		email: string;
		type: string;
		category: string;
		name: string;
	} = useLocalSearchParams();

	const onUserAccountCreation = async () => {
		setLoading(true);

		if (password !== passwordConfirmation) {
			setError('*Passwords do not match.');
			setLoading(false);
			return;
		}

		try {
			const userCredential = await auth()
				.createUserWithEmailAndPassword(email, password)
				.catch((error) => {
					if (error.code === 'auth/email-already-in-use') {
						setError('*Email already in use.');
					} else if (error.code === 'auth/invalid-email') {
						setError('*Invalid email.');
					} else if (error.code === 'auth/operation-not-allowed') {
						setError('*Operation not allowed.');
					} else if (error.code === 'auth/network-request-failed') {
						setError('*We cannot get connected to the internet, please try again.');
					} else if (error.code === 'auth/weak-password') {
						setError('*Password is too weak.');
					} else {
						setError('*Unknown error occurred.');
						Alert.alert('Something went wrong', error.message);
						console.warn(error);
					}
					setLoading(false);
					return null;
				});

			if (!userCredential || !userCredential.user) return;

			const userId = userCredential.user.uid;

			// Create Firestore user and upload image simultaneously
			await Promise.all([
				firestore
					.collection('users')
					.doc(userId)
					.set({
						name: name,
						type: type,
						category: category || 'null',
						photoURL: downloadURL,
						gigsPlayed: 0,
						gigFee: 0,
						zillaScore: 100,
						createdAt: new Date(),
					}),
			]).catch((error) => {
				console.error(error);
				setError('Something went wrong.');
				return;
			});

			// Navigate only after all operations are completed
			router.replace('/');
		} catch (error) {
			console.error(error);
			setError('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				keyboardVerticalOffset={-50}
			>
				<Text style={styles.title}>Just one more thing.</Text>
				<Text style={styles.heading}>Let's set a password for your account.</Text>
				<Text style={styles.error}>{error}</Text>
				<TextInput
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
				<TextInput
					placeholder="Confirm Password"
					onChangeText={(text) => setPasswordConfirmation(text)}
					secureTextEntry
				/>
				<TextButton onPress={onUserAccountCreation} disabled={loading}>
					{loading ? <ActivityIndicator color={'#fff'} /> : 'Create account'}
				</TextButton>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 12,
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
		fontSize: 14,
		color: 'red',
		marginTop: 6,
	},
});
