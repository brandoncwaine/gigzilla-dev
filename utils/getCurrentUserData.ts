import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getCurrentUserData = () => {
	const user = auth().currentUser;

	if (!user) {
		return;
	}

	firestore()
		.collection('users')
		.doc(user.uid)
		.get()
		.then((doc) => {
			console.log('doc: ', doc);
			return doc.data();
		});
};

export default getCurrentUserData;
