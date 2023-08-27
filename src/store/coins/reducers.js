import {
	getDerivedMetrics,
	createPreview,
	getPreview,
	getAllSymbols
} from './actions';

export const initialState = {
	stockTicker: {
		stockPrice: 0,
		stockName: null,
		percentageChange: 0
	},
	apiChartData: [],
	websocketChartData: {},
	interval: '4h',
	previewDetails: null,
	aggregateSymbols: null
};

export const reducers = {
	changeStockTicker: (state, action) => {
		state.stockTicker.stockPrice = action.payload.price;
		state.stockTicker.stockName = action.payload.symbol;
		state.stockTicker.percentageChange = action.payload.percentageChange;
	},
	updateChartData: (state, action) => {
		state.websocketChartData = action.payload;
	},
	updateAPIChartData: (state, action) => {
		state.apiChartData = action.payload;
	},
	updateInterval: (state, action) => {
		state.interval = action.payload;
	},
	setPreviewDetails: (state, action) => {
		state.previewDetails = action.payload;
	},
	setAssets: (state, action) => {
		state.assets = action.payload;
	}
};

export const extraReducers = builder => {
	builder
		.addCase(getDerivedMetrics.fulfilled, (state, action) => {
			state.derivedMetrics = action.payload;
		})
		.addCase(createPreview.fulfilled, (state, action) => {
			state.previewDetails = action.payload;
		})
		.addCase(getPreview.pending, () => {
			console.info('Getting preview details');
		})
		.addCase(getPreview.fulfilled, (state, action) => {
			state.previewDetails = action.payload;
		})
		.addCase(getAllSymbols.pending, () => {
			console.info('Getting all symbols for user');
		})
		.addCase(getAllSymbols.fulfilled, (state, action) => {
			state.aggregateSymbols = action.payload;
		});
};
