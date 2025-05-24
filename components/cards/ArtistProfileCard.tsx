import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Text } from '@/components/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import { getUserAvatar } from '@/utils/getUserAvatar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ArtistProfileCardProps {
	uid: string;
	name: string;
	category?: string;
}

const ArtistProfileCard = ({ uid, name, category }: ArtistProfileCardProps) => {
	const [userData, setUserData] = useState<any>({});
	const [userAvatar, setUserAvatar] = useState<string | null>();

	useEffect(() => {
		getUserDataFromUID(uid).then((data) => {
			setUserData(data);
		});
		getUserAvatar(uid).then((url) => {
			setUserAvatar(url);
		});
	}, []);

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
			<Image source={{ uri: userAvatar! }} style={styles.userImage} />
			<View style={styles.userInfoContainer}>
				<Text type="defaultSemiBold">{name}</Text>
				<Text type="subtitle">{category}</Text>

				<View style={styles.infoRow}>
					<Text type="subheading">
						£{userData.gigFee ? userData.gigFee : '0'} Per Gig
					</Text>

					<MaterialCommunityIcons name="circle" size={4} color="#555" />
					<Text type="subheading">
						{userData.gigsPlayed ? userData.gigsPlayed : '0'} Gigs Played
					</Text>
				</View>
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

export default ArtistProfileCard;
