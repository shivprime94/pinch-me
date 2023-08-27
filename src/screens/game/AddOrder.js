import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {BottomSheet, Tab} from '@rneui/base';
import Icon from 'react-native-vector-icons/AntDesign';
import Cross from 'react-native-vector-icons/Entypo';
import {CryptoIcon, Button} from '../../components/atoms';
import ExpectedReutrn from './ExpectedReturn';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useBinanceSocket} from '../../hooks';

const BuyCryptoItem = ({symbol}) => {
	const symbolSocketData = useBinanceSocket(symbol);
	console.log(symbolSocketData);
	return (
		<View style={styles.subCard}>
			<View
				style={{
					flexDirection: 'row'
				}}>
				<CryptoIcon coin={symbol.substring(0, 3)} />
				<View
					style={{
						marginLeft: 20
					}}>
					<Text style={styles.subCardHeading}>{symbol}</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 2
						}}>
						<Text style={styles.subCardSubHeading}>
							{symbolSocketData?.price}
						</Text>
						<View
							style={{
								marginLeft: 10
							}}>
							{ExpectedReutrn({
								percentage: symbolSocketData?.percentageChange
							})}
						</View>
					</View>
				</View>
			</View>
			<Button
				buttonStyle={styles.iconStyle}
				onPress={() => console.log('presed')}>
				<Icon name="right" size={10} color="#152554" />
			</Button>
		</View>
	);
};

const AddAndShareItem = ({
	asset,
	available_balance,
	freeze_balance,
	open_orders
}) => {
	const navigation = useNavigation();
	const navigateToPreview = () => {
		navigation.navigate('Preview', {symbol: asset});
	};
	return (
		<View style={styles.subCard}>
			<View
				style={{
					flexDirection: 'row'
					// alignItems: 'center'
				}}>
				<CryptoIcon
					coin={asset.toLowerCase()}
					coinStyle={{
						borderRadius: 0
					}}
				/>
				<View
					style={{
						marginLeft: 20
					}}>
					<Text style={styles.subCardHeading}>{asset}</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 2
						}}>
						<Text style={styles.subCardSubHeading}>
							Total Qty -{' '}
							{(available_balance + freeze_balance).toFixed(4)}
						</Text>
						<View
							style={{
								width: 5,
								height: 5,
								borderRadius: 10,
								backgroundColor: '#000',
								marginHorizontal: 10
							}}></View>
						<Text style={styles.subCardSubHeading}>
							Live Orders {open_orders}
						</Text>
					</View>
				</View>
			</View>
			<Button buttonStyle={styles.iconStyle} onPress={navigateToPreview}>
				<Icon name="right" size={10} color="#152554" />
			</Button>
		</View>
	);
};

const BuyCryptoTab = () => {
	const aggregateSymbols = useSelector(state => state.coins.aggregateSymbols);

	return (
		<ScrollView>
			{aggregateSymbols?.map(symbol => {
				return <BuyCryptoItem key={symbol} symbol={symbol} />;
			})}
		</ScrollView>
	);
};
const AddAndShareTab = () => {
	const account = useSelector(state => state.global.account);
	console.log('ACCOUNT: ', account);
	return (
		<ScrollView>
			{account?.map(coin => {
				return <AddAndShareItem key={coin.asset} {...coin} />;
			})}
			{/* {account?.map(coin => {
				return <AddAndShareItem key={coin.asset} {...coin} />;
			})} */}
		</ScrollView>
	);
};
const AddOrder = () => {
	const [index, setIndex] = React.useState(0);
	console.log('rendering');
	return (
		<>
			{/* <BottomSheet
				isVisible={isVisible}
				containerStyle={{
					backgroundColor: 'rgba(0,0,0, 0.4)'
				}}
				backdropStyle={{
					backgroundColor: 'rgba(0,0,0,0.4)'
				}}> */}
			{/* <View
				style={{
					backgroundColor: '#1C1C1C',
					borderRadius: 30,
					height: 48,
					width: 48,
					alignSelf: 'center',
					justifyContent: 'center',
					marginBottom: 10
				}}>
				<Cross
					onPress={() => {
						setIsVisible(false);
					}}
					style={{
						alignSelf: 'center'
					}}
					name="cross"
					size={32}
					color={'white'}></Cross>
			</View> */}
			<View style={styles.modelContainer}>
				<Tab
					value={index}
					onChange={setIndex}
					indicatorStyle={{
						backgroundColor: '#000',
						height: 3,
						borderRadius: 10,
						width: 150,
						marginLeft: 20,
						marginRight: 20
					}}>
					<Tab.Item
						title="Add & Share"
						titleStyle={{
							color: index === 0 ? '#000' : '#818181',
							fontSize: 20,
							fontFamily:
								index == 0 ? 'Inter-Bold' : 'Inter-SemiBold'
							// lineHeight:
						}}></Tab.Item>
					<Tab.Item
						title="Buy Crypto"
						titleStyle={{
							color: index === 1 ? '#000' : '#818181',
							fontSize: 20,
							fontFamily:
								index == 0 ? 'Inter-Bold' : 'Inter-SemiBold'
							// lineHeight: 20
						}}></Tab.Item>
				</Tab>

				<View
					style={{
						marginTop: 20,
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1,
						marginBottom: 0
					}}>
					{index === 0 ? <AddAndShareTab /> : <BuyCryptoTab />}
				</View>
			</View>
			{/* </BottomSheet> */}
		</>
	);
};
const styles = StyleSheet.create({
	modelContainer: {
		backgroundColor: '#F0F4FF',
		height: Dimensions.get('screen').height / 2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
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
		fontFamily: 'Inter-Regular',
		color: '#70747C',
		lineHeight: 17
	},
	iconStyle: {
		backgroundColor: '#F0F0F0',
		borderRadius: 20,
		padding: 10,
		marginLeft: 10
	},
	priceContainer: {
		flexDirection: 'column',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#fff',
		borderRadius: 16,
		marginTop: 10
	},
	priceBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	buttonStyle: {
		position: 'relative',
		bottom: 0,
		backgroundColor: '#152554',
		minHeight: 50,
		width: '100%',
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonTextStyle: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Poppins-Regular'
	},
	headingText: {
		fontSize: 20,
		fontFamily: 'Poppins-Bold',
		color: '#000',
		lineHeight: 30,
		marginBottom: 10
	},
	subHeadingText: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#666666',
		lineHeight: 21,
		marginBottom: 10
	}
});
export default AddOrder;
