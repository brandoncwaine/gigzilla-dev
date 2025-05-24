import { useEffect, type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useScrollViewOffset,
	useSharedValue,
} from 'react-native-reanimated';

import { View } from '@/components/themed';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 400;

type Props = PropsWithChildren<{
	headerImage: string;
	overlay: ReactElement;
	headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
	children,
	headerImage,
	overlay,
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

	const animatedHeaderBackgroundStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: `rgba(0,0,0,${interpolate(
				scrollOffset.value,
				[0, 40],
				[0, 1]
			)})`,
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.animatedHeaderBackground, animatedHeaderBackgroundStyle]}
			/>
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
					<LinearGradient
						colors={['transparent', '#000']}
						start={{ x: 0, y: 0.2 }}
						end={{ x: 0, y: 1 }}
						style={styles.overlay}
					>
						{overlay}
					</LinearGradient>
				</View>
				<View style={styles.content}>{children}</View>
			</Animated.ScrollView>
		</View>
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
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		flex: 1,
		justifyContent: 'flex-end',
	},
	content: {
		flex: 1,
		padding: 16,
		paddingTop: 24,
		gap: 16,
		zIndex: 5,
		paddingBottom: 100,
	},
	animatedHeaderBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100, // Adjust height as needed
		zIndex: 10,
	},
});
