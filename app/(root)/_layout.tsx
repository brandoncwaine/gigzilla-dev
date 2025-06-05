import { UserDataContext, UserDataContextProvider } from '@/contexts/contexts';
import { UserData } from '@/types/UserData';
import getCurrentUserData from '@/utils/getCurrentUserData';
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import { FirestoreError } from '@react-native-firebase/firestore';
import { Redirect, Stack } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';

export default function RootLayout() {
	// Auth Context and state
	const auth = getAuth();
	const { setUserData } = useContext(UserDataContext);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

	const [initializing, setInitializing] = useState(true);

	// Set userdata context from user
	async function setUserDataContext() {
		await getCurrentUserData()
			?.then((data) => {
				setUserData(data as UserData);
			})
			.catch((error: FirestoreError) => {
				Alert.alert(
					'Something went wrong...',
					'We couldnt fetch your account details. Please try again later.'
				);
				console.log(
					'Could not get userdata from firestore and assign to context. ',
					error
				);
				return <Redirect href={'/auth'} />;
			});
	}

	// Handle user state changes
	function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
		setUser(user ? user : null); // Set user state

		setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return;

	if (!user) {
		return <Redirect href="/auth" />;
	}

	return (
		<UserDataContextProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="(modals)/user"
					options={{
						headerBackTitle: 'Back',
						headerTintColor: '#ffffff',
						headerTransparent: true,
						headerTitle: '',
					}}
				/>
				<Stack.Screen
					name="(modals)/requestGig"
					options={{
						presentation: 'modal',
						title: 'Request a gig',
					}}
				/>
				<Stack.Screen
					name="(modals)/searchfilter"
					options={{
						presentation: 'modal',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="(screens)/gigDetails"
					options={{
						headerBackTitle: 'Back',
						headerTintColor: '#fff',
						headerTransparent: true,
						headerTitle: '',
					}}
				/>
				<Stack.Screen
					name="(screens)/chatroom"
					options={{
						headerBackTitle: 'Back',
					}}
				/>
			</Stack>
		</UserDataContextProvider>
	);
}
