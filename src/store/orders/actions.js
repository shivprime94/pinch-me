import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL, GAME_API_URL} from '../../utils/endpoints';
import openTrades from '../../utils/static.json';

export const getCopiedOrders = createAsyncThunk(
	'dashboard/getCopiedTrades',
	async (params, {getState}) => {
		const {global} = getState();
		try {
			const userId = global.user.id;
			const url = `${API_URL}/users/${userId}/copy_trades`;
			const config = {
				headers: {Token: global.user.pinch_token}
			};
			const response = await axios.get(url, config);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to fetch copied trades: ', error);
		}
	}
);

export const putPinchOrder = createAsyncThunk(
	'preview/putPinchOrder',
	async (params, {getState}) => {
		const {global} = getState();
		try {
			const {isUserInGame, user} = global;
			const {id: userId, pinch_token} = user;
			const url = `${
				isUserInGame ? GAME_API_URL : API_URL
			}/users/${userId}/pinch_order`;
			const apiParams = {...params, user_id: userId};
			const config = {
				headers: {
					Token: pinch_token
				}
			};
			console.log('URL: ', url);
			console.log(apiParams);
			console.log(config);
			const response = await axios.put(url, apiParams, config);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to place pinch order: ', error);
		}
	}
);

export const executeSellOrders = createAsyncThunk(
	'preview/shareTrades',
	async (symbol, {getState}) => {
		try {
			const {global} = getState();
			const {isUserInGame, user} = global;
			const {id: userId, pinch_token} = user;
			const url = `${
				isUserInGame ? GAME_API_URL : API_URL
			}/users/${userId}/share_button_execution`;
			const config = {
				headers: {
					Token: pinch_token
				}
			};
			const payload = {
				asset: symbol
			};
			console.log(payload, url);
			const response = await axios.put(url, payload, config);
			console.log(response);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to execute sell orders: ', error);
			return error;
		}
	}
);

export const copySharedTrades = createAsyncThunk(
	'global/copySharedTrades',
	async (params, {getState}) => {
		const {global} = getState();
		const {isUserInGame, user} = global;
		const url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
			user.id
		}/copy_button_execution`;
		try {
			if (params.sharedLink) {
				const body = {
					share_trade_agg_link: params.sharedLink
				};
				const config = {
					headers: {
						Token: global.user.pinch_token
					}
				};
				const response = await axios.put(url, body, config);
				const {data} = await response.data;
				return data;
			} else {
				throw new Error('No share link_id provided');
			}
		} catch (error) {
			console.error(error);
		}
	}
);

export const cancelOrEditOrder = createAsyncThunk(
	'order/cancelOrEditOrder',
	async (params, {getState}) => {
		try {
			if (params) {
				const {global} = getState();
				const {user} = global;
				const url =
					GAME_API_URL + `/users/${user.id}/cancel_edit_order`;
				const response = await axios.put(url, params);
				console.log(response);
				const {data} = response.data;
				return data;
			} else {
				throw new Error('Params null');
			}
		} catch (error) {
			console.error('Unable to ' + params.status + ' order: ', error);
		}
	}
);

export const getOpenCopyTrades = createAsyncThunk(
	'global/getOpenCopyTrades',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isUserInGame} = global;
		const url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
			user.id
		}/open_copy_trades`;
		const config = {
			headers: {
				Token: user.pinch_token
			}
		};
		try {
			const staticData = openTrades;
			const response = await axios.get(url, config);
			const {data} = response.data;
			console.log('STATIC DATA: ', staticData);
			console.log('STATIC DATAAAA: ', staticData.data);
			if (data) {
				return data;
			} else {
				return staticData.data;
			}
		} catch (error) {
			console.error('Unable to get OPEN COPY TRADES: ', error);
			return error.response.data;
		}
	}
);

export const getExecutedCopyTrades = createAsyncThunk(
	'global/getExecutedCopyTrades',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isUserInGame} = global;
		const url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
			user.id
		}/executed_copy_trades`;
		const config = {
			headers: {
				Token: user.pinch_token
			}
		};
		try {
			const response = await axios.get(url, config);
			const {data} = await response.data;
			console.log('EXECUTED COPY TRADES ULR: ', url);
			console.log('EXECUTED COPY TRADES', data);
			return data;
		} catch (error) {
			console.error('Unable to get EXECUTED COPY TRADES: ', error);
			return error.response.data;
		}
	}
);

export const getSharedTrades = createAsyncThunk(
	'global/getSharedTrades',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isUserInGame} = global;
		const url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
			user.id
		}/shared_trades`;
		const config = {
			headers: {
				Token: user.pinch_token
			}
		};
		try {
			const response = await axios.get(url, config);
			const {data} = await response.data;
			console.log('SHARED TRADES ULR: ', url);
			console.log('SHARED TRADES', data);
			return data;
		} catch (error) {
			console.error('Unable to get SHARED TRADES: ', error);
			return error.response.data;
		}
	}
);
