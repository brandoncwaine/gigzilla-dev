import { router } from 'expo-router';
import {
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	ActivityIndicator,
} from 'react-native';

import { View, Text, TextButton, TextInput } from '@/components/themed';
import { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';

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
					router.push('/(root)/(tabs)');
				});
		} catch (error: any) {
			if (error.code === 'auth/wrong-password') {
				setError('*Wrong password.');
			} else if (error.code === 'auth/invalid-email') {
				setError('*Invalid email. Please double check your email and try again.');
			} else if (error.code === 'auth/invalid-credential') {
				setError('*Incorrect email or password.');
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		if (email === '' || password === '') {
			setError('');
		}
	}, [email, password]);

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior="position"
				style={styles.container}
				keyboardVerticalOffset={-50}
			>
				<Image source={require('@/assets/images/logo.png')} style={styles.logo} />
				<Text style={styles.title}>Welcome.</Text>
				<Text style={styles.heading}>Already have an account? Sign in below.</Text>
				<Text style={styles.error}>{error}</Text>
				<TextInput
					placeholder="Email"
					keyboardType="email-address"
					isError={error !== ''}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					placeholder="Password"
					isError={error !== ''}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
				/>
				<TextButton
					onPress={() => handleSignIn()}
					disabled={loading || error !== ''}
				>
					{!loading ? <>Sign in</> : <ActivityIndicator size="small" color="#fff" />}
				</TextButton>
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
		fontSize: 14,
		color: 'red',
		marginTop: 6,
	},
	signupContainer: {
		alignItems: 'center',
	},
	link: {
		fontSize: 16,
		textDecorationLine: 'underline',
	},
	resetPasswordLink: {
		fontSize: 16,
		color: '#666',
		marginTop: 24,
		textAlign: 'center',
	},
});
