import {
	View,
	Text,
	StyleSheet,
	Touchable,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TextButtonProps
	extends React.ComponentProps<typeof TouchableOpacity> {
	children: React.ReactNode;
	props?: React.ComponentProps<typeof TouchableOpacity>;
}

export const ThemedTextButton = ({
	children,
	style,
	...props
}: TextButtonProps) => {
	const backgroundColor = useThemeColor({ light: '#222', dark: '#333' }, 'text');
	return (
		<TouchableOpacity
			style={[styles.button, style, { backgroundColor: backgroundColor }]}
			{...props}
		>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 8,
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 14,
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
