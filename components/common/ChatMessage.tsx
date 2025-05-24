import { View, Text, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

type ChatMessageProps = {
	senderUid: string;
	senderName: string;
	message: string;
	date: string;
};

const ChatMessage = ({
	senderUid,
	senderName,
	message,
	date,
}: ChatMessageProps) => {
	const uid: string | undefined = auth().currentUser?.uid;
	const isSentFromCurrentUser: boolean = uid === senderUid;

	if (isSentFromCurrentUser) {
		return (
			<View style={styles.container}>
				<View style={[styles.messageContainer, { alignItems: 'flex-end' }]}>
					<Text style={styles.senderNameText}>{date} • You</Text>
					<Text style={styles.messageText}>{message}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: 'https://picsum.photos/200' }} style={styles.avatar} />
			<View style={styles.messageContainer}>
				<Text style={styles.senderNameText}>
					{senderName} • {date}
				</Text>
				<Text style={styles.messageText}>{message}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 8,
		gap: 8,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 24,
	},
	senderNameText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#222',
	},
	messageContainer: {
		flex: 1,
		gap: 4,
	},
	messageText: {
		fontSize: 16,
		color: '#222',
	},
});

export default ChatMessage;
