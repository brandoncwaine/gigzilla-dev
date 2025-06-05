import { StyleSheet, SafeAreaView } from 'react-native';
import { View, Text } from '../themed';

type ChatRoomHeaderProps = {
	title: string | undefined;
	photoURL: string | undefined;
};

const ChatRoomHeader = ({ title, photoURL }: ChatRoomHeaderProps) => {
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text>{title}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
	},
});

export default ChatRoomHeader;
