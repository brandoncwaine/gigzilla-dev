import {
	KeyboardAvoidingView,
	TextInput,
	StyleSheet,
	Touchable,
	TouchableOpacity,
} from 'react-native';
import { ThemedView as View, ThemedText as Text } from '@/components/common';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import ChatMessage from '@/components/common/ChatMessage';

const ChatroomScreen = () => {
	const { sender, message, date } = useLocalSearchParams();
	const [messages, setMessages] = React.useState<string[]>([]);
	const [input, setInput] = React.useState('');

	const onChangeText = (text: string) => {
		setInput(text);
	};

	const onMessageSend = () => {
		console.log('sending message ', input);
		setInput('');
	};

	return (
		<View style={styles.container}>
			<ChatMessage sender={sender} message={message} date={date} />
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
		justifyContent: 'flex-end',
	},
	inputContainer: {
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
