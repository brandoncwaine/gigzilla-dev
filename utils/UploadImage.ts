import { firebase, uploadBytesResumable } from '@react-native-firebase/storage';

export const UploadImage = async (path: string, image: string) => {
	const response = await fetch(image);
	const blob = await response.blob();

	const reference = firebase.storage().ref().child(path);

	return uploadBytesResumable(reference, blob);
};
