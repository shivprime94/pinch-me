import React, {useEffect, useState} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Text,
	ImageBackground
} from 'react-native';
import Card from './Card';
import Copytrades from './Copytrades';
import EmptyCopyTrades from './EmptyCopyTrades';
import {getCopiedOrders} from '../../store/orders/actions';
import {useDispatch, useSelector} from 'react-redux';

const CopiedTrades = ({coins, copiedOrders}) => {
	//coins that actually have copied orders
	coins = coins.filter(coin => {
		return copiedOrders.some(order => order.base_asset === coin.asset);
	});
	// console.log('coins', coins, copiedOrders);
	return (
		<View>
			<Text style={styles.styleHeading}>Your Copied Trades</Text>
			{coins.map((coin, index) => (
				<Copytrades
					key={index}
					coin={coin}
					copiedOrders={copiedOrders}
				/>
			))}
		</View>
	);
};

const Dashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCopiedOrders());
	}, [dispatch]);
	const account = useSelector(state => state.global.account);
	const copiedOrders = useSelector(state => state.orders.copiedOrders);
	let coins = null;
	if (Array.isArray(account)) {
		coins = account?.filter(coin => coin.asset !== 'USDT');
	}

	// console.log('coins', coins, copiedOrders, coins);
	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
				<ScrollView
					horizontal={true}
					style={styles.card_container}
					contentContainerStyle={{flexGrow: 1}}>
					{account &&
						Array.isArray(account) &&
						coins.map((coin, index) => (
							<Card
								key={index}
								showRed={Boolean(index % 2)}
								symbol={coin.asset}
							/>
						))}
				</ScrollView>
				{coins && copiedOrders ? (
					<CopiedTrades coins={coins} copiedOrders={copiedOrders} />
				) : (
					<EmptyCopyTrades />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	card_container: {
		flex: 1
	},
	copiedTrades_container: {
		flexGrow: 1
	},
	styleHeading: {
		color: '#000',
		fontSize: 20,
		fontFamily: 'Inter-Bold',
		lineHeight: 24,
		marginTop: 10,
		paddingHorizontal: 16
	}
});
export default Dashboard;
