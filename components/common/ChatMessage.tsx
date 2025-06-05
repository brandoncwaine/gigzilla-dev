import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/themed';
import auth from '@react-native-firebase/auth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Image } from 'expo-image';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';

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
	const [senderData, setSenderData] = useState<string | null>(null);

	const messageReceivedBackgroundColor = useThemeColor(
		{ light: '#F5F5F5', dark: '#1B1B1B' },
		'background'
	);

	const textColor = useThemeColor({ light: 'black', dark: 'white' }, 'text');

	useEffect(() => {
		getUserDataFromUID(senderUid).then((user) => {
			if (user) {
				setSenderData(user.photoURL || null);
			}
		});
	}, [senderUid]);

	return (
		<View
			style={[
				styles.container,
				{ alignSelf: isSentFromCurrentUser ? 'flex-end' : 'flex-start' },
			]}
		>
			{!isSentFromCurrentUser && senderData && (
				<Image
					source={{ uri: senderData }}
					style={styles.avatar}
					contentFit="cover"
				/>
			)}
			<View
				style={[
					styles.messageContainer,
					{
						backgroundColor: isSentFromCurrentUser
							? Colors.light.tint
							: messageReceivedBackgroundColor,
						borderRadius: isSentFromCurrentUser ? 16 : 8,
						borderBottomLeftRadius: isSentFromCurrentUser ? 16 : 0,
						borderBottomRightRadius: isSentFromCurrentUser ? 0 : 16,
					},
				]}
			>
				<Text
					style={[
						styles.messageText,
						{
							color: isSentFromCurrentUser ? 'white' : textColor,
						},
					]}
				>
					{message}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: 24,
		marginRight: 8,
	},
	senderNameText: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	messageContainer: {
		flexDirection: 'row',
		gap: 4,
		padding: 12,
		maxWidth: '80%',
	},
	messageText: {
		fontSize: 14,
	},
});

export default ChatMessage;
