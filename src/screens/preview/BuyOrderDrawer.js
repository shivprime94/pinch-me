import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
	updateBalance,
	updateSymbol,
	updateUserDetails
} from '../../store/global';
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	TextInput
} from 'react-native';
import {Button} from '../../components/atoms';
import {Slider} from '../../components/molecules';
import HorizontalLine from '../../components/atoms/HorizontalLine';
import {precisionRound, numberWithCommas} from '../../utils/helpers';
import {Input} from '../../components/molecules';
import {getPreview} from '../../store/coins/actions';
import {putPinchOrder} from '../../store/orders/actions';
import {useBinanceSocket} from '../../hooks';

const CurrentPriceWrapper = ({
	coin,
	setInputPrice,
	setInputMarketPrice,
	activeTab,
	editingOrder
}) => {
	const liveAssetData = useBinanceSocket(coin);
	useEffect(() => {
		activeTab === 1
			? !editingOrder && setInputPrice(liveAssetData.price)
			: setInputMarketPrice(liveAssetData.price);
	}, [activeTab]);
	return (
		<View style={styles.container}>
			<Text style={styles.styleText}>Current Price</Text>
			<Text style={styles.styleText}>{liveAssetData?.price} USDT</Text>
		</View>
	);
};

const CopyOrderDrawer = props => {
	const width = useWindowDimensions().width;
	const {
		previewDetails,
		coin,
		shareTrader,
		toggleModal,
		editBuyOrder,
		resetEditSellOrder
	} = props;
	const data = previewDetails?.order_proportion;
	const dispatch = useDispatch();
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const isUserInGame = useSelector(state => state.global.isUserInGame);
	const account = useSelector(state => state.global.account);
	// const liveAssetData = useBinanceSocket(coin.asset);

	const deductableSum = _.sum(data?.map(i => Number(i?.Order?.origQty)));
	const currentCurrency = 'USDT';
	const [currentBalance, updateCurrentBalance] = useState(null);
	const symbolParam = coin;
	const [coinSocketData, updateCoinSocketData] = useState(null);
	const [sliderValue, setSliderValue] = useState(0);
	const [inputAmount, setInputAmount] = useState('');
	const [total, setTotal] = useState('');
	const [inputMarketPrice, setInputMarketPrice] = useState('');
	const [inputPrice, setInputPrice] = useState('');
	const [activeTab, setActiveTab] = useState(2);
	const [inputLimit, setInputLimit] = useState('');
	const [inputStop, setInputStop] = useState('');
	const [isConfirmButtonDisabled, updateIsConfirmButtonDisabled] =
		useState(true);
	console.log('rendering');
	console.log('EDIT BUY ORDER', editBuyOrder);
	console.log('PRICE', inputPrice);
	console.log('AMOUNT', inputAmount);
	console.log('TOTAL', total);
	// console.log('EDIT BUY ORDER', editBuyOrder);
	useEffect(() => {
		const setOrderDetails = () => {
			if (editBuyOrder) {
				const {price, orig_qty} = editBuyOrder;
				if (editBuyOrder.type === 'MARKET') {
					setActiveTab(2);
					resetInputFields();
					// setInputLimit(price);
					// setInputStop(stopPrice);
					setInputPrice(
						price ? Number(price) : Number(inputMarketPrice)
					);
					setInputAmount(orig_qty ? Number(orig_qty) : ' ');
				} else if (editBuyOrder.type === 'LIMIT') {
					setActiveTab(1);
					setInputPrice(price.toString());
					setInputAmount(orig_qty.toString());
					console.log('PARAMS: ', price, orig_qty);
				}
				setTotal(precisionRound(price * orig_qty));
			}
		};
		setOrderDetails();
	}, [editBuyOrder]);

	useEffect(() => {
		let disabled = false;
		if (total > Number(currentBalance) && isCopyTrader) disabled = true;
		else if (activeTab === 1) {
			disabled = Boolean(!inputPrice || !inputAmount || !total);
		} else if (activeTab === 2) {
			disabled = Boolean(!inputMarketPrice || !inputAmount || !total);
		}
		updateIsConfirmButtonDisabled(disabled);
	}, [inputPrice, inputAmount, total, inputMarketPrice]);

	useEffect(() => {
		if (currentCurrency && account?.length) {
			let balance = account?.find(i => i.asset === currentCurrency)[
				'available_balance'
			];
			balance = Number(balance) - deductableSum;
			updateCurrentBalance(balance);
			dispatch(updateBalance(balance));
		}
	}, [currentCurrency, account]);

	const handleTabChange = tab => {
		setActiveTab(tab);
		resetInputFields();
	};

	const handlePriceChange = value => {
		setInputPrice(value);
		const newTotal = value * inputAmount;
		if (activeTab == 1) {
			if (value && inputAmount) {
				setTotal(precisionRound(newTotal, 4));
			} else {
				setTotal('');
			}
		}
	};

	const handleTotalChange = event => {
		if (event) {
			setTotal(precisionRound(event, 4));
			const controlValue = inputPrice || inputMarketPrice;
			if (controlValue) {
				const newAmount = (event / controlValue).toFixed(5);
				setInputAmount(newAmount);
				setSliderValue(
					Math.round((controlValue * 100) / currentBalance)
				);
			}
			// else if (inputAmount) {
			// 	switch (activeTab) {
			// 		case 1:
			// 			setInputPrice(event / inputAmount);
			// 		case 2:
			// 			setInputLimit(event / inputAmount);
			// 	}
			// }
		} else {
			setSliderValue(0);
			setTotal('');
			setInputAmount('');
		}
	};
	const handleSliderChange = value => {
		console.log('slider changeing');
		const controlValue = inputPrice || inputMarketPrice;
		setSliderValue(value);

		if (value) {
			const newTotal = ((value / 100) * currentBalance).toFixed(4);
			const newAmount = (newTotal / controlValue).toFixed(4);
			setTotal(newTotal);
			setInputAmount(newAmount);
		} else {
			setTotal('');
			setInputAmount('');
		}
	};

	// const updateFinalSliderValue = value => {
	// 	setSliderValue(value);
	// };

	const handleAmountChange = event => {
		const value = event;
		const decimals = value.split('.')[1];
		const controlValue = inputPrice || inputMarketPrice;
		if (value) {
			if (decimals?.length <= 4 || decimals === undefined) {
				const newTotal = (value * controlValue).toFixed(5);
				setSliderValue(Math.round((newTotal * 100) / currentBalance));
				setInputAmount(value);
				setTotal(precisionRound(newTotal));
			}
		} else {
			setSliderValue(0);
			setInputAmount('');
			setTotal('');
		}
	};

	const resetInputFields = () => {
		// const currentPrice = liveAssetData?.price;
		setInputAmount('');
		setSliderValue(0);
		// setInputStop('');
		setTotal('');
		// switch (activeTab) {
		// 	case 1:
		// 		return setInputPrice(currentPrice);
		// 	// case 2:
		// 	// 	return setInputLimit(currentPrice);
		// 	default:
		// 		return;
		// }
	};
	const handleConfirmAndEdit = async () => {
		const currentTimestamp = new Date();
		const apiParams = {
			exchange: isUserInGame ? 'game-exchange' : 'binance',
			pinch_status: 'NEW',
			id: editBuyOrder?.id,
			asset: editBuyOrder?.symbol?.substr(0, 3),
			symbol: editBuyOrder?.symbol,
			orig_qty: parseFloat(inputAmount),
			type: editBuyOrder?.type,
			side: editBuyOrder?.side,
			updateTime: currentTimestamp,
			share_trade_agg_link: shareTrader.link_id,
			price: parseFloat(inputPrice)
		};
		if (activeTab === 2) {
			// apiParams['stop_price'] = Number(inputStop);
			apiParams['price'] = Math.max(inputMarketPrice, inputPrice);
		}
		await dispatch(putPinchOrder(apiParams));
		await dispatch(getPreview({shareLink: shareTrader.link_id}));
		resetInputFields();
		toggleModal();
		editBuyOrder && resetEditSellOrder();
	};
	const handleConfirmAndAdd = () => {
		const type = activeTab === 1 ? 'LIMIT' : 'MARKET';
		const currentTimestamp = new Date();
		const apiParams = {
			exchange: isUserInGame ? 'game-exchange' : 'binance',
			pinch_status: 'NEW',
			asset: coin,
			symbol: coin + 'USDT',
			side: 'BUY',
			orig_qty: parseFloat(inputAmount),
			created_at: currentTimestamp,
			updated_at: currentTimestamp,
			share_trade_agg_link: shareTrader.link_id,
			price: parseFloat(inputPrice),
			type
		};
		if (activeTab === 2) {
			apiParams['price'] = null;
		} else {
			apiParams['time_in_force'] = 'GTC';
		}
		const putPinchOrderResponse = dispatch(putPinchOrder(apiParams));
		putPinchOrderResponse.then(async () => {
			dispatch(getPreview({shareLink: shareTrader.link_id})).then(() => {
				resetInputFields();
				toggleModal();
			});
		});
	};

	return (
		<View style={{...styles.mainContainer, width: width}}>
			<CurrentPriceWrapper
				coin={coin}
				setInputPrice={setInputPrice}
				setInputMarketPrice={setInputMarketPrice}
				activeTab={activeTab}
				editingOrder={editBuyOrder}
			/>
			<View style={styles.container}>
				<Text style={styles.styleText}>Available Balance</Text>
				<Text style={styles.styleText}>
					{currentBalance &&
						currentCurrency &&
						numberWithCommas(currentBalance.toFixed(4))}{' '}
					{currentCurrency}
				</Text>
			</View>
			<HorizontalLine
				lineStyle={{
					marginTop: 5,
					marginBottom: 10,
					width: '100%',
					borderBottomColor: '#d9d9d9',
					borderBottomWidth: 0.3
				}}
			/>
			<View style={styles.tabs}>
				<Button
					buttonStyle={
						activeTab === 1
							? styles.styleTabs
							: {
									...styles.styleTabs,
									backgroundColor: '#F4F4F4',
									opacity: 1
							  }
					}
					textStyle={
						activeTab === 1
							? {
									...styles.buttonTextStyle,
									...styles.tabsTextStyle
							  }
							: {
									...styles.buttonTextStyle,
									...styles.tabsTextStyle,
									color: '#000000'
							  }
					}
					onPress={() => handleTabChange(1)}>
					{isUserInGame ? 'Recommended' : 'Limit'}
				</Button>
				<Button
					buttonStyle={
						activeTab === 2
							? styles.styleTabs
							: {
									...styles.styleTabs,
									backgroundColor: '#F4F4F4',
									opacity: 1
							  }
					}
					textStyle={
						activeTab === 2
							? {
									...styles.buttonTextStyle,
									...styles.tabsTextStyle
							  }
							: {
									...styles.buttonTextStyle,
									...styles.tabsTextStyle,
									color: '#000000'
							  }
					}
					onPress={() => handleTabChange(2)}>
					Market
				</Button>
			</View>
			{activeTab === 2 ? (
				<>
					<Input
						inputValue={inputMarketPrice}
						// handleInputChange={}
						inputLabelLeft="Price"
						inputLabelRight="USDT"
					/>
				</>
			) : (
				<Input
					inputValue={inputPrice}
					handleInputChange={handlePriceChange}
					inputLabelLeft="Price"
					inputLabelRight="USDT"
				/>
			)}

			<Input
				inputValue={inputAmount}
				handleInputChange={handleAmountChange}
				inputLabelLeft="Amount"
				inputLabelRight={coin}
			/>
			<View style={styles.sliderStyle}>
				<Slider
					value={sliderValue}
					handleSliderChange={handleSliderChange}
				/>
			</View>
			<View style={styles.textField}>
				<TextInput
					keyboardType="decimal-pad"
					style={styles.textInput}
					theme={{colors: {text: '#000000'}}}
					onChangeText={text => {
						handleTotalChange(text);
					}}>
					{total}
				</TextInput>
				<Text style={styles.inputLabelLeft}>Total</Text>
				<Text style={styles.inputLabelRight}>USDT</Text>
			</View>
			{!Boolean(editBuyOrder) ? (
				<Button
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					onPress={handleConfirmAndAdd}
					disabled={isConfirmButtonDisabled}>
					Confirm and add
				</Button>
			) : (
				<Button
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonTextStyle}
					onPress={handleConfirmAndEdit}
					disabled={isConfirmButtonDisabled}>
					Confirm and update
				</Button>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	mainContainer: {
		paddingHorizontal: 20
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5
	},
	tabs: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	styleTabs: {
		backgroundColor: '#152554',
		minHeight: 40,
		marginRight: 10,
		paddingHorizontal: 10,
		borderRadius: 16,
		maxWidth: '100%',
		justifyContent: 'center'
	},
	sliderStyle: {
		paddingVertical: 10
	},
	// textInput: {
	// 	width: '100%',
	// 	backgroundColor: '#F2F2F2',
	// 	paddingTop: 14,
	// 	paddingRight: 60,
	// 	borderRadius: 6,
	// 	textAlign: 'right'
	// },
	buttonStyle: {
		backgroundColor: '#152554',
		minHeight: 50,
		width: '100%',
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabsTextStyle: {
		padding: 5,
		fontFamily: 'Roboto-Regular',
		lineHeight: 20
	},
	buttonTextStyle: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Poppins-Regular'
	},
	styleText: {
		color: '#000',
		fontSize: 18,
		lineHeight: 22,
		fontFamily: 'Inter-SemiBold'
	},

	//----------------
	textInput: {
		width: '100%',
		backgroundColor: '#F2F2F2',
		paddingTop: 14,
		paddingRight: 60,
		borderRadius: 6,
		textAlign: 'right',
		color: '#000000'
	},
	textField: {
		display: 'flex',
		position: 'relative',
		marginVertical: 10,
		flexDirection: 'row'
	},
	inputLabelLeft: {
		position: 'absolute',
		left: 8,
		alignSelf: 'center',
		marginLeft: 8,
		fontSize: 15,
		color: '#808080',
		fontFamily: 'Roboto-Regular'
	},
	inputLabelRight: {
		position: 'absolute',
		right: 8,
		alignSelf: 'center',
		marginRight: 8,
		fontSize: 15,
		color: '#808080',
		fontFamily: 'Roboto-Regular'
	}
	//----------------
});
export default CopyOrderDrawer;
