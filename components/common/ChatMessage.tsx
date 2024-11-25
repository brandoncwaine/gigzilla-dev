import { View, Text } from 'react-native';

type ChatMessageProps = {
	sender: string;
	message: string;
	date: string;
};

const ChatMessage = ({ sender, message, date }: ChatMessageProps) => {
	return (
		<View>
			<View />
			<View>
				<Text>{date}</Text>
				<Text>{sender}</Text>
				<Text>message</Text>
			</View>
		</View>
	);
};

export default ChatMessage;
