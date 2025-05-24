import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { View, Text } from '@/components/themed';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getUserAvatar } from '@/utils/getUserAvatar';

type GigRequestCardProps = {
	gigRequestID: string;
	senderUID: string;
	senderName: string;
	requestedDate: FirebaseFirestoreTypes.Timestamp;
	timestamp: FirebaseFirestoreTypes.Timestamp;
};

const GigRequestCard = ({
	gigRequestID,
	senderUID,
	senderName,
	requestedDate,
	timestamp,
}: GigRequestCardProps) => {
	const [userAvatar, setUserAvatar] = useState<string | null>();
	const date = requestedDate.toString().split('T')[0].split('-').join('/');

	useEffect(() => {
		getUserAvatar(senderUID).then((url) => {
			setUserAvatar(url);
		});
	}, []);

	const onAcceptPress = async () => {
		await Promise.all([
			firestore()
				.collection('gigRequests')
				.doc(gigRequestID)
				.delete()
				.then(() => {
					console.log('Gig request deleted');
				}),

			firestore().collection('gigs').add({
				artist: auth().currentUser?.uid,
				sender: senderUID,
				requestedDate: requestedDate,
				timestamp: firestore.FieldValue.serverTimestamp(),
			}),

			firestore()
				.collection('messages')
				.add({
					sender: senderUID,
					receiver: auth().currentUser?.uid,
					content: [
						{
							sender: auth().currentUser?.uid,
							message: 'Your gig request has been accepted!',
							timestamp: Date.now(),
						},
					],
					timestamp: Date.now(),
				}),
		]);
	};

	const onDeclinePress = async () => {
		await firestore()
			.collection('gigRequests')
			.doc(gigRequestID)
			.delete()
			.then(() => {
				console.log('Gig request deleted');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.infoContainer}>
				<Image source={{ uri: userAvatar! }} style={styles.avatar} />
				<View>
					<Text type="defaultSemiBold">{senderName}</Text>
					<Text type="subheading">{date}</Text>
					<Text type="subheading">{}</Text>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: 'green' }]}
					onPress={onAcceptPress}
				>
					<Ionicons name="checkmark" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#1E1E1E' }]}
					onPress={onDeclinePress}
				>
					<Ionicons name="close" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	infoContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	avatar: {
		width: 48,
		aspectRatio: 1,
		borderRadius: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	button: {
		width: 64,
		height: 32,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
});

export default GigRequestCard;
