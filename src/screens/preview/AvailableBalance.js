import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {updateBalance, updateSymbol} from '../../store/global';
import {getAccountInfo} from '../../store/global/actions';
import {View, Text, StyleSheet} from 'react-native';
import {numberWithCommas} from '../../utils/helpers';
import {Divider} from '@rneui/themed';
function AvailableBalance(props) {
	const dispatch = useDispatch();
	const {data} = props;
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const account = useSelector(state => state.global.account);
	const deductableSum = _.sum(data?.map(i => Number(i?.Order?.orig_qty)));
	const [currentBalance, updateCurrentBalance] = useState(null);
	const [balanceSymbol, updateBalanceSymbol] = useState(null);

	useEffect(() => {
		if (isCopyTrader) {
			const balanceSymbol = 'USDT';
			let balance = account?.find(i => i.asset === balanceSymbol)[
				'available_balance'
			];
			balance = Number(balance) - deductableSum;
			updateCurrentBalance(balance);
			dispatch(updateBalance(balance));
			updateBalanceSymbol(balanceSymbol);
		} else if (currentSymbol && account?.length) {
			let balance = account?.find(
				i => i.asset.toLowerCase() === currentSymbol.toLowerCase()
			)['available_balance'];
			balance = Number(balance) - deductableSum;
			updateCurrentBalance(balance);
			dispatch(updateBalance(balance));
			updateBalanceSymbol(currentSymbol);
		}
	}, [currentSymbol, account]);

	return (
		<View>
			<View style={styles.return_container_child}>
				<Text style={styles.styleText}>Available Balance</Text>
				<Text style={styles.styleText}>
					{currentBalance &&
						currentSymbol &&
						numberWithCommas(currentBalance.toFixed(5))}{' '}
					{balanceSymbol}
				</Text>
			</View>
			<Divider
				color={'rgba(0, 0, 0, 0.3)'}
				style={{marginHorizontal: 16}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	return_container_child: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16
	},
	styleText: {
		color: '#000',
		fontSize: 20,
		fontFamily: 'Inter-Bold',
		lineHeight: 29
	}
});
export default AvailableBalance;
