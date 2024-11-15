import { TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface InputProps extends React.ComponentProps<typeof TextInput> {
	placeholder: string;
	isError?: boolean;
}

export const ThemedTextInput = ({
	placeholder,
	isError,
	...rest
}: InputProps) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={[styles.input, { borderColor: isError ? 'red' : '#dedede' }]}
			placeholderTextColor={'#666'}
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
		borderWidth: 2,
		borderRadius: 8,
		fontSize: 16,
		color: '#000',
	},
});
