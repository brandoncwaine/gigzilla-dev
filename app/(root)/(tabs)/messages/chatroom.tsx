import {
	KeyboardAvoidingView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { View, TextInput } from '@/components/themed';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import ChatMessage from '@/components/common/ChatMessage';

import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';

const ChatroomScreen = () => {
	const uid = auth().currentUser?.uid;
	const { messageID, sender } = useLocalSearchParams();

	const [senderName, setSenderName] = useState('');
	const [messageData, setMessageData] = useState<any>({});
	const [input, setInput] = useState('');

	const onChangeText = (text: string) => {
		setInput(text);
	};

	const onMessageSend = () => {
		firestore()
			.collection('messages')
			.doc(messageID as string)
			.update({
				content: firebase.firestore.FieldValue.arrayUnion({
					sender: uid,
					message: input,
					timestamp: new Date().toISOString(),
				}),
			})
			.then(() => {
				setInput('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getNewMessages = async () => {
		return firestore()
			.collection('messages')
			.doc(messageID as string)
			.onSnapshot((doc) => {
				setMessageData(doc.data());
			});
	};

	useEffect(() => {
		getUserDataFromUID(sender as string).then((user) => {
			setSenderName(user?.name || '');
		});
		getNewMessages()
			.then(() => {
				console.log('fetched messages');
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={messageData.content}
				contentContainerStyle={styles.messagesList}
				keyExtractor={(item) => item.timestamp + item.sender}
				renderItem={({ item }) => (
					<ChatMessage
						senderUid={item.sender}
						senderName={senderName}
						message={item.message}
						date={new Date(item.timestamp).toLocaleString()}
					/>
				)}
			/>
			<KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
				<View style={styles.inputMessageContainer}>
					<TextInput
						style={styles.input}
						placeholder="Type a message..."
						placeholderTextColor="#ccc"
						onChangeText={onChangeText}
						value={input}
					/>
					<TouchableOpacity onPress={onMessageSend} style={styles.sendButton}>
						<Ionicons name="send" size={24} color={input ? '#000' : '#ccc'} />
					</TouchableOpacity>
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
		flex: 1,
		gap: 8,
	},
	inputContainer: {
		backgroundColor: '#fafafa',
		height: 120,
		width: '100%',
		borderTopColor: '#ccc',
		borderTopWidth: 1,
	},
	inputMessageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		height: 60,
		backgroundColor: '#fafafa',
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
});

export default ChatroomScreen;
