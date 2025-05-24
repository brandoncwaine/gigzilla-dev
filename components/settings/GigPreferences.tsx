import { StyleSheet, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { View, SettingsButton, TextButton } from '@/components/themed';

const GigPreferences = () => {
	const currentUserData = useCurrentUserData();

	const [matureContent, setMatureContent] = useState(false);
	const [currentSetting, setCurrentSetting] = useState<string | null>();

	const onSettingPressed = (name: string) => {
		setCurrentSetting(name);
		bottomSheetModalRef.current?.present();
	};

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	return (
		<View style={styles.container}>
			<SettingsButton
				onPress={() => onSettingPressed('gigFee')}
				value={`£${currentUserData?.gigFee}`}
			>
				Gig Fee
			</SettingsButton>
			<SettingsButton
				onPress={() => onSettingPressed('location')}
				value="Bournemouth"
			>
				Location
			</SettingsButton>
			<SettingsButton
				onPress={() => onSettingPressed('willingToTravel')}
				value="Only local"
			>
				Willing to travel
			</SettingsButton>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				enableDynamicSizing={true}
				backgroundStyle={{
					borderColor: '#ddd',
					borderWidth: StyleSheet.hairlineWidth,
				}}
			>
				<BottomSheetView
					style={[{ backgroundColor: '#fff' }, styles.bottomSheetView]}
				>
					{currentSetting == 'gigFee' && (
						<TextInput placeholder={`£${currentUserData?.gigFee}`} value={'£40'} />
					)}

					<View style={styles.editButtonGroup}>
						<TextButton onPress={() => {}} style={styles.doneButton}>
							Done
						</TextButton>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	bottomSheetView: {
		paddingHorizontal: 24,
		height: 450,
		gap: 12,
	},
	editButtonGroup: {
		flexDirection: 'row',
		gap: 12,
		paddingVertical: 12,
	},
	doneButton: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
});

export default GigPreferences;
