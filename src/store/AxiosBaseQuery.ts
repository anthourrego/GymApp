import { axios as axiosInstance } from '@/src/services/api/axios';

const axiosBaseQuery =
	({ baseUrl } = { baseUrl: '' }) =>
	async ({
		url,
		method,
		data,
		params,
		headers,
		responseType = 'json',
	}: {
		url: string;
		method: string;
		data?: any;
		params?: any;
		headers?: any;
		responseType?: 'json' | 'blob' | 'text' | 'arraybuffer' | 'document' | 'stream';
	}) => {
		try {
			const result = await axiosInstance({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: {
					...headers,
				},
				responseType,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as any;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export default axiosBaseQuery;
