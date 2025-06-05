import { FlatList, type FlatListProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedFlatListProps<ItemT = any> = FlatListProps<ItemT> & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedFlatList<ItemT = any>({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedFlatListProps<ItemT>) {
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background'
	);

	return (
		<FlatList
			contentContainerStyle={{ backgroundColor }}
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	);
}
