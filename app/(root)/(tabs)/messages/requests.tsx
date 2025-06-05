import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GigRequestCard from '@/components/cards/GigRequestCard';

import { Text } from '@/components/themed';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';

export default function MessageRequests() {
	const [status, setStatus] = useState('loading');
	const [gigRequests, setGigRequests] = useState<any | null>([]);

	const getGigRequests = async () => {
		return await firestore()
			.collection('gigRequests')
			.where('artist', '==', auth().currentUser?.uid)
			.get()
			.then(async (querySnapshot) => {
				const gigRequests = await Promise.all(
					querySnapshot.docChanges().map(async (change) => {
						const doc = change.doc;
						const senderUserData = await getUserDataFromUID(doc.data().sender);
						return {
							id: doc.id,
							senderName: senderUserData?.name,
							senderUID: doc.data().sender,
							requestedDate: doc.data().requestedDate,
							timestamp: doc.data().timestamp,
						};
					})
				);
				return gigRequests;
			});
	};

	const onAcceptPress = async (
		senderUID: string,
		requestedDate: string,
		gigRequestID: string
	) => {
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

	const onDeclinePress = async (gigRequestID: string) => {
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

		getGigRequests()
			.then((response) => {
				console.log(response);
				setGigRequests(response);
				setStatus('success');
			})
			.catch((error) => {
				setStatus('error');
				console.log(error);
			});
	};

	useEffect(() => {
		getGigRequests()
			.then((response) => {
				console.log(response);
				setGigRequests(response);
				setStatus('success');
			})
			.catch((error) => {
				setStatus('error');
				console.log(error);
			});
	}, []);

	return (
		<FlatList
			data={gigRequests}
			contentContainerStyle={styles.gigRequestList}
			keyExtractor={(item) => item.id + item.timestamp}
			ListEmptyComponent={
				<Text type="subtitle" style={styles.noGigRequestText}>
					You don't have any gig requests currently.
				</Text>
			}
			renderItem={({ item }) => (
				<GigRequestCard
					gigRequestID={item.id}
					senderUID={item.senderUID}
					senderName={item.senderName}
					requestedDate={item.requestedDate}
					timestamp={item.timestamp}
					onAcceptPress={() =>
						onAcceptPress(item.senderUID, item.requestedDate.toString(), item.id)
					}
					onDeclinePress={() => onDeclinePress(item.id)}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	gigRequestList: {
		padding: 16,
		paddingTop: 32,
	},
	noGigRequestText: {
		textAlign: 'center',
		paddingTop: 24,
	},
});
