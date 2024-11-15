import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Image, Text, View } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/common';

const HEADER_HEIGHT = 400;

type Props = PropsWithChildren<{
	headerImage: string;
	headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
	children,
	headerImage,
	headerBackgroundColor,
}: Props) {
	const colorScheme = useColorScheme() ?? 'light';
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	return (
		<ThemedView style={styles.container}>
			<Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
				<View style={styles.header}>
					<Animated.Image
						style={[
							styles.image,
							{ backgroundColor: headerBackgroundColor[colorScheme] },
							headerAnimatedStyle,
						]}
						source={{ uri: headerImage }}
					></Animated.Image>
					<Text style={styles.artistName}>The Trash Bananas</Text>
				</View>
				<ThemedView style={styles.content}>{children}</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: HEADER_HEIGHT,
		justifyContent: 'flex-end',
	},
	image: {
		height: '100%',
		width: '100%',
		zIndex: 0,
	},
	artistName: {
		position: 'absolute',
		fontSize: 26,
		fontWeight: 'bold',
		color: '#fff',
		padding: 12,
	},
	content: {
		flex: 1,
		padding: 16,
		paddingTop: 24,
		gap: 16,
		zIndex: 5,
	},
});
