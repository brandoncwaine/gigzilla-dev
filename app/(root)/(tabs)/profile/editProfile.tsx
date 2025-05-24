import { View, Text, TextButton, SettingsButton } from '@/components/themed';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'expo-image';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';
import { router } from 'expo-router';

import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { UploadImage } from '@/utils/UploadImage';
import auth from '@react-native-firebase/auth';

const editProfile = () => {
	const currentUserData = useCurrentUserData();
	const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);
	const [imageStatus, setImageStatus] = useState<'ready' | 'loading'>('ready');

	const editAvatar = async () => {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.2,
			allowsMultipleSelection: false,
		}).then(async (result) => {
			if (result.canceled) {
				return;
			}

			setImageStatus('loading');

			return UploadImage(
				`users/${auth().currentUser?.uid}/avatar.jpg`,
				result.assets[0].uri
			)
				.catch((error) => {
					console.log(error);

					Alert.alert('Error uploading avatar', 'Something went wrong.');
					return;
				})
				.finally(() => {
					setImageStatus('ready');
				});
		});
	};

	function closeModal() {
		router.dismiss();
	}

	useEffect(() => {
		setAvatarImage(currentUserData?.photoURL);
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<ImageBackground
					source={{ uri: avatarImage }}
					placeholder={require('@/assets/images/defaultavatar.png')}
					placeholderContentFit="contain"
					contentFit="cover"
					style={styles.userImage}
					transition={100}
				>
					{imageStatus === 'loading' && (
						<View style={styles.progressContainer}>
							<ActivityIndicator size="small" color="#fff" />
						</View>
					)}
				</ImageBackground>
				<Text type="link" onPress={() => editAvatar()}>
					Edit Avatar
				</Text>
			</View>
			<View style={styles.buttonGroup}>
				<SettingsButton onPress={() => {}} value="None">
					LinkTree
				</SettingsButton>
				<SettingsButton onPress={() => {}} value="Genre1, Genre2">
					Genres
				</SettingsButton>
			</View>
			<TextButton onPress={() => closeModal()}>Done</TextButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 48,
		paddingHorizontal: 12,
		gap: 12,
	},
	avatarContainer: {
		flex: 1 / 2,
		alignItems: 'center',
		gap: 16,
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		overflow: 'hidden',
	},
	buttonGroup: {
		gap: 12,
	},
	progressContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default editProfile;
