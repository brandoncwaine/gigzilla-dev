import {
	ThemedText as Text,
	ThemedTextButton,
	ThemedView as View,
} from '@/components/common';
import { StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

export default function Settings() {
	return (
		<View style={styles.container}>
			<Text>Settings</Text>
			<ThemedTextButton
				text="Signout"
				onPress={() => {
					auth()
						.signOut()
						.then(() => {
							router.replace('/');
						});
				}}
				style={styles.closeButton}
			/>
			<ThemedTextButton
				text="Save and close"
				onPress={() => {
					router.dismiss();
				}}
				style={styles.closeButton}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		paddingBottom: 36,
		justifyContent: 'space-between',
	},
	closeButton: {},
});
