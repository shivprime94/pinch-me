import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
	numberWithCommas,
	toTitleCase,
	precisionRound
} from '../../utils/helpers';
import {CryptoIcon} from '../../components/atoms';
import {Badge} from '@rneui/themed';
const ExecutedOrder = props => {
	const {coin, order} = props;
	return (
		<View style={styles.qualityContainer}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}>
				{
					<View>
						<CryptoIcon coin={coin}></CryptoIcon>
						<Badge
							status="success"
							badgeStyle={{
								height: 16,
								width: 16,
								borderRadius: 16
							}}
							containerStyle={{
								position: 'absolute',
								bottom: 0,
								right: 0
							}}></Badge>
					</View>
				}
				<View
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'flex-start',
						marginLeft: 23
					}}>
					<Text style={styles.styleText}>Sell Order</Text>
					<Text style={[styles.styleSubText]}>
						{coin.toUpperCase()}USDT
					</Text>
				</View>
			</View>
			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
					justifyContent: 'space-between',
					flex: 1
				}}>
				<Text
					style={[
						styles.styleText,
						{color: '#111111', textAlign: 'right'}
					]}>
					{numberWithCommas(order.Order.price)}
				</Text>
				<Text style={[styles.styleSubText, {textAlign: 'right'}]}>
					{toTitleCase(order.Order.type)}
					{'  '}
					<Text style={[styles.limitText, {textAlign: 'right'}]}>
						{precisionRound(order.Order.orig_qty, 4)}
					</Text>
				</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	qualityContainer: {
		minHeight: 70,
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		borderRadius: 8,
		padding: 20,
		alignItems: 'center'
	},
	styleText: {
		color: '#000',
		fontSize: 17,
		fontFamily: 'Inter-Medium',
		lineHeight: 20
	},
	styleSubText: {
		color: '#787a8d',
		fontSize: 15,
		fontFamily: 'Inter-Medium',
		lineHeight: 20
	},
	limitText: {
		color: '#000',
		fontSize: 15,
		fontFamily: 'Inter-Bold',
		lineHeight: 20
	}
});
export default ExecutedOrder;
