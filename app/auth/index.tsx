import { router } from 'expo-router';
import {
	SafeAreaView,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from 'react-native';

import { ThemedTextInput as Input } from '@/components/common';
import { useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function SignInScreen() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignIn = async () => {
		setLoading(true);

		try {
			await auth()
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					router.push('/(root)/(tabs)/');
				});
		} catch (error: any) {
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				keyboardVerticalOffset={-50}
			>
				<Image source={require('@/assets/images/logo.png')} style={styles.logo} />
				<Text style={styles.title}>Welcome.</Text>
				<Text style={styles.heading}>Already got an account? Log in below.</Text>
				<Text style={styles.error}>{error}</Text>
				<Input
					placeholder="Email"
					isError={error !== ''}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					isError={error !== ''}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
				/>
				<TouchableOpacity
					onPress={() => handleSignIn()}
					style={styles.button}
					disabled={loading}
				>
					{!loading ? (
						<Text style={styles.buttonText}>Sign in</Text>
					) : (
						<ActivityIndicator size="small" color="#fff" />
					)}
				</TouchableOpacity>
			</KeyboardAvoidingView>
			<View style={styles.signupContainer}>
				<Text style={styles.heading}>Don't have an account?</Text>
				<Text onPress={() => router.push('/auth/signup')} style={styles.link}>
					Sign up
				</Text>
			</View>
			<Text style={styles.resetPasswordLink} onPress={() => {}}>
				Forgot your password?
			</Text>
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
	error: {
		fontSize: 16,
		color: 'red',
		marginTop: 6,
	},
	input: {
		marginVertical: 5,
		padding: 12,
		borderWidth: 2,
		borderColor: '#dedede',
		borderRadius: 8,
		fontSize: 16,
		color: '#000',
	},
	button: {
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 8,
		backgroundColor: '#000',
		color: '#fff',
	},
	buttonText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
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
