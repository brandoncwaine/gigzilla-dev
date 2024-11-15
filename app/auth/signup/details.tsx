import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText as Text } from '@/components/common';

import {
	SafeAreaView,
	StyleSheet,
	KeyboardAvoidingView,
	Image,
	TouchableOpacity,
	Alert,
} from 'react-native';

import {
	ThemedTextInput as Input,
	ThemedTextButton as TextButton,
} from '@/components/common';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Details() {
	const [imageURI, setImageURI] = useState('');
	const [name, setName] = useState('');

	const [loading, setLoading] = useState(false);

	const {
		email,
		type,
		category,
	}: { email: string; type: string; category: string } = useLocalSearchParams();

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
			allowsMultipleSelection: false,
		});

		if (!result.canceled) {
			setImageURI(result.assets[0].uri);
		}
	};

	const onNextPress = () => {
		if (!imageURI) {
			Alert.alert('Please upload a profile image');
			return;
		}

		router.push({
			pathname: '/auth/signup/password',
			params: {
				email: email,
				type: type,
				category: category,
				name: name,
				imageURI: imageURI,
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
				<TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
					{imageURI ? (
						<Image source={{ uri: imageURI }} style={styles.image} />
					) : (
						<Ionicons name="image" size={24} color="#ccc" />
					)}
				</TouchableOpacity>
				<Text style={styles.heading}>Upload a photo of yourself or band</Text>
				<Text style={styles.heading}>What is the name?</Text>
				<Input placeholder="Name" onChangeText={(text) => setName(text)} />

				<TextButton text="Next" onPress={onNextPress} disabled={loading} />
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
	imagePickerButton: {
		alignSelf: 'center',
		aspectRatio: 1,
		width: '70%',
		backgroundColor: '#ccc',
		borderRadius: 8,
		marginVertical: 24,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
