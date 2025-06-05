import { KeyboardAvoidingView, FlatList, StyleSheet } from 'react-native';

import { View, TextInput, Text } from '@/components/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ChatMessage from '@/components/common/ChatMessage';

import firestore, { getFirestore } from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';

import moment from 'moment';
import { UserData } from '@/types/UserData';
import ChatRoomHeader from '@/components/common/ChatRoomHeader';
import { Image } from 'expo-image';

const ChatroomScreen = () => {
	const db = getFirestore();
	const flatlistRef = useRef<FlatList>(null);

	const currentUserUid = auth().currentUser?.uid;
	const { messageID, sender } = useLocalSearchParams();

	const [userData, setUserData] = useState<UserData | null>();
	const [messageData, setMessageData] = useState<any>({});
	const [input, setInput] = useState('');

	const onChangeText = (text: string) => {
		setInput(text);
	};

	const onMessageSend = () => {
		if (!input.trim()) {
			return;
		}
		// Clear the input field after sending the message
		setInput('');

		// Update the Firestore document with the new message
		firestore()
			.collection('messages')
			.doc(messageID as string)
			.update({
				content: firebase.firestore.FieldValue.arrayUnion({
					sender: currentUserUid,
					message: input,
					timestamp: new Date().toISOString(),
				}),
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getUserDataFromUID(sender as string).then((data) => {
			setUserData(data as UserData);
		});

		const subscriber = db
			.collection('messages')
			.doc(messageID as string)
			.onSnapshot((docSnapshot) => {
				if (docSnapshot.exists) {
					const data = docSnapshot.data();
					if (data && data.content) {
						setMessageData({
							id: docSnapshot.id,
							content: data.content,
						});
					}
				}
			});

		return () => subscriber();
	}, []);

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerBackground: () => <View style={styles.header} />,
					headerTitle: () => (
						<View style={styles.headerTitle}>
							<Text type="defaultSemiBold">{userData?.name}</Text>
						</View>
					),
				}}
			/>
			<FlatList
				data={messageData.content}
				contentContainerStyle={styles.messagesList}
				keyExtractor={(item) => item.timestamp + item.sender}
				renderItem={({ item }) => (
					<ChatMessage
						senderUid={item.sender}
						senderName={item.sender == currentUserUid ? 'You' : userData?.name}
						message={item.message}
						date={moment(item.timestamp).fromNow()}
					/>
				)}
				ref={flatlistRef}
			/>
			<KeyboardAvoidingView
				behavior="padding"
				style={styles.inputContainer}
				keyboardVerticalOffset={170}
			>
				<View style={styles.inputMessageContainer}>
					<TextInput
						style={styles.input}
						placeholder="Type a message..."
						placeholderTextColor="#ccc"
						onChangeText={onChangeText}
						value={input}
						onSubmitEditing={onMessageSend}
						submitBehavior="blurAndSubmit"
						returnKeyType="send"
						autoCapitalize="sentences"
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	messagesList: {
		gap: 8,
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	inputContainer: {
		height: 120,
		width: '100%',
		borderTopColor: '#888',
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	inputMessageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		height: 60,
		borderRadius: 8,
	},
	input: {
		flex: 1,
		padding: 12,
		fontSize: 16,
		height: '100%',
	},
	sendButton: {
		width: 48,
		height: 48,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		height: 160,
	},
	headerTitle: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
});

export default ChatroomScreen;
