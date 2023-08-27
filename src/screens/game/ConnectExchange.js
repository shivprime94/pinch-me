import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CryptoIcon, Button} from '../../components/atoms';
import BinanceIcon from '../../assets/binance-icon.svg';
import BitbnsIcon from '../../assets/Bitbns.svg';
const ConnectExchangeItem = ({name}) => {
	return (
		<View style={styles.subCard}>
			<View
				style={{
					flexDirection: 'row'
				}}>
				{name === 'Binance' ? (
					<BinanceIcon width={42} height={42} />
				) : (
					<BitbnsIcon width={42} height={42} />
				)}
				<View
					style={{
						marginLeft: 20
					}}>
					<Text style={styles.subCardHeading}>{name}</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 2
						}}>
						{name === 'Binance' ? (
							<Text
								style={{
									...styles.subCardSubHeading,
									color: '#22C008'
								}}>
								Connected
							</Text>
						) : (
							<Text
								style={{
									...styles.subCardSubHeading,
									color: '#D00202'
								}}>
								Not Connected
							</Text>
						)}
					</View>
				</View>
			</View>
			<Button buttonStyle={styles.iconStyle}>
				<Icon name="right" size={10} color="#152554" />
			</Button>
		</View>
	);
};
const ConnectExchange = () => {
	return (
		<View style={styles.modelContainer}>
			{ConnectExchangeItem({name: 'Binance'})}
			{ConnectExchangeItem({name: 'Bitbns'})}
		</View>
	);
};
const styles = StyleSheet.create({
	modelContainer: {
		backgroundColor: '#F0F4FF',
		height: 400,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: 'center'
	},
	subCard: {
		backgroundColor: '#fff',
		width: Dimensions.get('screen').width - 40,
		display: 'flex',
		flexDirection: 'row',
		padding: 20,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10
	},
	subCardHeading: {
		fontSize: 18,
		fontFamily: 'Inter-Bold',
		color: '#000000',
		lineHeight: 22
	},
	subCardSubHeading: {
		fontSize: 14,
		fontFamily: 'Inter-Bold',
		lineHeight: 17
	},
	iconStyle: {
		backgroundColor: '#F0F0F0',
		borderRadius: 20,
		padding: 10,
		marginLeft: 10
	}
});
export default ConnectExchange;
