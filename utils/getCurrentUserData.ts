import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getCurrentUserData = () => {
	const user = auth().currentUser;

	if (!user) {
		return;
	}

	return firestore()
		.collection('users')
		.doc(user.uid)
		.get()
		.then((doc) => {
			return doc.data();
		});
};

export default getCurrentUserData;
