import firestore, { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';
import { Alert } from 'react-native';

export const getUserDataFromUID = async (uid: string) => {
	const db = getFirestore();
	try {
		// User Avatar
		const userAvatarRef = getStorage().ref(`users/${uid}/avatar.jpg`);

		const userAvatarDownloadURL = userAvatarRef.getDownloadURL();

		const doc = await db.collection('users').doc(uid).get();
		if (doc.exists) {
			return await userAvatarDownloadURL.then((url) => {
				return {
					name: doc.data()?.name,
					category: doc.data()?.category,
					type: doc.data()?.type,
					photoURL: url,
				};
			});
		} else {
			console.log('No user data found for UID:', uid);
			return null;
		}
	} catch (error) {
		console.error(`Error getting user data: UID: ${uid}`, error);
		Alert.alert('Error', 'Error getting user data');
		return null;
	}
};
