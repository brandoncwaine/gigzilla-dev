import { ThemedView as View, ThemedText as Text } from '@/components/common';
import { StyleSheet, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import auth from '@react-native-firebase/auth';
import { useState } from 'react';

import storage, { uploadBytes } from '@react-native-firebase/storage';
import { Platform } from 'react-native';

export default function Profile() {
	const user = auth().currentUser;
	const photoURL = user?.photoURL as string;
	const displayName = user?.displayName;

	const [imageURI, setImageURI] = useState('');

	const uploadImage = async () => {
		const userImageRef = storage().ref(
			`users/${auth().currentUser?.uid}/profile.jpg`
		);

		const uploadURI =
			Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI;

		await uploadBytes(userImageRef, uploadURI);
	};

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

		await uploadImage();
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: photoURL }} style={styles.userImage} />
			<Text onPress={pickImage}>
				{imageURI ? imageURI : photoURL ? photoURL : 'Set a profile image'}
			</Text>
			<Text>{displayName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 12,
	},
});
