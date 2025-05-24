import { getUserDataFromUID } from '@/utils/getUserDataFromUID';
import { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

export const useEventDetails = ({ eventId }: { eventId: string }) => {
	const [eventDetails, setEventDetails] = useState<any>({});

	useEffect(() => {
		// Get event details
		firestore()
			.collection('gigs')
			.doc(eventId)
			.get()
			.then(async (querySnapshot) => {
				if (querySnapshot.exists) {
					const gigData = querySnapshot.data();
					await getUserDataFromUID(gigData!.sender).then((data) => {
						console.log(data);
						setEventDetails({
							...gigData,
							data,
						});
					});
				}
			});
	}, []);

	return eventDetails;
};
