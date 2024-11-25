import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export const UploadImage = async (image: string) => {
	console.log('Uploading image uri: ', image);

	const userImageRef = 'Image';

	console.log('Uploading image ref: ', userImageRef);

	const fetchedImage = await fetch(image);
	const blob = await fetchedImage.blob();

	console.log('Blob: ', blob);

	await storage()
		.ref(userImageRef)
		.put(blob)
		.catch((error) => {
			console.log(error);
		});
};
