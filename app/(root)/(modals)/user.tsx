import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextButton, Text } from '@/components/themed';

import { getFirestore } from '@react-native-firebase/firestore';
import { router, useLocalSearchParams } from 'expo-router';

import { getUserAvatar } from '@/utils/getUserAvatar';
import { Ionicons } from '@expo/vector-icons';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';

const ParralaxOverlay = ({ userData }: { userData: any }) => {
	return (
		<View style={styles.overlay}>
			<Text style={styles.title}>{userData.name}</Text>
			<View style={styles.infoRow}>
				<View style={styles.infoRow}>
					<Ionicons name="map" size={16} color="#fff" />
					<Text style={styles.subheading}>123 Test Road, Test City</Text>
				</View>
			</View>
		</View>
	);
};

const UserProfileScreen = () => {
	const [profileData, setProfileData] = useState<any>({});
	const [userAvatar, setUserAvatar] = useState<any>();

	const { uid }: { uid: string } = useLocalSearchParams();

	const getProfileData = async () => {
		if (!uid) return;
		const data = getUserDataFromUID(uid);
		setProfileData(data);
		console.log('UserDATA: ', data);
		return data;
	};

	const onRequestGig = () => {
		router.push({
			pathname: '/(root)/(modals)/requestGig',
			params: {
				artistUid: uid,
			},
		});
	};

	useEffect(() => {
		getUserDataFromUID(uid).then((data) => {
			setProfileData(data);
		});
	}, [uid]);

	return (
		<ParallaxScrollView
			headerImage={profileData.photoURL}
			overlay={<ParralaxOverlay userData={profileData} />}
			headerBackgroundColor={{
				dark: '#000',
				light: '#fff',
			}}
		>
			<View style={styles.buttonGroup}>
				<TextButton onPress={onRequestGig}>Request a gig</TextButton>
			</View>
			<Text type="heading">About us</Text>
			<Text type="default">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptas
				quas iure nisi eveniet ipsa, error, velit nostrum optio impedit, dolorum
				provident. Adipisci quis ipsum numquam aperiam mollitia? Eaque, quos?
			</Text>
			<Text type="heading">Our artists</Text>
			<Text type="default">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
			<Text type="heading">Reviews</Text>
			<Text type="default">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Text>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	paragraph: {
		fontSize: 16,
		color: '#666',
		marginBottom: 12,
	},
	buttonGroup: {
		gap: 12,
	},
	overlay: {
		width: '100%',
		padding: 12,
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
	subheading: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		fontSize: 16,
		color: '#fff',
	},
});

export default UserProfileScreen;
