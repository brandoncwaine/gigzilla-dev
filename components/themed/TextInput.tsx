import { TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputProps extends React.ComponentProps<typeof TextInput> {
	placeholder: string;
	isError?: boolean;
}

export const ThemedTextInput = ({
	placeholder,
	isError,
	...rest
}: InputProps) => {
	const color = useThemeColor({ light: '#222', dark: '#fafafa' }, 'text');
	return (
		<TextInput
			placeholder={placeholder}
			style={[styles.input, { borderColor: isError ? 'red' : '#dedede', color }]}
			placeholderTextColor={'#777'}
			autoCapitalize="none"
			autoCorrect={false}
			keyboardType="default"
			returnKeyType="done"
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		marginVertical: 5,
		padding: 12,
		borderWidth: 1.5,
		borderRadius: 8,
		fontSize: 16,
		color: '#000',
	},
});
