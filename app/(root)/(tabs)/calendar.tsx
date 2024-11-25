import { StyleSheet } from 'react-native';
import { ThemedView as View, ThemedText as Text } from '@/components/common';

const calendar = () => {
	return (
		<View style={styles.container}>
			<Text>Coming soon...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default calendar;
