export function numberWithCommas(x) {
	const dollarUSLocale = Intl.NumberFormat('en-US');
	return dollarUSLocale.format(x);
}

export const precisionRound = (number, points = 2) => {
	const decimalPoints = Math.pow(10, points);
	return Math.round(number * decimalPoints) / decimalPoints;
};

export const toTitleCase = str => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
