import * as SecureStore from 'expo-secure-store';

export const localStorage = {
	async storeData(key: string, value: string): Promise<void> {
		try {
			await SecureStore.setItemAsync(key, value);
		} catch (error) {
			console.error('Error saving tokens:', error);
			throw error;
		}
	},

	async getData(key: string): Promise<string | null> {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (error) {
			console.error('Error getting access token:', error);
			return null;
		}
	},

	async removeData(key: string): Promise<void> {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch (error) {
			console.error('Error clearing tokens:', error);
		}
	},
};
