import {getTips, getTraders} from './actions';

export const initialState = {
	tips: null,
	traders: null
};

export const reducers = {
	updateTips: (state, action) => {
		state.tips = action.payload;
	},
	updateTraders: (state, action) => {
		state.traders = action.payload;
	}
};

export const extraReducers = builder => {
	builder
		.addCase(getTips.pending, (state, action) => {
			console.info('Fetching tips...');
		})
		.addCase(getTips.fulfilled, (state, action) => {
			if (!action.payload.err) {
				state.tips = action.payload;
			}
		})
		.addCase(getTraders.pending, () => {
			console.info('Fetching traders...');
		})
		.addCase(getTraders.fulfilled, (state, action) => {
			console.log(action.payload);
			if (!action.payload.err) {
				state.traders = action.payload;
			}
		});
};
