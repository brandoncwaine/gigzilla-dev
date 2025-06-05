import { UserData } from '@/types/UserData';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

type UserDataContextType = {
	userData: UserData | null;
	setUserData: Dispatch<SetStateAction<UserData | null>>;
};

export const UserDataContext = createContext<UserDataContextType>({
	userData: null,
	setUserData: () => {},
});

export const UserDataContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [userData, setUserData] = useState<UserData | null>(null);
	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserDataContext.Provider>
	);
};
