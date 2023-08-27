// import React, {useState} from 'react';
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	ScrollView,
// 	Image,
// 	Dimensions
// } from 'react-native';
// import {SvgComponent} from '../../components/atoms';
// import coinSmallSvg from '../../assets/coin-small-svg.svg';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {CryptoIcon} from '../../components/atoms';
// import {Divider, Avatar, Tab, Chip} from '@rneui/themed';
// import Tooltip from 'react-native-walkthrough-tooltip';
// import InfoCircle from 'react-native-vector-icons/Ionicons';
// import ExpectedReutrn from './ExpectedReturn';
// import Button from '../../components/atoms/Button';
// const ShareCards = () => {
// 	const [toolTipVisible1, setToolTipVisible1] = useState(false);
// 	const [toolTipVisible2, setToolTipVisible2] = useState(false);
// 	return (
// 		<View
// 			style={{
// 				marginTop: 20,
// 				marginHorizontal: 20,
// 				backgroundColor: '#fff',
// 				borderRadius: 12,
// 				borderWidth: 1,
// 				borderColor: '#EAEAEA',
// 				padding: 20
// 			}}>
// 			<View
// 				style={{
// 					flexDirection: 'row',
// 					justifyContent: 'space-between'
// 				}}>
// 				<View
// 					style={{
// 						flexDirection: 'row'
// 					}}>
// 					<Avatar
// 						rounded
// 						size={40}
// 						source={{
// 							uri: 'https://randomuser.me/api/portraits/men/43.jpg'
// 						}}
// 					/>
// 					<View
// 						style={{
// 							marginLeft: 10,
// 							alignSelf: 'center'
// 						}}>
// 						<Text style={styles.headerText}>Created By Shruti</Text>
// 					</View>
// 				</View>
// 				<View
// 					style={{
// 						alignSelf: 'center',
// 						justifyContent: 'center'
// 					}}>
// 					<Text
// 						style={{
// 							fontFamily: 'Poppins-Medium',
// 							fontSize: 16,
// 							color: '#029DA0'
// 						}}>
// 						View/Copy
// 					</Text>
// 				</View>
// 			</View>
// 			<View
// 				style={{
// 					marginTop: 10
// 				}}>
// 				<View
// 					style={{
// 						marginTop: 10,
// 						flexDirection: 'row',
// 						justifyContent: 'space-between'
// 					}}>
// 					<View
// 						style={{
// 							flexDirection: 'row'
// 						}}>
// 						<Text
// 							style={{
// 								fontSize: 16,
// 								color: '#70747C',
// 								fontFamily: 'Poppins-Regular',
// 								lineHeight: 20
// 							}}>
// 							Historic Return
// 						</Text>
// 						<Tooltip
// 							isVisible={toolTipVisible1}
// 							// disableShadow={true}
// 							contentStyle={{
// 								backgroundColor: '#444'
// 							}}
// 							backgroundColor="rgba(0,0,0,0)"
// 							content={
// 								<View>
// 									<Text style={styles.toolTipText}>
// 										Return profile of user based on order
// 										history
// 									</Text>
// 								</View>
// 							}
// 							placement="top"
// 							onClose={() => setToolTipVisible1(false)}>
// 							<TouchableOpacity
// 								onPress={() => setToolTipVisible1(true)}>
// 								<InfoCircle
// 									name="information-circle-sharp"
// 									size={14}
// 									style={{
// 										color: '#787a8d',
// 										marginLeft: 5
// 									}}
// 								/>
// 							</TouchableOpacity>
// 						</Tooltip>
// 					</View>
// 					<Text
// 						style={{
// 							fontSize: 16,
// 							color: '#000',
// 							fontFamily: 'Poppins-Medium',
// 							lineHeight: 20
// 						}}>
// 						12%
// 					</Text>
// 				</View>
// 				<View
// 					style={{
// 						marginTop: 10,
// 						flexDirection: 'row',
// 						justifyContent: 'space-between'
// 					}}>
// 					<View
// 						style={{
// 							flexDirection: 'row'
// 						}}>
// 						<Text
// 							style={{
// 								fontSize: 16,
// 								color: '#70747C',
// 								fontFamily: 'Poppins-Regular',
// 								lineHeight: 20
// 							}}>
// 							Expected Return
// 						</Text>
// 						<Tooltip
// 							isVisible={toolTipVisible2}
// 							contentStyle={{
// 								backgroundColor: '#444'
// 							}}
// 							backgroundColor="rgba(0,0,0,0)"
// 							content={
// 								<View>
// 									<Text style={styles.toolTipText}>
// 										Return expected of user based on order
// 										live orders
// 									</Text>
// 								</View>
// 							}
// 							placement="top"
// 							onClose={() => setToolTipVisible2(false)}>
// 							<TouchableOpacity
// 								onPress={() => setToolTipVisible2(true)}>
// 								<InfoCircle
// 									name="information-circle-sharp"
// 									size={14}
// 									style={{
// 										color: '#787a8d',
// 										marginLeft: 5
// 									}}
// 								/>
// 							</TouchableOpacity>
// 						</Tooltip>
// 					</View>
// 					{ExpectedReutrn({percentage: 12})}
// 				</View>

