import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { UploadImage } from './UploadImage';
import auth from '@react-native-firebase/auth';

export default async function editUserAvatar() {
	await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [1, 1],
		quality: 0.2,
		allowsMultipleSelection: false,
	}).then(async (result) => {
		if (result.canceled) {
			return;
		}

		return UploadImage(
			`users/${auth().currentUser?.uid}/avatar.jpg`,
			result.assets[0].uri
		).catch((error) => {
			console.log(error);

			Alert.alert('Error uploading avatar', 'Something went wrong.');
			return;
		});
	});
}
