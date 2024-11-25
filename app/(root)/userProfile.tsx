import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText as Text, ThemedView as View } from '@/components/common';

import { getFirestore } from '@react-native-firebase/firestore';
import { useLocalSearchParams } from 'expo-router';

const Profile = () => {
	const firestore = getFirestore();
	const [profileData, setProfileData] = useState<any>({});

	const { uid }: { uid: string } = useLocalSearchParams();

	const getProfileData = async () => {
		if (!uid) return;
		const userRef = firestore.collection('users').doc(uid);

		await userRef.get().then((doc) => {
			setProfileData(doc.data());
		});
	};

	useEffect(() => {
		getProfileData();
	}, []);

	return (
		<ParallaxScrollView
			headerImage={'https://picsum.photos/id/10/2000/1000'}
			headerTitle={profileData.name}
			headerBackgroundColor={{
				dark: '#000',
				light: '#fff',
			}}
		>
			<Text style={styles.header}>About us</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text style={styles.header}>Our artists</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text style={styles.header}>Reviews</Text>
			<Text style={styles.paragraph}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	artistDetails: {
		fontSize: 14,
		color: '#666',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	paragraph: {
		fontSize: 16,
		color: '#666',
		marginBottom: 12,
	},
});

export default Profile;
