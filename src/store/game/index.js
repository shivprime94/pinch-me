import {createSlice} from '@reduxjs/toolkit';
import {initialState, reducers, extraReducers} from './reducers';

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers,
	extraReducers
});

export const {updateTips} = gameSlice.actions;

export default gameSlice.reducer;
