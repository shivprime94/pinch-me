import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Card from './Card';
import Tabs from './Tabs';
import {getOpenCopyTrades} from '../../../store/orders/actions';

const Portfolio = () => {
	const dispatch = useDispatch();
	const account = useSelector(state => state.global.account);
	let coins = null;
	if (Array.isArray(account)) {
		coins = account?.filter(coin => coin.asset !== 'USDT');
	}

	useEffect(() => {
		dispatch(getOpenCopyTrades());
	}, []);

	return (
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
			<Tabs />
		</ScrollView>
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

export default Portfolio;
