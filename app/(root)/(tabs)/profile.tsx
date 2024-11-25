import { useEffect, useState } from 'react';
import { ThemedView as View, ThemedText as Text } from '@/components/common';
import { StyleSheet, ActivityIndicator } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Profile() {
	const [currentUserData, setCurrentUserData] = useState<any>({});

	useEffect(() => {
		firestore()
			.collection('users')
			.doc(auth().currentUser?.uid)
			.get()
			.then((doc) => {
				setCurrentUserData(doc.data());
			});
	}, []);

	if (!currentUserData) {
		return <ActivityIndicator size="small" style={{ marginTop: 12 }} />;
	}

	return (
		<View style={styles.container}>
			<Text>{auth().currentUser?.uid}</Text>
			<Text>{currentUserData.name}</Text>
			<Text>{currentUserData.type}</Text>
			<Text>{currentUserData.category}</Text>
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
