import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText as Text } from '@/components/common';
import { router } from 'expo-router';

interface ArtistProfileCardProps {
	uid: string;
	name: string;
	category: string;
}

const ArtistProfileCard = ({ uid, name, category }: ArtistProfileCardProps) => {
	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: '/(root)/userProfile',
					params: {
						uid: uid,
					},
				})
			}
			style={styles.userProfileButton}
		>
			<Image
				source={{ uri: 'https:picsum.photos/200' }}
				style={styles.userImage}
			/>
			<Text type="defaultSemiBold">{name}</Text>
			<Text type="subheading">{category}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	userProfileButton: {
		flex: 1,
		flexDirection: 'column',
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 12,
		marginBottom: 12,
	},
});

export default ArtistProfileCard;
