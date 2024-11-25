import GigRequest from '@/components/artist/GigRequest';
import { ThemedView as View, ThemedText as Text } from '@/components/common';
import MessagePreview from '@/components/common/MessagePreview';
import { FlatList, StyleSheet } from 'react-native';

const GIG_REQUESTS = [
	{
		id: 1,
		title: 'Gig Request',
		venue: 'The Bunker',
		date: '2023-01-01',
	},
	{
		id: 2,
		title: 'Gig Request',
		venue: 'The Bear Cave',
		date: '2023-01-01',
	},
	{
		id: 3,
		title: 'Gig Request',
		venue: 'The Bunker',
		date: '2023-01-01',
	},
	{
		id: 4,
		title: 'Gig Request',
		venue: 'The Bear Cave',
		date: '2023-01-01',
	},
];

const MESSAGES = [
	{
		id: 1,
		message: "Hey! I'm here to listen to your music. Let's get started.",
		sender: 'The Bear Cave',
		date: '2023-01-01',
		isSeen: false,
	},
	{
		id: 2,
		message: "Hey! I'm here to listen to your music. Let's get started.",
		sender: 'The Bunker',
		date: '2023-01-01',
		isSeen: true,
	},
	{
		id: 3,
		message: "Hey! I'm here to listen to your music. Let's get started. ",
		sender: 'The Old Inn',
		date: '2023-02-01',
		isSeen: true,
	},
];

const MessagesScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.messagesContainer}>
				<FlatList
					ListHeaderComponent={
						<View style={styles.gigRequestContainer}>
							<Text type="heading">Gig Requests</Text>
							<FlatList
								data={GIG_REQUESTS}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({ item }) => (
									<GigRequest title={item.title} venue={item.venue} date={item.date} />
								)}
								horizontal
								contentContainerStyle={styles.gigRequestList}
								showsHorizontalScrollIndicator={false}
								snapToInterval={200}
							/>
							<Text type="heading">Messages</Text>
						</View>
					}
					data={MESSAGES}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<MessagePreview
							sender={item.sender}
							message={item.message}
							date={item.date}
						/>
					)}
					contentContainerStyle={styles.messagesList}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		padding: 16,
	},
	gigRequestContainer: {
		flex: 1 / 2,
	},
	gigRequestList: {
		gap: 16,
		height: 150,
		marginVertical: 16,
	},
	messagesContainer: {
		flex: 1,
	},
	messagesList: {
		gap: 16,
	},
});

export default MessagesScreen;
