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
import {createPreview} from '../../store/coins/actions';
import {putPinchOrder, cancelOrEditOrder} from '../../store/orders/actions';
import {useBinanceSocket} from '../../hooks';

// const AmountAndSlider = props => {
//     return (

//     );
// }

const CurrentPriceWrapper = ({
	coin,
	setInputPrice,
	setInputLimit,
	activeTab
}) => {
	const liveAssetData = useBinanceSocket(coin + 'USDT');
	useEffect(() => {
		activeTab === 1
			? setInputPrice(liveAssetData.price)
			: setInputLimit(liveAssetData.price);
	}, [activeTab]);
	return (
		<View style={styles.container}>
			<Text style={styles.styleText}>Current Price</Text>
			<Text style={styles.styleText}>{liveAssetData?.price} USDT</Text>
		</View>
	);
};

const SellOrderDrawer = props => {
	const width = useWindowDimensions().width;
	const {
		previewDetails,
		coin,
		shareTradeId,
		toggleModal,
		editSellOrder,
		resetEditSellOrder
	} = props;
	console.log('SHARE LINK: ', shareTradeId);
	const data = previewDetails?.order_proportion;
	const dispatch = useDispatch();
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const isUserInGame = useSelector(state => state.global.isUserInGame);
	const account = useSelector(state => state.global.account);
	// const liveAssetData = useBinanceSocket(coin.asset);

	const deductableSum = _.sum(data?.map(i => Number(i?.Order?.orig_qty)));
	const [currentCurrency, updateCurrentCurrency] = useState(null);
	const [currentBalance, updateCurrentBalance] = useState(null);
	const symbolParam = coin;
	const [coinSocketData, updateCoinSocketData] = useState(null);
	const [sliderValue, setSliderValue] = useState(0);
	const [inputAmount, setInputAmount] = useState('');
	const [total, setTotal] = useState('');
	const [inputPrice, setInputPrice] = useState('');
	const [activeTab, setActiveTab] = useState(1);
	const [inputLimit, setInputLimit] = useState('');
	const [inputStop, setInputStop] = useState('');
	const [isConfirmButtonDisabled, updateIsConfirmButtonDisabled] =
		useState(true);

	const CURRENT_TIMESTAMP = new Date();

	useEffect(() => {
		const setOrderDetails = () => {
			if (editSellOrder) {
				console.log(editSellOrder);
				const {price, stopPrice, orig_qty} = editSellOrder;
				if (editSellOrder.type === 'STOPLIMIT') {
					setActiveTab(2);
					resetInputFields();
					setInputLimit(price);
					setInputStop(stopPrice);
					setInputAmount(orig_qty);
				} else if (editSellOrder.type === 'LIMIT') {
					setActiveTab(1);
					setInputPrice(price);
					setInputAmount(orig_qty);
				}
				let currentBalance = account?.find(i => i.asset === coin)[
					'available_balance'
				];

				currentBalance = Number(currentBalance) - deductableSum;
				const sliderValue = (orig_qty * 100) / currentBalance;
				setSliderValue(Math.round(sliderValue.toFixed(2)));
				setTotal(precisionRound(price * orig_qty));
			}
		};
		account && setOrderDetails();
	}, [account, editSellOrder, coin, deductableSum]);

	useEffect(() => {
		const symbol = symbolParam || currentSymbol;
		updateCurrentCurrency(symbol);
		dispatch(updateSymbol(symbol));
	}, [isCopyTrader]);

	// useEffect(() => {
	// 	if (!editSellOrder) {
	// 		setInputPrice(liveAssetData?.price);
	// 	}
	// }, []);

	useEffect(() => {
		let disabled = false;
		if (total > Number(currentBalance) && isCopyTrader) disabled = true;
		else if (activeTab === 1) {
			disabled = Boolean(!inputPrice || !inputAmount || !total);
		} else if (activeTab === 2) {
			disabled = Boolean(
				!inputAmount || !total || !inputStop || !inputLimit
			);
		}
		updateIsConfirmButtonDisabled(disabled);
	}, [inputPrice, inputLimit, inputStop, inputAmount, total]);

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

	// useEffect(() => {

	// }, [inputPrice, inputAmount, total]);

	const handlePriceChange = value => {
		setInputPrice(value);
		const newTotal = value * inputAmount;
		if (activeTab != 3 || !inputLimit) {
			if (value && inputAmount) {
				setTotal(precisionRound(newTotal, 4));
			} else {
				setTotal('');
			}
		} else if (inputLimit) {
			if (newTotal > inputAmount * inputLimit) {
				setTotal(precisionRound(newTotal, 4));
			} else {
				setTotal(precisionRound(inputAmount * inputLimit, 4));
			}
		}
	};

	const handleTotalChange = event => {
		if (event) {
			setTotal(precisionRound(event, 4));
			const controlValue = inputPrice || inputLimit;
			if (controlValue) {
				const newAmount = (event / controlValue).toFixed(5);
				setInputAmount(newAmount);
				setSliderValue(Math.round((newAmount * 100) / currentBalance));
			} else if (inputAmount) {
				switch (activeTab) {
					case 1:
						setInputPrice(event / inputAmount);
					case 2:
						setInputLimit(event / inputAmount);
				}
			}
		} else {
			setSliderValue(0);
			setTotal('');
			setInputAmount('');
		}
	};
	const handleSliderChange = value => {
		const controlValue = inputPrice || inputLimit;
		setSliderValue(value);
		if (value) {
			const newAmount = ((value / 100) * currentBalance).toFixed(4);
			const newTotal = (inputAmount * controlValue).toFixed(4);
			setTotal(newTotal);
			setInputAmount(newAmount);
		} else {
			setTotal('');
			setInputAmount('');
		}
	};

	const updateFinalSliderValue = value => {
		setSliderValue(value);
	};

	const handleAmountChange = event => {
		const value = event;
		const decimals = value.split('.')[1];
		const controlValue = inputPrice || inputLimit;
		if (value) {
			if (decimals?.length <= 4 || decimals === undefined) {
				const newTotal = (value * controlValue).toFixed(5);
				setSliderValue(Math.round((value * 100) / currentBalance));
				setInputAmount(value);
				setTotal(precisionRound(newTotal));
			}
		} else {
			setSliderValue(0);
			setInputAmount('');
			setTotal('');
		}
	};

	const handleInputLimit = value => {
		setInputLimit(value);
		const newTotal = value * inputAmount;
		if (activeTab != 3 || !inputPrice) {
			if (value && inputAmount) {
				setTotal(precisionRound(newTotal, 4));
			} else {
				setTotal('');
			}
		} else if (inputPrice) {
			if (newTotal > inputAmount * inputPrice) {
				setTotal(precisionRound(newTotal, 4));
			} else {
				setTotal(precisionRound(inputAmount * inputPrice, 4));
			}
		}
	};

	const handleInputStop = value => {
		setInputStop(parseFloat(value));
	};
	const resetInputFields = () => {
		// const currentPrice = '';
		setInputAmount('');
		setSliderValue(0);
		setInputStop('');
		setTotal('');
		// switch (activeTab) {
		// 	case 1:
		// 		return setInputPrice(currentPrice);
		// 	case 2:
		// 		return setInputLimit(currentPrice);
		// 	default:
		// 		return;
		// }
	};

	const constructPayload = status => {
		const editedOrder = {
			...editSellOrder,
			price: parseFloat(inputPrice),
			orig_qty: parseFloat(inputAmount),
			status
		};

		return editedOrder;
	};

	const handleInGameConfirmAndEdit = async () => {
		const payload = constructPayload('EDIT');
		if (activeTab === 2) {
			payload.stop_price = Number(inputStop);
			payload.price = Math.max(inputPrice, inputLimit);
			payload.type = 'STOPLIMIT';
		} else {
			payload.type = 'LIMIT';
		}

		await dispatch(cancelOrEditOrder(payload));
		dispatch(createPreview({asset: coin}));
	};

	const handleConfirmAndEdit = async () => {
		const currentTimestamp = new Date();
		const apiParams = {
			exchange: 'binance',
			pinch_status: 'NEW',
			id: editSellOrder?.pinch_order_id,
			asset: editSellOrder?.symbol?.substr(0, 3),
			symbol: editSellOrder?.symbol,
			orig_qty: parseFloat(inputAmount),
			type: editSellOrder?.type,
			side: editSellOrder?.side,
			updated_at: currentTimestamp,
			share_trade_agg_link: shareTradeId,
			price: parseFloat(inputPrice),
			time_in_force: 'GTC'
		};
		if (activeTab === 2) {
			apiParams['stop_price'] = Number(inputStop);
			apiParams['price'] = Math.max(inputPrice, inputLimit);
		} else {
			apiParams['time_in_force'] = 'GTC';
		}
		await dispatch(putPinchOrder(apiParams));
		await dispatch(createPreview({asset: coin}));
		resetInputFields();
		toggleModal();
		editSellOrder && resetEditSellOrder();
	};
	const handleConfirmAndAdd = () => {
		const type = activeTab === 1 ? 'LIMIT' : 'STOPLIMIT';
		const currentTimestamp = new Date();
		const apiParams = {
			exchange: isUserInGame ? 'Pinch-Game' : 'binance',
			pinch_status: 'NEW',
			asset: coin,
			symbol: coin + 'USDT',
			side: 'SELL',
			orig_qty: parseFloat(inputAmount),
			created_at: currentTimestamp,
			updated_at: currentTimestamp,
			share_trade_agg_link: shareTradeId,
			price: parseFloat(inputPrice),
			type,
			time_in_force: 'GTC'
		};
		if (activeTab === 2) {
			apiParams['stop_price'] = inputStop;
			apiParams['price'] = Math.max(inputPrice, inputLimit);
		}
		const putPinchOrderResponse = dispatch(putPinchOrder(apiParams));
		putPinchOrderResponse.then(async () => {
			dispatch(createPreview({asset: coin})).then(() => {
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
				setInputLimit={setInputLimit}
				activeTab={activeTab}
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
					Limit
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
					Stop limit
				</Button>
			</View>
			{activeTab === 2 ? (
				<>
					<Input
						inputValue={inputStop}
						handleInputChange={handleInputStop}
						inputLabelLeft="Stop"
						inputLabelRight="USDT"
					/>
					<Input
						inputValue={inputLimit}
						handleInputChange={handleInputLimit}
						inputLabelLeft="Limit"
						inputLabelRight="USDT"
					/>
				</>
			) : null}
			{/* Price Field */}
			{activeTab === 1 ? (
				<Input
					inputValue={inputPrice}
					handleInputChange={handlePriceChange}
					inputLabelLeft="Price"
					inputLabelRight="USDT"
				/>
			) : null}
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
			{!Boolean(editSellOrder) ? (
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
					onPress={
						isUserInGame
							? handleInGameConfirmAndEdit
							: handleConfirmAndEdit
					}
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
export default SellOrderDrawer;
