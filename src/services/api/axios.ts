import axiosLib from 'axios';

import { localStorage } from '@/src/services/api/storage';
import { TOKEN_ACCESS_KEY } from '../../modules/auth/interfaces';

const axios = axiosLib.create({
	baseURL: process.env.EXPO_PUBLIC_REACT_APP_API_URL + '/api',
	timeout: 40000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

axios.interceptors.request.use(async (config: any) => {
	const token = await localStorage.getData(TOKEN_ACCESS_KEY);
	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token.toString()}`,
		};
	}
	return config;
});

export { axios };
