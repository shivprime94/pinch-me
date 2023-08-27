import React from 'react';
import {binanceCryptoIcons} from 'binance-icons';
import placeholderIcon from '../../assets/placeholderIcon.svg';
import {SvgXml} from 'react-native-svg';
const CryptoIcon = ({coin, coinStyle}) => {
	const symbol = coin?.toLowerCase();
	let Icon;
	if (binanceCryptoIcons.has(symbol)) {
		Icon = binanceCryptoIcons.get(symbol);
	} else {
		Icon = placeholderIcon;
	}
	const xml = `${Icon}`;
	return <SvgXml xml={xml} width="40" height="40" {...coinStyle} />;
};
export default CryptoIcon;
