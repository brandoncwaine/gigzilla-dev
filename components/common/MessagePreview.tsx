import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text } from '@/components/themed';
import { router } from 'expo-router';

import { useEffect, useState } from 'react';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';

type MessagePreviewProps = {
	messageID: string;
	sender: string;
	message: string;
	date: string;
	isSeen: boolean;
};

const MessagePreview = ({
	messageID,
	sender,
	message,
	date,
	isSeen,
}: MessagePreviewProps) => {
	const [senderName, setSenderName] = useState<string>('');
	const [senderAvatar, setSenderAvatar] = useState<string | null>(null);

	useEffect(() => {
		getUserDataFromUID(sender).then((user) => {
			setSenderName(user?.name || '');
			setSenderAvatar(user?.photoURL || null);
		});
	}, []);

	const onPress = () => {
		router.push({
			pathname: '/(root)/(tabs)/messages/chatroom',
			params: {
				messageID: messageID,
				sender: sender,
				message: message,
				date: date,
			},
		});
	};
	return (
		<TouchableOpacity style={styles.messageContainer} onPress={onPress}>
			<Image source={{ uri: senderAvatar }} style={styles.avatar} />
			<View style={styles.messageContent}>
				<Text style={[styles.sender, !isSeen && { fontWeight: 'bold' }]}>
					{senderName}
				</Text>
				<Text numberOfLines={1} style={!isSeen && { fontWeight: 'bold' }}>
					{message}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
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
		color: '#000',
	},
	seen: {
		fontWeight: 'bold',
	},
});

export default MessagePreview;
