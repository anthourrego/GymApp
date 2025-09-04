import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../store/AxiosBaseQuery';
import { ILoginCredentials, ILoginResponse, ILogoutResponse, IUserResponse } from './interfaces';

export const authService = createApi({
	reducerPath: 'AuthService',
	baseQuery: axiosBaseQuery(),
	tagTypes: ['AuthService'],
	endpoints: builder => ({
		login: builder.mutation<ILoginResponse, ILoginCredentials>({
			query: data => ({
				url: '/auth/login',
				method: 'post',
				data,
			}),
		}),

		verifySession: builder.mutation<IUserResponse, void>({
			query: () => ({
				url: '/user',
				method: 'get',
			}),
		}),

		logout: builder.mutation<ILogoutResponse, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'post',
			}),
		}),
	}),
});

export const { useLoginMutation, useVerifySessionMutation, useLogoutMutation } = authService;
