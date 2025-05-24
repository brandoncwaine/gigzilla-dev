import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?:
		| 'default'
		| 'label'
		| 'title'
		| 'heading'
		| 'subheading'
		| 'defaultSemiBold'
		| 'subtitle'
		| 'link';
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<Text
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'label' ? styles.label : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				type === 'heading' ? styles.heading : undefined,
				type === 'subheading' ? styles.subheading : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 16,
		fontWeight: '600',
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		lineHeight: 32,
	},
	heading: {
		fontSize: 22,
		fontWeight: 'bold',
		lineHeight: 24,
	},
	subtitle: {
		fontSize: 14,
		color: '#555',
	},
	subheading: {
		fontSize: 14,
		color: '#333',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
	},
	label: {
		fontSize: 16,
		color: '#333',
	},
});