// 				<Divider
// 					style={{
// 						marginTop: 20,
// 						backgroundColor: '#EDEDED',
// 						height: 0.5,
// 						width: '100%'
// 					}}
// 				/>
// 				{/* copied gusy */}
// 				<View
// 					style={{
// 						flexDirection: 'row',
// 						justifyContent: 'space-between',
// 						alignItems: 'center'
// 					}}>
// 					<View>
// 						<View
// 							style={{
// 								marginTop: 10
// 							}}>
// 							<Text style={styles.pointsText}>
// 								Copied By 8 People
// 							</Text>
// 						</View>
// 						<View
// 							style={{
// 								marginTop: 10,
// 								flexDirection: 'row',
// 								position: 'relative'
// 							}}>
// 							<Avatar
// 								rounded
// 								size={40}
// 								source={{
// 									uri: 'https://randomuser.me/api/portraits/men/43.jpg'
// 								}}
// 								containerStyle={{
// 									position: 'absolute',
// 									left: 25
// 								}}
// 							/>
// 							<Avatar
// 								rounded
// 								size={40}
// 								source={{
// 									uri: 'https://randomuser.me/api/portraits/men/39.jpg'
// 								}}
// 							/>
// 							<Avatar
// 								rounded
// 								size={40}
// 								source={{
// 									uri: 'https://randomuser.me/api/portraits/men/40.jpg'
// 								}}
// 								containerStyle={{
// 									position: 'absolute',
// 									left: 50
// 								}}
// 							/>
// 							<Avatar
// 								rounded
// 								size={40}
// 								source={{
// 									uri: 'https://randomuser.me/api/portraits/men/41.jpg'
// 								}}
// 								containerStyle={{
// 									position: 'absolute',
// 									left: 75
// 								}}
// 							/>
// 							<Avatar
// 								rounded
// 								size={40}
// 								source={{
// 									uri: 'https://randomuser.me/api/portraits/men/42.jpg'
// 								}}
// 								containerStyle={{
// 									position: 'absolute',
// 									left: 100
// 								}}
// 							/>
// 						</View>
// 					</View>
// 					<View
// 						style={{
// 							marginTop: 10,
// 							flexDirection: 'column',
// 							alignItems: 'center',
// 							justifyContent: 'flex-start'
// 						}}>
// 						<View>
// 							<Text style={styles.pointsText}>Points Earned</Text>
// 						</View>
// 						<View
// 							style={{
// 								marginTop: 8,
// 								flexDirection: 'row',
// 								alignItems: 'center',
// 								justifyContent: 'center',
// 								height: 40
// 							}}>
// 							<SvgComponent
// 								svgStyle={{
// 									width: 40,
// 									height: 40
// 								}}
// 							/>
// 							{/* <Image
// 								style={{
// 									width: 40,
// 									height: 40
// 								}}
// 								source={require('../../assets/small-coin.png')}></Image> */}
// 							<Text
// 								style={{
// 									fontSize: 35,
// 									fontFamily: 'Poppins-Bold',
// 									color: '#000',
// 									marginLeft: 10,
// 									textAlign: 'center'
// 								}}>
// 								10
// 							</Text>
// 						</View>
// 					</View>
// 				</View>
// 			</View>
// 			<Button
// 				buttonStyle={styles.buttonStyle}
// 				textStyle={styles.buttonStyleText}>
// 				Add more orders and share
// 			</Button>
// 		</View>
// 	);
// };
// const microCards = () => {
// 	return (
// 		<View
// 			style={{
// 				marginTop: 20,
// 				marginRight: 20,
// 				height: 69,
// 				backgroundColor: '#fff',
// 				borderRadius: 12,
// 				borderWidth: 1,
// 				borderColor: '#152554',
// 				flexDirection: 'row',
// 				alignItems: 'center',
// 				padding: 10
// 			}}>
// 			<View>
// 				<CryptoIcon coin={'btc'} />
// 			</View>
// 			<View
// 				style={{
// 					marginLeft: 15,
// 					flexDirection: 'column',
// 					justifyContent: 'space-between'
// 				}}>
// 				<Text
// 					style={{
// 						fontSize: 16,
// 						fontFamily: 'Inter-SemiBold',
// 						lineHeight: 20,
// 						color: '#000'
// 					}}>
// 					ETH (Etherium)
// 				</Text>
// 				<View
// 					style={{
// 						marginTop: 3,
// 						flexDirection: 'row',
// 						alignItems: 'center'
// 					}}>
// 					<Image
// 						source={require('../../assets/small-coin.png')}
// 						style={{width: 20, height: 20, resizeMode: 'contain'}}
// 					/>
// 					<Text
// 						style={{
// 							fontFamily: 'Poppins-Regular',
// 							fontSize: 14,
// 							lineHeight: 17,
// 							color: '#000',
// 							textAlign: 'left',
// 							marginLeft: 5
// 						}}>
// 						11 Points
// 					</Text>
// 				</View>
// 			</View>
// 		</View>
// 	);
// };
// const TabsBelowCardSharedTrades = () => {
// 	return (
// 		<View>
// 			<ScrollView
// 				horizontal={true}
// 				showsHorizontalScrollIndicator={false}
// 				contentContainerStyle={{
// 					paddingHorizontal: 20
// 				}}>
// 				{microCards()}
// 				{microCards()}
// 				{microCards()}
// 				{microCards()}
// 			</ScrollView>
// 			<ShareCards />
// 		</View>
// 	);
// };
// const styles = StyleSheet.create({
// 	headerText: {
// 		fontFamily: 'Inter-Bold',
// 		fontSize: 18,
// 		lineHeight: 24,
// 		color: '#000'
// 	},
// 	toolTipText: {
// 		fontSize: 14,
// 		fontFamily: 'Poppins-Regular',
// 		fontStyle: 'normal',
// 		lineHeight: 20,
// 		color: '#fff'
// 	},
// 	pointsText: {
// 		fontSize: 14,
// 		fontFamily: 'Inter-SemiBold',
// 		fontStyle: 'normal',
// 		lineHeight: 20,
// 		color: '#333333'
// 	},
// 	buttonStyle: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		height: 48,
// 		backgroundColor: '#152554',
// 		borderRadius: 8,
// 		marginTop: 20
// 	},
// 	buttonStyleText: {
// 		color: '#fff',
// 		fontSize: 14,
// 		fontFamily: 'Poppins-Medium',
// 		lineHeight: 17
// 	}
// });
// export default TabsBelowCardSharedTrades;
