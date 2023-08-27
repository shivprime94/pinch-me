import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL, GAME_API_URL} from '../../utils/endpoints';

export const putUser = createAsyncThunk(
	'global/putUser',
	async (params, {getState}) => {
		const {global} = getState();
		try {
			let url;
			const {isUserInGame} = global;
			if (isUserInGame) {
				url = `${GAME_API_URL}/users/profile`;
			} else {
				url = `${API_URL}/users/profile`;
			}
			const response = await axios.put(url, params.user);
			const {data} = await response.data;
			// addToLocal('userDetails', data);
			return {...data, isCopyTrader: params.isCopyTrader};
		} catch (error) {
			console.error('Unable to put user', error);
		}
	}
);

export const verifyBinanceDetails = createAsyncThunk(
	'global/verifyBinanceDetails',
	async (authToken, {getState}) => {
		try {
			const url = `${API_URL}/users/auth/${authToken}`;
			const response = await axios.get(url);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to get access token', error);
			return error.response.data;
		}
	}
);

export const putBinanceDetails = createAsyncThunk(
	'global/putBinanceDetails',
	async ({apiKey, apiSecret}, {getState}) => {
		const {global} = getState();
		try {
			const userId = global.user.id;
			const url = `${API_URL}/users/${userId}/binance_details`;
			const config = {
				headers: {
					Token: global.pinch_token
				}
			};
			const apiParams = {
				binance_auth_token: apiKey,
				binance_access_token: apiSecret
			};

			let binanceResp = await axios.put(url, apiParams, config);
			const {data} = await binanceResp.data;
			return data;
		} catch (error) {
			console.error(
				'Unable to put users binance details: ',
				error?.response.data
			);
			return error.response.data;
		}
	}
);

export const putPinchOrder = createAsyncThunk(
	'global/putPinchOrder',
	async (params, {getState}) => {
		const {global} = getState();
		try {
			const url = `${API_URL}/users/${global.user.id}/pinch_order`;
			const config = {
				headers: {
					Token: global.user.pinch_token
				}
			};
			const response = await axios.put(url, params, config);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to place pinch order: ', error);
		}
	}
);

export const createPreview = createAsyncThunk(
	'global/createPreview',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isCopyTrader} = global;
		try {
			let url;
			if (user) {
				url = `${API_URL}/users/${user.id}/preview`;
			} else if (isCopyTrader) {
				url = `${API_URL}/users/preview`;
			} else {
				throw {response: {data: {err: 'User not logged in'}}};
			}
			const config = {
				headers: {
					Token: user.pinch_token
				}
			};
			let response;
			if (params.sharedLink) {
				url = url + `/${params.sharedLink}`;
				response = await axios.get(url, config);
			} else {
				response = await axios.put(url, {asset: params.asset}, config);
			}
			const {data} = await response.data;
			console.log(data);
			return data;
		} catch (error) {
			console.error('Unable to create preview: ', error);
			return error.response.data;
		}
	}
);

export const getAccountInfo = createAsyncThunk(
	'global/getAccountInfo',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isUserInGame} = global;
		let url = `${API_URL}/users/${user.id}/account`;
		if (isUserInGame) {
			url = GAME_API_URL + `/users/${user.id}/account_for_wallet`;
		}
		const config = {
			headers: {
				Token: user.pinch_token
			}
		};
		try {
			const response = await axios.get(url, config);
			const {data} = await response.data;
			console.log('ACCOUNT ULR: ', url);
			console.log('ACCOUNT INFO', data);
			return data;
		} catch (error) {
			console.error('Unable to get account information: ', error);
			return error.response.data;
		}
	}
);
