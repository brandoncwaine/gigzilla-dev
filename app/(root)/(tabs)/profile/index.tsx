import { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, TextButton } from '@/components/themed';
import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

import * as Location from 'expo-location';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/storage';

import GigPreferences from '@/components/settings/GigPreferences';
import { UserDataContext } from '@/contexts/contexts';

export default function ProfileScreen() {
	const { userData } = useContext(UserDataContext);
	const [location, setLocation] = useState();
	const [gigFee, setGigFee] = useState(userData?.gigFee.toString());

	function editUserData(key: string, value: string) {
		firebase
			.firestore()
			.collection('users')
			.doc(auth().currentUser?.uid)
			.update({ [key]: value });
	}

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		}

		getCurrentLocation();
	}, []);

	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<ScrollView style={styles.container}>
					<View style={styles.userImageContainer}>
						<Image
							source={{
								uri: userData?.photoURL,
							}}
							style={styles.userImage}
							contentFit="cover"
							placeholderContentFit="contain"
							placeholder={require('@/assets/images/defaultavatar.png')}
						/>
						<Text type="title" style={styles.nameText}>
							{userData?.name}
						</Text>
						<Text type="subtitle">{userData?.email}</Text>
						<TextButton
							onPress={() => router.push('/(root)/(tabs)/profile/editProfile')}
							style={styles.editProfileButton}
						>
							Edit Profile
						</TextButton>
					</View>
					<View style={styles.buttonGroup}>
						<Text type="defaultSemiBold" style={styles.nameText}>
							Gig preferences
						</Text>
						<GigPreferences />
					</View>
					<View style={styles.buttonGroup}>
						<Text type="defaultSemiBold" style={styles.nameText}>
							Statistics
						</Text>
					</View>
					<View style={styles.buttonGroup}>
						<TextButton
							onPress={() => {
								auth()
									.signOut()
									.then(() => {
										router.replace('/auth');
									});
							}}
						>
							Signout
						</TextButton>
					</View>
				</ScrollView>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
	},
	mapView: {
		flex: 1,
	},
	userImageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 36,
	},
	buttonGroup: {
		gap: 6,
		paddingVertical: 16,
	},
	nameText: {
		marginVertical: 12,
	},
	editProfileButton: {
		marginTop: 12,
		paddingVertical: 8,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});
