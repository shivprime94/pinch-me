import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {GAME_API_URL} from '../../utils/endpoints';

export const getTips = createAsyncThunk('game/getTips', async () => {
	try {
		const url = GAME_API_URL + '/homepage';
		const response = await axios.get(url);
		const {data} = await response.data;

		return data;
	} catch (error) {
		console.error('Unable to fetch tips: ', error);
	}
});

export const getTraders = createAsyncThunk('game/getTraders', async params => {
	const {asset} = params;
	try {
		const url = GAME_API_URL + '/homepage/' + asset;
		console.log(url);
		const response = await axios.get(url);
		const {data} = response.data;
		return data;
	} catch (error) {
		console.error('Unable to fetch traders: ', error);
	}
})