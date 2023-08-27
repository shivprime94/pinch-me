import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUserData = async user => {
	try {
		await EncryptedStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		console.error('Unable to save user data in device: ', error);
	}
};

export const retrieveUserData = async () => {
	try {
		const user = await EncryptedStorage.getItem('user');
		if (user) {
			return JSON.parse(user);
		} else {
			throw new Error('User data unavailable in device');
		}
	} catch (error) {
		console.error('Error retrieving user data: ', error);
	}
	return null;
};

export const removeUserData = async () => {
	try {
		await EncryptedStorage.removeItem('user');
	} catch (error) {
		console.error('Unable to remove user data');
	}
};
