import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateInstruments} from '../store/global';

const BASE_URL = 'wss://stream.binance.com:9443';

const useLiveDataProvider = () => {
	const dispatch = useDispatch();
	const [livePriceURL, updateLivePriceURL] = useState(null);
	const clientPrice = useRef(null);

	const toLowerCaseAndAppendUSDT = symbol => {
		if (!symbol.toLowerCase().includes('usdt')) {
			return symbol.toLowerCase() + 'usdt';
		}
		return symbol.toLowerCase();
	};

	useEffect(() => {
		if (livePriceURL) {
			console.log('Websocket url: ', livePriceURL);
			const webSocketObject = new WebSocket(livePriceURL);
			clientPrice.current = webSocketObject;

			clientPrice.current.onopen = () =>
				console.log('Websocket client connected');
			clientPrice.current.onmessage = event => {
				const response = JSON.parse(event.data);
				const liveData = {
					price: Number(response['c']).toFixed(2),
					symbol: response['s'],
					percentageChange: response['P']
				};
				dispatch(updateInstruments(liveData));
			};
			clientPrice.current.onclose = () => {
				console.log('Connection closed');
			};
		}
		return () => {
			clientPrice.current?.close();
		};
	}, [dispatch, livePriceURL]);

	const setupBinanceConnection = symbols => {
		const combineAssetNames = () => {
			let URL = '';
			symbols.map((symbol, index) => {
				URL += toLowerCaseAndAppendUSDT(symbol) + '@ticker';
				if (index !== symbols.length - 1) {
					URL += '/';
				}
			});
			return URL;
		};

		let combinedURL = combineAssetNames();

		const livePriceURL = BASE_URL + `/ws/${combinedURL}`;
		updateLivePriceURL(livePriceURL);
	};

	return setupBinanceConnection;
};

export default useLiveDataProvider;
