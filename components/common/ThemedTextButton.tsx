import {
	View,
	Text,
	StyleSheet,
	Touchable,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

interface TextButtonProps
	extends React.ComponentProps<typeof TouchableOpacity> {
	text: string;
	onPress: () => void;
}

export const ThemedTextButton = ({ text, onPress }: TextButtonProps) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 8,
		backgroundColor: '#000',
		color: '#fff',
	},
	buttonText: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
	},
});
