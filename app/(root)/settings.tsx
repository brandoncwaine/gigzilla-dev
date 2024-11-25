import {
	ThemedText as Text,
	ThemedTextButton,
	ThemedView as View,
} from '@/components/common';
import { Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { UploadImage } from '@/utils/UploadImage';
import { useState } from 'react';

export default function Settings() {
	const [imageURI, setImageURI] = useState('');

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
			allowsMultipleSelection: false,
		});

		if (result.canceled) {
			return;
		}

		await UploadImage(result.assets[0].uri);
	};
	return (
		<View style={styles.container}>
			<View style={styles.userImageContainer}>
				{imageURI ? (
					<Image source={{ uri: imageURI }} style={styles.userImage} />
				) : (
					<Image
						source={{ uri: 'https://picsum.photos/200' }}
						style={styles.userImage}
					/>
				)}
				<Text type="link" onPress={pickImage}>
					Change profile picture
				</Text>
			</View>
			<View style={styles.buttonGroup}>
				<ThemedTextButton
					text="Signout"
					onPress={() => {
						auth()
							.signOut()
							.then(() => {
								router.replace('/');
							});
					}}
				/>
				<ThemedTextButton
					text="Save and close"
					onPress={() => {
						router.dismiss();
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		paddingVertical: 36,
		justifyContent: 'space-between',
	},
	userImageContainer: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonGroup: {
		gap: 12,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});
