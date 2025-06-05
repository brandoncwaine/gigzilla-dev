import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from '@/components/themed';
import { Colors } from '@/constants/Colors';

type TabsHeaderProps = {
	title?: string;
};

const TabsHeader = ({ title }: TabsHeaderProps) => {
	const safeAreaBackgroundColor =
		useColorScheme() === 'dark'
			? Colors.dark.background
			: Colors.light.background;
	return (
		<SafeAreaView style={{ backgroundColor: safeAreaBackgroundColor }}>
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
});

export default TabsHeader;
