import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import Know_More from 'react-native-vector-icons/Feather';
import {
	numberWithCommas,
	toTitleCase,
	precisionRound
} from '../../utils/helpers';
import {CryptoIcon} from '../../components/atoms';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from 'react-native-popup-menu';
import {Avatar, Badge} from '@rneui/themed';

const Order = props => {
	const {
		coin,
		order,
		handleOrderEdit,
		handleOrderDelete,
		handleInGameOrderDelete,
		editable
	} = props;
	const typeOfOrder = order.side.charAt(0).toUpperCase() + order.side.slice(1).toLowerCase();
	const hasOrderExecuted = order.orderId && !order.pinch_order_id;
	return (
		<View style={styles.qualityContainer}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					flex: 0.8
				}}>
				<Avatar
					containerStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						borderRadius: 31,
						width: 40,
						height: 40,
						backgroundColor: 'rgb(189,189,189)'
					}}>
					{
						<>
							<CryptoIcon
								coin={coin}
								coinStyle={{
									marginBottom: 2
								}}
							/>
							{hasOrderExecuted && (
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
									}}
								/>
							)}
						</>
					}
				</Avatar>
				<View
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'flex-start'
						// marginLeft: 20
					}}>
					<Text style={styles.styleText}>{typeOfOrder} Order</Text>
					<Text style={[styles.styleSubText]}>
						{coin.toUpperCase()}USDT
					</Text>
				</View>
			</View>
			<View
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flex: 1
				}}>
				<Text
					style={[
						styles.styleText,
						{color: '#111111', textAlign: 'right'}
					]}>
					{numberWithCommas(order.price)}
				</Text>
				<Text style={[styles.styleSubText, {textAlign: 'right'}]}>
					{toTitleCase(order.type)}
					{'  '}
					<Text style={[styles.limitText, {textAlign: 'right'}]}>
						{precisionRound(parseFloat(order.orig_qty), 4)}
					</Text>
				</Text>
			</View>
			{editable && (
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Menu>
						<MenuTrigger>
							<Know_More
								name="more-vertical"
								size={20}
								color={'#444'}
								style={{marginLeft: 10}}></Know_More>
						</MenuTrigger>
						<MenuOptions
							style={{
								margin: 10
							}}>
							<MenuOption
								onSelect={() => {
									handleOrderEdit(order);
								}}>
								<Text style={styles.optionText}>
									Edit Order
								</Text>
							</MenuOption>
							<MenuOption
								onSelect={() => {
									handleOrderDelete(order);
								}}>
								<Text style={styles.optionText}>
									Delete Order
								</Text>
							</MenuOption>
						</MenuOptions>
					</Menu>
				</View>
			)}
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
		borderRadius: 12,
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
	},
	Icon: {
		color: '#F7931A'
	},
	modal: {
		justifyContent: 'center',
		margin: 0
	},
	modal_conatainer: {
		width: '30%',
		height: '30%'
	},
	optionText: {
		color: '#1F1F1F',
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		lineHeight: 20
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Inter-Regular'
	},
	openButton: {
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 10
		// elevation: 2,
		// margin: 10,
		// borderColor: '#01B2AB',
		// borderWidth: 1
	},
	textStyle: {
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		color: '#01B2AB'
	},
	modalButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});
export default Order;
