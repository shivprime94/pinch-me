import {getCopiedOrders, putPinchOrder, getOpenCopyTrades} from './actions';

export const initialState = {
	orders: null,
	copiedOrders: null,
	sellOrders: null,
	buyOrders: null
};

export const reducers = {
	updateOrders: (state, action) => {
		state.orders = action.payload;
	},
	updateCopiedOrders: (state, action) => {
		state.copiedOrders = action.payload;
	},
	updateSellOrders: (state, action) => {
		state.sellOrders = action.payload;
	},
	updateBuyOrders: (state, action) => {
		state.buyOrders = action.payload;
	}
};

export const extraReducers = builder => {
	builder
		.addCase(getCopiedOrders.pending, () => {
			console.log('Fetching copied trades...');
		})
		.addCase(getCopiedOrders.fulfilled, (state, action) => {
			state.copiedOrders = action.payload;
		})
		.addCase(putPinchOrder.fulfilled, (state, action) => {})
		.addCase(getOpenCopyTrades.pending, () => {
			console.info('Getting open copied trades');
		})
		.addCase(getOpenCopyTrades.fulfilled, (state, action) => {
			state.copiedOrders = action.payload;
		});
};
