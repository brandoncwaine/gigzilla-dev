import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, View } from '@/components/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import { getUserAvatar } from '@/utils/getUserAvatar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface PlannerProfileCardProps {
	uid: string;
	name: string;
	category?: string;
}

const PlannerProfileCard = ({
	uid,
	name,
	category,
}: PlannerProfileCardProps) => {
	const [userData, setUserData] = useState<any>({});
	const [userAvatar, setUserAvatar] = useState<string | null>();

	useEffect(() => {
		getUserDataFromUID(uid).then((user) => {
			setUserData(user);
		});
		getUserAvatar(uid).then((url) => {
			setUserAvatar(url);
		});
	}, []);

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: '/(root)/(modals)/user',
					params: {
						uid: uid,
					},
				})
			}
			style={styles.userProfileButton}
		>
			<Image source={{ uri: userAvatar! }} style={styles.userImage} />
			<View style={styles.userInfoContainer}>
				<Text type="defaultSemiBold">{name}</Text>
				<Text type="subtitle">{category}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	userProfileButton: {
		flex: 1,
		flexDirection: 'row',
	},
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 12,
	},
	userInfoContainer: {
		flex: 1,
		justifyContent: 'space-evenly',
		paddingLeft: 12,
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
});

export default PlannerProfileCard;
