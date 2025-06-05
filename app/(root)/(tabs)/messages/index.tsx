import { View, Text } from '@/components/themed';
import MessagePreview from '@/components/common/MessagePreview';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	useColorScheme,
} from 'react-native';

import {
	collection,
	getDocs,
	getFirestore,
	or,
	orderBy,
	query,
	where,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';

type TStatus = 'loading' | 'error' | 'success';

const MessagesScreen = () => {
	const themeColor = useColorScheme();
	const currentUserUid = auth().currentUser?.uid;
	const [status, setStatus] = useState<TStatus>('loading');
	const [messages, setMessages] = useState<any | null>([]);

	const db = getFirestore();

	const getNewMessages = async () => {
		const q = query(
			collection(db, 'messages'),
			or(
				where('sender', '==', currentUserUid),
				where('receiver', '==', currentUserUid)
			),
			orderBy('timestamp', 'desc')
		);

		const querySnapshot = await getDocs(q);

		return querySnapshot.docs.map((doc) => {
			const mostRecentMessageIndex = doc.data().content.length - 1;
			return {
				id: doc.id,
				sender_uid:
					doc.data().sender === currentUserUid
						? doc.data().receiver
						: doc.data().sender,
				content: {
					message: doc.data().content[mostRecentMessageIndex].message,
					timestamp: doc.data().content[mostRecentMessageIndex].timestamp,
					sender: doc.data().content[mostRecentMessageIndex].sender,
				},
			};
		});
	};

	useEffect(() => {
		getNewMessages()
			.then((response) => {
				setMessages(response);
				setStatus('success');
			})
			.catch((error) => {
				console.log(error);
				setStatus('error');
			});
	}, []);

	if (status === 'loading') {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.messagesContainer}>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={status === 'loading'}
							onRefresh={() => {
								setStatus('loading');
								setTimeout(() => {
									getNewMessages();
									setStatus('success');
								}, 1500);
							}}
						/>
					}
					data={messages}
					contentContainerStyle={styles.messagesList}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={() => (
						<View style={styles.noMessagesContainer}>
							<Text>No messages yet</Text>
						</View>
					)}
					ListHeaderComponent={() => {
						return (
							<View style={styles.headerRightContainer}>
								<Text
									onPress={() => router.push('/(root)/(tabs)/messages/requests')}
									style={styles.headerRightButton}
								>
									Requests
								</Text>
								<Ionicons
									name="chevron-forward"
									size={16}
									color={themeColor == 'light' ? '#0b0b0b' : '#fff'}
								/>
							</View>
						);
					}}
					renderItem={({ item }) => (
						<MessagePreview
							messageID={item.id}
							sender={item.sender_uid}
							message={item.content.message}
							date={item.content.timestamp}
							isSeen={true}
							isFromCurrentUser={item.content.sender === currentUserUid}
						/>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		padding: 16,
	},
	messagesContainer: {
		flex: 1,
	},
	messagesList: {
		flex: 1,
		gap: 16,
	},
	headerRightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	headerRightButton: {
		fontSize: 14,
		textAlign: 'right',
		fontWeight: 'bold',
	},
	noMessagesContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
});

export default MessagesScreen;
