import {createSlice} from '@reduxjs/toolkit';
import {initialState, reducers, extraReducers} from './reducers';

export const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers,
	extraReducers
});

export const {
	changeStockTicker,
	updateChartData,
	updateAPIChartData,
	updateInterval,
	setPreviewDetails
} = coinsSlice.actions;

export default coinsSlice.reducer;
