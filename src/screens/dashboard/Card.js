import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/atoms/Button';
import HorizontalLine from '../../components/atoms/HorizontalLine';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getDerivedMetrics} from '../../store/coins/actions';
import {numberWithCommas} from '../../utils/helpers';
import {CryptoIcon} from '../../components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import {useBinanceSocket} from '../../hooks';

const DynamicDataView = ({symbol}) => {
	const coinSocketData = useBinanceSocket(symbol);
	return (
		<View style={styles.price_container}>
			<View style={styles.logo_container}>
				{<CryptoIcon coin={symbol} />}
				<View style={styles.amount_container}>
					<Text style={[styles.symbolText]}>{symbol}</Text>
					<Text style={styles.symbolValue}>
						{coinSocketData?.price}
					</Text>
				</View>
			</View>
			{parseFloat(coinSocketData?.percentageChange) >= 0 ? (
				<View style={styles.percentage_container}>
					<Text style={[styles.symbolPercentage, {color: '#00C853'}]}>
						{parseFloat(coinSocketData?.percentageChange).toFixed(
							2
						)}
						%
					</Text>
					<Icon
						name="arrow-up-bold"
						size={12}
						color={'#00C853'}
						style={{marginLeft: 2, marginTop: -1.5}}
					/>
				</View>
			) : (
				<View style={styles.percentage_container}>
					<Text style={[styles.symbolPercentage, {color: '#F43A3A'}]}>
						{parseFloat(coinSocketData?.percentageChange).toFixed(
							2
						)}
						%
					</Text>
					<Icon
						name="arrow-down-bold"
						size={12}
						color={'#F43A3A'}
						style={{marginLeft: 2}}
					/>
				</View>
			)}
		</View>
	);
};

const Card = props => {
	const {showRed, symbol} = props;
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [totalQuantity, setTotalQuantity] = useState(null);
	const [averageBuyPrice, setAverageBuyPrice] = useState(null);
	const account = useSelector(state => state.global.account);
	const coin = account?.filter(coin => coin.asset === symbol)[0];
	useEffect(() => {
		if (coin) {
			setTotalQuantity(
				numberWithCommas(
					parseFloat(
						coin.available_balance + coin.freeze_balance
					).toFixed(2)
				)
			);
			const derivedMetrics = dispatch(getDerivedMetrics(symbol));
			derivedMetrics.then(({payload}) => {
				if (payload?.asset) {
					setAverageBuyPrice(
						numberWithCommas(
							parseFloat(
								isNaN(payload.average_buy_price)
									? '-'
									: payload.average_buy_price
							).toFixed(2)
						)
					);
				}
			});
		}
	}, [coin, dispatch]);

	const handlePress = () => {
		navigation.navigate('Preview', {symbol: symbol});
	};

	return (
		<View>
			<LinearGradient
				colors={
					showRed ? ['#F43A3A', '#F7931A'] : ['#028090', '#00bfb2']
				}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 0}}
				locations={[0.1, 0.9]}
				style={styles.card_container}>
				<DynamicDataView symbol={symbol} />
				<HorizontalLine lineStyle={styles.horizontalLine} />
				<View style={styles.prcQuantity_container}>
					<View>
						<Text style={styles.insLableText}>Total QTY</Text>
						<Text style={styles.insValueText}>{totalQuantity}</Text>
					</View>
					{averageBuyPrice && (
						<View>
							<Text style={styles.insLableText}>
								Average Buy Price
							</Text>
							<Text style={styles.insValueText}>
								{averageBuyPrice}
							</Text>
						</View>
					)}
				</View>
				<View>
					<Button
						textStyle={styles.buttonTextStyle}
						buttonStyle={styles.buttonStyle}
						onPress={handlePress}>
						Create preview and share
					</Button>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	card_container: {
		backgroundColor: '#028090',
		borderRadius: 12,
		padding: 16,
		margin: 16,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minWidth: 300
	},
	// red_card_container: {
	// 	backgroundColor: '#f53333'
	// },
	price_container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	logo_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	amount_container: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 10
	},
	percentage_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 55,
		height: 19,
		backgroundColor: '#FFFFFF',
		borderRadius: 3,
		paddingTop: 2,
		paddingRight: 8,
		paddingBottom: 2,
		paddingLeft: 8,
		margin: 'auto'
	},
	prcQuantity_container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
		marginBottom: 16
	},
	insValueText: {
		color: '#fff',
		fontFamily: 'Inter-Bold',
		fontSize: 20,
		lineHeight: 24,
		fontStyle: 'normal'
	},
	symbolValue: {
		color: '#fff',
		fontFamily: 'Inter-SemiBold',
		fontSize: 20,
		lineHeight: 24.2,
		fontStyle: 'normal'
	},
	symbolText: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 19.36,
		fontFamily: 'Inter-Medium'
	},
	symbolPercentage: {
		// color: '#fff',
		fontSize: 11,
		lineHeight: 14.2,
		fontFamily: 'Inter-Bold'
	},
	insLableText: {
		color: '#fff',
		opacity: 0.8,
		fontSize: 14,
		lineHeight: 17,
		fontFamily: 'Inter-Medium',
		fontStyle: 'normal'
	},
	// styleLightText: {
	// 	color: '#fff',
	// 	opacity: 0.8,
	// 	fontSize: 16,
	// 	lineHeight: 19.36,
	// 	fontFamily: 'Inter-Medium'
	// },
	buttonTextStyle: {
		color: '#ffffff',
		fontFamily: 'Inter-Medium',
		fontStyle: 'normal',
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 15
	},
	buttonStyle: {
		height: 40,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255, 0.28)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	// symbolPercentage: {
	// 	marginLeft: 'auto',
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	paddingTop: 2,
	// 	paddingRight: 8,
	// 	gap: 2,
	// 	fontSize: 10,
	// 	lineHeight: 15,
	// 	color: '#24b23b',
	// 	background: '#ffffff',
	// 	borderRadius: 3,
	// 	width: 'max-content',
	// 	fontFamily: 'Inter-Regular'
	// },
	// symbolPercentage2: {
	// 	color: '#f43a3a'
	// }

	horizontalLine: {
		height: 0.5,
		backgroundColor: '#fff',
		width: '100%',
		alignSelf: 'center',
		justifyContent: 'center',
		opacity: 0.2,
		marginTop: 17,
		marginBottom: 5,
		border: 'none'
	}
});
export default Card;
