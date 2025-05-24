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
			ListEmptyComponent={<Text>No gig requests found</Text>}
			renderItem={({ item }) => (
				<GigRequestCard
					gigRequestID={item.id}
					senderUID={item.senderUID}
					senderName={item.senderName}
					requestedDate={item.requestedDate}
					timestamp={item.timestamp}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	gigRequestList: {
		flex: 1,
		padding: 16,
	},
});
