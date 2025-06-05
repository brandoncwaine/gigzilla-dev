import {
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	View,
} from 'react-native';
import { Text } from '../themed';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NearbyCard = ({
	uid,
	name,
	gigFee,
	type,
	photoURL,
}: {
	uid: string;
	name: string;
	gigFee: number;
	type: string;
	photoURL: string;
}) => {
	return (
		<TouchableOpacity
			style={styles.nearbyArtistCard}
			onPress={() =>
				router.push({
					pathname: '/(root)/(modals)/user',
					params: { uid: uid },
				})
			}
		>
			<ImageBackground source={{ uri: photoURL }} style={styles.nearbyArtistImage}>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0, 0.9)']}
					start={{
						y: 0.5,
						x: 0,
					}}
					end={{
						y: 1,
						x: 0,
					}}
					style={styles.gradientBackround}
				>
					<Text type="defaultSemiBold" style={styles.artistName}>
						{name}
					</Text>
					<Text type="subtitle" style={styles.artistGenre}>
						{type}
					</Text>
				</LinearGradient>
			</ImageBackground>
			<View></View>
		</TouchableOpacity>
	);
};

export default NearbyCard;

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	nearbyArtistCard: {
		flex: 1,
		gap: 8,
		width: width * 0.8,
		marginRight: 24,
	},
	nearbyArtistImage: {
		aspectRatio: 1,
		borderRadius: 12,
		overflow: 'hidden',
	},
	gradientBackround: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 24,
	},
	artistName: {
		color: '#ffffff',
	},
	artistGenre: {
		color: '#ffffff',
	},
});
