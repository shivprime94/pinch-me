import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from 'react-native-popup-menu';
import {Divider, Avatar, Tab, Chip} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Feather';
import {ReturnPercentage, CryptoIcon} from '../../../components/atoms';
import Table from './TableCopyCards';
import {useSelector} from 'react-redux';
import {precisionRound} from '../../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {DialogBox} from '../../../components/molecules';
const CopiedCard = () => {
	const navigation = useNavigation();
	return (
		<View
			style={{
				marginHorizontal: 20,
				marginTop: 20,
				borderWidth: 1,
				borderColor: '#EAEAEA',
				borderRadius: 12,
				backgroundColor: '#fff',
				padding: 10
			}}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: 10
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<Avatar
						rounded
						size={40}
						source={{
							uri: 'https://randomuser.me/api/portraits/men/43.jpg'
						}}
					/>
					<Text
						style={{
							marginLeft: 10,
							fontFamily: 'Inter-SemiBold',
							fontSize: 16,
							lineHeight: 20,
							color: '#000'
						}}>
						Copied from Shruti
					</Text>
					<View
						style={{
							marginLeft: 20
						}}>
						<ReturnPercentage>12</ReturnPercentage>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Menu>
						<MenuTrigger>
							<Icon
								name="more-vertical"
								size={20}
								color={'#029DA0'}></Icon>
						</MenuTrigger>
						<MenuOptions
							style={{
								margin: 10
							}}>
							<MenuOption
								onSelect={() => {
									console.log('Edit Order');
								}}>
								<Text style={styles.optionText}>
									<Icon
										name="x-circle"
										size={17}
										color="#09244B"
									/>
									{'  '}
									Abort
								</Text>
							</MenuOption>
							<MenuOption
								onSelect={() => {
									navigation.navigate('Preview', {
										symbol: 'ETH',
										shareLink: '5iFp00'
									});
								}}>
								<Text style={styles.optionText}>
									<Icon
										name="copy"
										size={17}
										color="#09244B"
									/>
									{'  '}
									View/Copy
								</Text>
							</MenuOption>
						</MenuOptions>
					</Menu>
				</View>
			</View>
			<View style={{marginVertical: 10}}>
				<Table />
			</View>
		</View>
	);
};
// const tableRow = ({data1, data2, data3, data4}) => {
// 	return (
// 		<View
// 			style={{
// 				flexDirection: 'row',
// 				justifyContent: 'space-between',
// 				paddingHorizontal: 10
// 			}}>
// 			<View
// 				style={{
// 					// alignItems: 'center',
// 					justifyContent: 'center'
// 				}}>
// 				<Text style={styles.tableRowText}>{data1}</Text>
// 			</View>
// 			<View
// 				style={{
// 					// alignItems: 'center',
// 					justifyContent: 'center'
// 				}}>
// 				<Text style={styles.tableRowText}>{data2}</Text>
// 			</View>
// 			<View
// 				style={{
// 					// alignItems: 'center',
// 					justifyContent: 'center'
// 				}}>
// 				<Text style={styles.tableRowText}>{data3}</Text>
// 			</View>
// 			<View
// 				style={{
// 					// alignItems: 'center',
// 					justifyContent: 'center'
// 				}}>
// 				<ReturnPercentage>{data4}</ReturnPercentage>
// 			</View>
// 			<View
// 				style={{
// 					// alignItems: 'center',
// 					justifyContent: 'center'
// 				}}>
// 				<Icon name="x-circle" size={11} color="#828282" />
// 			</View>
// 		</View>
// 	);
// };
const Asset = ({asset, returnPercentage}) => {
	return (
		<View
			style={{
				marginTop: 20,
				marginRight: 20,
				height: 69,
				// minwidth: 180,
				backgroundColor: '#fff',
				borderRadius: 12,
				borderWidth: 1,
				borderColor: '#152554',
				flexDirection: 'row',
				alignItems: 'center',
				// justifyContent: 'space-evenly',
				padding: 10
			}}>
			<View>
				<CryptoIcon coin={asset} />
			</View>
			<View
				style={{
					marginLeft: 15,
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}>
				<Text
					style={{
						fontSize: 16,
						fontFamily: 'Inter-SemiBold',
						lineHeight: 20,
						color: '#000'
					}}>
					{asset}
				</Text>
				<View
					style={{
						marginTop: 3
					}}>
					<ReturnPercentage>
						{precisionRound(returnPercentage * 100, 2)}
					</ReturnPercentage>
				</View>
			</View>
		</View>
	);
};
const CopiedTrades = () => {
	const copiedTrades = useSelector(state => state.orders.copiedOrders);
	const [selectedChip, setSelectedChip] = useState(1);
	const coins = copiedTrades?.map(trade => {
		return {
			asset: trade.Asset,
			returnPercentage: trade.AssetReturnPercentage
		};
	});

	console.log('COPIED TRADES: ', copiedTrades);
	return (
		<View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 20
				}}
				// style={{
				// 	marginHorizontal: 20
				// }}
			>
				{coins?.map(coin => (
					<Asset {...coin} />
				))}
			</ScrollView>
			<View
				style={{
					marginHorizontal: 20,
					flexDirection: 'row'
				}}>
				<Chip
					title="24 Open Trades"
					buttonStyle={{
						backgroundColor:
							selectedChip == 1 ? '#152554' : '#E3E9E9',
						height: 40
					}}
					titleStyle={{
						color: selectedChip == 1 ? '#fff' : '#152554'
					}}
					containerStyle={{
						marginVertical: 20,
						marginRight: 10
					}}
					onPress={() => setSelectedChip(1)}
				/>
				<Chip
					title="34 Executed Trades"
					buttonStyle={{
						backgroundColor:
							selectedChip == 2 ? '#152554' : '#E3E9E9',
						height: 40
					}}
					titleStyle={{
						color: selectedChip == 2 ? '#fff' : '#152554'
					}}
					containerStyle={{
						marginVertical: 20,
						marginRight: 10
					}}
					onPress={() => setSelectedChip(2)}
				/>
			</View>
			{selectedChip == 1 ? CopiedCard() : CopiedCard()}
		</View>
	);
};
const styles = StyleSheet.create({
	tableHeaderText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 14,
		lineHeight: 17,
		color: '#152554',
		textAlign: 'left'
	},
	tableRowText: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 17,
		color: '#152554',
		textAlign: 'left'
	},
	optionText: {
		color: '#09244B',
		fontSize: 16,
		fontFamily: 'Inter-Bold',
		lineHeight: 20
	}
});
export default CopiedTrades;
