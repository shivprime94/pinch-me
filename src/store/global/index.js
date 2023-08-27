import {createSlice} from '@reduxjs/toolkit';
import {initialState, reducers, extraReducers} from './reducers';

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers,
	extraReducers
});

export const {
	updateUser,
	updateSymbol,
	updateWallet,
	updateAccount,
	updateInstruments,
	updateBalance,
	updateUserDetails,
	putBinanceDetails,
	copySharedTrades,
	updateShareLink
} = globalSlice.actions;

export default globalSlice.reducer;
