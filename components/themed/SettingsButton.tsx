import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TextButtonProps
	extends React.ComponentProps<typeof TouchableOpacity> {
	lightColor?: string;
	darkColor?: string;
	icon?: keyof typeof Ionicons.glyphMap;
	value?: string;
	children: React.ReactNode;
	props?: React.ComponentProps<typeof TouchableOpacity>;
}

export const ThemedSettingsButton = ({
	lightColor,
	darkColor,
	icon,
	value,
	children,
	style,
	...props
}: TextButtonProps) => {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'secondaryButtonBackground'
	);

	const textColor = useThemeColor({ light: '#111', dark: '#fff' }, 'text');

	return (
		<TouchableOpacity
			style={[styles.button, style, { backgroundColor: backgroundColor }]}
			{...props}
		>
			<View style={styles.buttonTextContainer}>
				<Ionicons name={icon} size={18} color={textColor} />
				<Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
			</View>
			<View style={styles.buttonTextContainer}>
				<Text style={[styles.valueText, { color: textColor }]}>{value}</Text>
				<Ionicons name="create-outline" size={18} color={textColor} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		paddingVertical: 16,
		borderRadius: 8,
	},
	buttonTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#222',
	},
	valueText: {
		fontSize: 14,
		color: '#222',
	},
});
