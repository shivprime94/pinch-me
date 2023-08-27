import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URL, GAME_API_URL} from '../../utils/endpoints';
import axios from 'axios';

export const getDerivedMetrics = createAsyncThunk(
	'dashboard/getDerivedMetrics',
	async (coin, {getState}) => {
		const {global} = getState();
		try {
			const userId = global.user.id;
			const url = `${API_URL}/users/${userId}/derived_info/${coin}`;
			const config = {
				headers: {
					Token: global.user.pinch_token
				}
			};
			const response = await axios.get(url, config);
			const {data} = await response.data;
			return data;
		} catch (error) {
			console.error('Unable to fetch derived metrics: ', error);
		}
	}
);

export const createPreview = createAsyncThunk(
	'coin/createPreview',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isCopyTrader, isUserInGame} = global;
		try {
			let url;
			if (isCopyTrader) {
				url = `${isUserInGame ? GAME_API_URL : API_URL}/users/preview`;
			} else if (user) {
				url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
					user.id
				}/preview`;
			} else {
				throw {response: {data: {err: 'User not logged in'}}};
			}
			let response;
			if (params.shareLink) {
				url = url + `/${params.shareLink}`;
				console.log('first', url);
				response = await axios.get(url);
			} else {
				const config = {
					headers: {Token: user.pinch_token}
				};
				console.log('second', url);
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

export const getPreview = createAsyncThunk(
	'coin/getPreview',
	async (params, {getState}) => {
		const {global} = getState();
		const {user, isCopyTrader, isUserInGame} = global;
		try {
			let url;
			if (isCopyTrader) {
				url = `${isUserInGame ? GAME_API_URL : API_URL}/users/preview`;
			}
			if (user) {
				url = `${isUserInGame ? GAME_API_URL : API_URL}/users/${
					user.id
				}/preview`;
			}

			if (params.shareLink) {
				url = url + `/${params.shareLink}`;
				const response = await axios.get(url);
				const {data} = response.data;
				return data;
			} else {
				throw new Error('Share link not present in params');
			}
		} catch (error) {
			console.error('Unable to get preview: ', error);
		}
	}
);

export const getAllSymbols = createAsyncThunk(
	'coin/websocketSymbol',
	async (params, {getState}) => {
		const {global} = getState();
		const {user} = global;
		try {
			const url = GAME_API_URL + '/users/' + user.id + '/websocket_symbol';
			const response = await axios.get(url);
			const {data} = response.data;
			return data;
		} catch (error) {
			console.error('Unable to get websocket symbols: ', error);
		}
	}
);
