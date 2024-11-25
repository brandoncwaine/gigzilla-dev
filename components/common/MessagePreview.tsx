import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedView as View, ThemedText as Text } from '@/components/common';
import { router } from 'expo-router';

type MessagePreviewProps = {
	sender: string;
	message: string;
	date: string;
	isSeen: boolean;
};

const MessagePreview = ({
	sender,
	message,
	date,
	isSeen,
}: MessagePreviewProps) => {
	const onPress = () => {
		router.push({
			pathname: '/chatroom',
			params: {
				sender: sender,
				message: message,
				date: date,
			},
		});
	};
	return (
		<TouchableOpacity style={styles.messageContainer} onPress={onPress}>
			<Image source={{ uri: 'https://picsum.photos/200' }} style={styles.avatar} />
			<View style={styles.messageContent}>
				<Text style={[styles.sender, isSeen && { color: 'green' }]}>{sender}</Text>
				<Text numberOfLines={1}>{message}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
		borderRadius: 8,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 6,
	},
	messageContent: {
		flex: 1,
		backgroundColor: undefined,
	},
	sender: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	seen: {
		color: '#00ff00',
		fontWeight: 'bold',
	},
});

export default MessagePreview;
