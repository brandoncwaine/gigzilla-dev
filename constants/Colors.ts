/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#6F00FF';
const tintColorDark = '#f5f5f5';

export const Colors = {
	light: {
		text: '#11181C',
		background: '#fefefe',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,
		primaryButtonBackground: '#000',
		secondaryButtonBackground: '#eee',
	},
	dark: {
		text: '#ECEDEE',
		background: '#151718',
		tint: tintColorDark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: tintColorDark,
		primaryButtonBackground: '#eee',
		secondaryButtonBackground: '#000',
	},
};
