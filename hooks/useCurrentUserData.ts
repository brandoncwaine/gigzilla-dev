import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { UserData } from '@/types/UserData';
import { getStorage } from '@react-native-firebase/storage';

export const useCurrentUserData = () => {
	if (!auth().currentUser) {
		console.log('No user currently logged in.');
		return;
	}

	const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);

	useEffect(() => {
		// User Data
		firestore()
			.collection('users')
			.doc(auth().currentUser?.uid)
			.onSnapshot((doc) => {
				setCurrentUserData(doc.data() as UserData);
			});

		// User Avatar
		const userAvatarRef = getStorage().ref(
			`users/${auth().currentUser?.uid}/avatar.jpg`
		);

		const userAvatarDownloadURL = userAvatarRef.getDownloadURL();

		async function getUserAvatar() {
			await userAvatarDownloadURL
				.then((url) => {
					setCurrentUserData((prev) => {
						if (!prev) return prev;

						return {
							...prev,
							photoURL: url,
						};
					});
				})
				.catch((error) => {
					if (error.code === 'storage/object-not-found') {
						return null;
					}
					console.log('Storage Error', error);
				});
		}

		getUserAvatar();
	}, []);

	return currentUserData;
};
