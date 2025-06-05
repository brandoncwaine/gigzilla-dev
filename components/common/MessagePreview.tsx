import {
	StyleSheet,
	TouchableOpacity,
	Image,
	useColorScheme,
} from 'react-native';
import { View, Text } from '@/components/themed';
import { router } from 'expo-router';

import { useEffect, useState } from 'react';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import { Colors } from '@/constants/Colors';
import { getAuth } from '@react-native-firebase/auth';

type MessagePreviewProps = {
	messageID: string;
	sender: string;
	message: string;
	date: string;
	isSeen: boolean;
	isFromCurrentUser: boolean;
};

const MessagePreview = ({
	messageID,
	sender,
	message,
	date,
	isSeen,
	isFromCurrentUser = false,
}: MessagePreviewProps) => {
	const currentUserUID = getAuth().currentUser?.uid;
	const messageTextColor = useColorScheme() === 'dark' ? '#999' : '#444';
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
			pathname: '/(root)/(screens)/chatroom',
			params: {
				messageID: messageID,
				sender: sender,
				message: message,
				date: date,
			},
		});
	};
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<Image source={{ uri: senderAvatar }} style={styles.avatar} />
			<View style={styles.messageContainer}>
				<Text type="defaultSemiBold" style={styles.sender} numberOfLines={1}>
					{senderName}
				</Text>
				<Text
					style={[styles.message, { color: messageTextColor }]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{`${isFromCurrentUser ? 'You: ' : ''}${message}`}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
		borderRadius: 8,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	messageContainer: {},
	sender: {
		fontSize: 14,
	},
	message: {
		fontSize: 12,
	},
});

export default MessagePreview;
