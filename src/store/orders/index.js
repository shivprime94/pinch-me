import {createSlice} from '@reduxjs/toolkit';
import {initialState, reducers, extraReducers} from './reducers';

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers,
	extraReducers
});

export const {
	updateOrders,
	updateCopiedOrders,
	updateSellOrders,
	updateBuyOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;
