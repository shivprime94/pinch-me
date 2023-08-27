import axios from 'axios';
const baseURL = 'https://api3.binance.com';

const getStartTimeOfData = (interval, numberOfDataPoints) => {
	const currentTimeInMilliseconds = Date.now();
	switch (interval) {
		case '15m':
			const millisecondsIn15Minutes = 1000 * 60 * 15;
			return (
				currentTimeInMilliseconds -
				millisecondsIn15Minutes * numberOfDataPoints
			);
		case '30m':
			const millisecondsIn30Minutes = 1000 * 60 * 30;
			return (
				currentTimeInMilliseconds -
				millisecondsIn30Minutes * numberOfDataPoints
			);
		case '1h':
			const millisecondsIn1Hour = 1000 * 60 * 60;
			return (
				currentTimeInMilliseconds -
				millisecondsIn1Hour * numberOfDataPoints
			);
		case '1d':
			const millisecondsIn1Day = 1000 * 60 * 60 * 24;
			return (
				currentTimeInMilliseconds -
				millisecondsIn1Day * numberOfDataPoints
			);
	}
};

export default async function getStockData({symbol, interval, endTime, limit}) {
	const sym = symbol;
	let url;
	if (interval === 'default') {
		url =
			baseURL +
			`/api/v3/klines?symbol=${sym}&interval=${'4h'}&limit=${limit}&endTime=${endTime}`;
	} else {
		url =
			baseURL +
			`/api/v3/klines?symbol=${sym}&interval=${interval}&limit=${limit}&endTime=${endTime}`;
	}

	let response = await axios.get(url).then(response => response);
	response = response?.data.map(i => {
		return {price: Number(i[4]), time: Number(i[6])};
	});
	console.log(url);
	console.log(response);

	return response;
}

export async function getHomepageChartData() {
	const symbol = 'BTCUSDT';
	const interval = '1d';
	const url = `/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${136}&startTime=1626633000000&endTime=1638201600000`;
	let response = await axios.get(url).then(response => response);
	response = response?.data.map(i => {
		return {price: Number(i[4]), time: Number(i[6])};
	});

	return response;
}
