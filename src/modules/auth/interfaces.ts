export const TOKEN_ACCESS_KEY = 'access_token';

export interface ILoginResponse {
	success: boolean;
	message: string;
	data: ILoginData;
}

export interface ILoginData {
	user: IUser;
	token: string;
}

export interface IUserResponse {
	success: boolean;
	data: IUserData;
}

export interface IUserData {
	user: IUser;
}

export interface ILogoutResponse {
	success: boolean;
	message: string;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
}
