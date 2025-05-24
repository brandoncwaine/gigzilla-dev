import { firebase } from '@react-native-firebase/storage';

export const getUserAvatar = async (uid: string) => {
	const storage = firebase.storage();
	const userRef = storage.ref(`users/${uid}/avatar.jpg`);

	return await userRef.getDownloadURL();
};
