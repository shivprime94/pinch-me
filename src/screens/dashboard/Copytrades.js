import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CopyTradeOpenCard from './CopyOpenTradeCard';
import CopyTradeExecutedCard from './CopyExecutedTradesCard';
import {CryptoIcon} from '../../components/atoms';
const Copytrades = props => {
	const {copiedOrders, coin} = props;
	const openTrades = copiedOrders.filter(
		trade => trade.base_asset === coin.asset && trade.status === 'NEW'
	);
	const executedTrades = copiedOrders.filter(
		trade => trade.base_asset === coin.asset && trade.status === 'FILLED'
	);
	// console.log('openTrades', openTrades.length, executedTrades.length);
	return (
		<View
			style={{
				marginHorizontal: 16,
				marginVertical: 16
			}}>
			<View style={styles.coin_card}>
				{<CryptoIcon coin={coin.asset.toLowerCase()} />}
				<View style={styles.coin_name_container}>
					<Text style={styles.styleTextName}>
						{coin.asset.toUpperCase()}
					</Text>
					<Text style={styles.styleTextPrice}>0.054</Text>
				</View>
			</View>
			{Boolean(openTrades.length) && (
				<CopyTradeOpenCard coin={coin} openTrades={openTrades} />
			)}
			{Boolean(executedTrades.length) && (
				<CopyTradeExecutedCard
					coin={coin}
					executedTrades={executedTrades}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	coin_card: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#fff',
		marginTop: 10
	},
	coin_name_container: {
		marginTop: 5,
		marginLeft: 10
	},
	styleTextName: {
		color: '#70747C',
		fontSize: 16,
		lineHeight: 18,
		fontFamily: 'Inter-Regular'
	},
	styleTextPrice: {
		color: '#141B29',
		fontFamily: 'Inter-Bold',
		fontSize: 18,
		lineHeight: 21
	},
	styleHeading: {
		color: '#000',
		fontSize: 20,
		fontFamily: 'Inter-Bold',
		marginTop: 10,
		padding: 16
	}
});

export default Copytrades;
