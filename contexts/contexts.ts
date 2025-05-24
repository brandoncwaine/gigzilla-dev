import { createContext } from 'react';
import { UserData } from '@/types/UserData';

export const AuthContext = createContext<UserData | null>(null);
