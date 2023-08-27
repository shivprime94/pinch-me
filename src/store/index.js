import {configureStore} from '@reduxjs/toolkit';
import globalReducer from './global';
import ordersReducer from './orders';
import coinsReducer from './coins';
import gameReducer from './game';

export default configureStore({
	reducer: {
		global: globalReducer,
		orders: ordersReducer,
		coins: coinsReducer,
		game: gameReducer
	}
});
