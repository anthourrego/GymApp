import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
	useLoginMutation,
	useLogoutMutation,
	useVerifySessionMutation,
} from '../modules/auth/AuthService';
import { ILoginCredentials, IUser, TOKEN_ACCESS_KEY } from '../modules/auth/interfaces';
import { localStorage } from '../services/api/storage';

export interface AuthContextType {
	user: IUser | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;

	login: (credentials: ILoginCredentials) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [loginUser, { isLoading }] = useLoginMutation();
	const [verifySession, { isLoading: isLoadingUser }] = useVerifySessionMutation();
	const [logoutUser, { isLoading: isLoadingLogout }] = useLogoutMutation();

	const [user, setUser] = useState<IUser>();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const token = await localStorage.getData(TOKEN_ACCESS_KEY);
			if (!token) {
				await localStorage.removeData(TOKEN_ACCESS_KEY);
				setUser(undefined);
				setIsAuthenticated(false);
				return;
			}

			const response = await verifySession().unwrap();
			if (response.success) {
				setUser(response.data.user);
				setIsAuthenticated(true);
			} else {
				setUser(undefined);
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error('Error checking auth status:', error);
			await logout();
		}
	};

	const login = async (credentials: ILoginCredentials) => {
		try {
			const response = await loginUser(credentials).unwrap();

			if (response.success) {
				await localStorage.storeData(TOKEN_ACCESS_KEY, response.data.token);
				setUser(response.data.user);
				setIsAuthenticated(true);

				router.replace('/');
			} else {
				setUser(undefined);
				setIsAuthenticated(false);
			}
		} catch (error: any) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			const response = await logoutUser().unwrap();

			if (response.success) {
				await localStorage.removeData(TOKEN_ACCESS_KEY);
				setUser(undefined);
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error('Error during logout:', error);
			await localStorage.removeData(TOKEN_ACCESS_KEY);
			setUser(undefined);
			setIsAuthenticated(false);
		}
	};

	const value: AuthContextType = {
		user: user,
		isAuthenticated: isAuthenticated,
		isLoading: isLoading || isLoadingUser || isLoadingLogout,

		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
