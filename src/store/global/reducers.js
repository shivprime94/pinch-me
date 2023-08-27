import {
	putUser,
	verifyBinanceDetails,
	putBinanceDetails,
	putPinchOrder,
	createPreview,
	getAccountInfo,
	copySharedTrades
} from './actions';
import {updateOrders} from '../orders';
import {storeUserData, removeUserData} from '../../utils/app-storage';

export const initialState = {
	user: null,
	currentSymbol: 'ETH',
	currentBalance: 0,
	instrumentsData: [],
	initialAssetsCurrentPrice: [],
	initialAssetsChangePercentage: [],
	newOrders: [],
	orders: [],
	accessToken: null,
	previewDetails: null,
	account: null,
	wallet: null,
	isCopyTrader: false,
	showLoader: false,
	toastMessage: null,
	accessTokenExpired: false,
	shareLink: null,
	isUserInGame: true
};

export const reducers = {
	updateShareLink: (state, action) => {
		state.shareLink = action.payload;
		state.isCopyTrader = Boolean(action.payload);
	},
	updateUser: (state, action) => {
		state.user = action.payload;
	},
	updateUserDetails: (state, action) => {
		state.userDetails = action.payload;
	},
	updateWallet: (state, action) => {
		state.wallet = action.payload;
	},
	updateAccount: (state, action) => {
		state.account = action.payload;
	},
	updateSymbol: (state, action) => {
		state.currentSymbol = action.payload;
	},
	updateBalance: (state, action) => {
		state.currentBalance = action.payload;
	},
	updateNewOrders: (state, action) => {
		state.newOrders.push(action.payload);
	},
	updateInstruments: (state, action) => {
		if (
			!state.instrumentsData.some(i => i.symbol === action.payload.symbol)
		) {
			state.instrumentsData.push(action.payload);
		} else {
			const index = state.instrumentsData.findIndex(
				i => i.symbol === action.payload.symbol
			);
			state.instrumentsData[index] = action.payload;
		}
		// const socketData = action.payload;
		// try {
		// 	if (!state.instrumentsData) {
		// 		state.instrumentsData = new Map();
		// 	}
		// 	state.instrumentsData.set(socketData.symbol, socketData);
		// } catch (error) {
		// 	console.error(error);
		// }
	}
};

export const extraReducers = builder => {
	builder
		.addCase(putUser.pending, (state, action) => {
			console.info('Adding user to pinch...');
		})
		.addCase(putUser.fulfilled, (state, action) => {
			try {
				if (action.payload) {
					state.user = action.payload;
					storeUserData(action.payload);
				} else {
					throw new Error('Payload is null: ', action.payload);
				}
			} catch (error) {
				console.error('Unable to store user details in state: ', error);
			}
		})
		.addCase(verifyBinanceDetails.fulfilled, (state, action) => {
			state.user = {...state.user, pinch_token: action.payload};
		})
		.addCase(putBinanceDetails.fulfilled, (state, action) => {
			if (action.payload.err) {
				// removeFromLocal('accessToken');
				// removeFromLocal('userDetails');
				state.userDetails = null;
				state.accessTokenExpired = true;
				state.toastMessage =
					'Your session has expired. Please login to continue.';
			} else if (action.payload?.data === 'success') {
				state.userDetails = {...state.userDetails, binance_code: 2};
				state.binanceDetails = action.payload;
			}
		})
		.addCase(createPreview.fulfilled, (state, action) => {
			if (action.payload.err) {
				// removeFromLocal('accessToken');
				// removeFromLocal('userDetails');
				state.userDetails = null;
				state.accessToken = null;
				state.accessTokenExpired = true;
				state.toastMessage = action.payload.err;
			} else {
				state.orders = action.payload.order_proportion;
				state.previewDetails = action.payload;
			}
		})
		.addCase(getAccountInfo.rejected, (state, action) => {
			console.info('Rejected: ', action.payload);
			removeUserData();
		})
		.addCase(getAccountInfo.fulfilled, (state, action) => {
			if (action.payload.err) {
				removeUserData();
				state.user = null;
				state.accessToken = null;
				state.accessTokenExpired = true;
				state.toastMessage =
					'Your session has expired. Please login to continue.';
			} else {
				state.account = action.payload;
			}
		});
};
