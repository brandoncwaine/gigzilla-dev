const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onUserAccountCreation = functions.auth.user().onCreate((user: any) => {
	// Send welcome email
	admin.firestore().collection('users').doc(user.uid).set({
		uid: user.uid,
		createdAt: user.metadata.creationTime,
	});
});
