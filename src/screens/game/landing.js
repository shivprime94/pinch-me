import React, {useEffect} from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';
import {FAB} from 'react-native-paper';
import {Button, SvgComponent} from '../../components/atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import CurrentHeading from './CurrencyHeading';
import AddOrder from './AddOrder';
import {getTips} from '../../store/game/actions';
import {useDispatch} from 'react-redux';
import {BottomDrawer} from '../../components/molecules';
import BottomNavigation from './BottomNavigation';
const renderInfo = ({title, amount, coin, percentage}) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 10
			}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
				<Image
					source={require('../../assets/circleInsideCircle.png')}
					style={{
						width: 18,
						height: 18,
						resizeMode: 'contain'
					}}></Image>
				<Text style={styles.renderInfoText}>
					{title}: {amount} {coin}
				</Text>
				<View
					style={{
						height: 19,
						width: 60,
						marginLeft: 10,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 6,
						backgroundColor: 'rgba(255, 255, 255, 0.15)'
					}}>
					<Text style={styles.banner_subheading}>
						{percentage}%
						<Icon
							name="arrow-up-bold"
							size={17}
							color={'#00C853'}
						/>
					</Text>
				</View>
			</View>
		</View>
	);
};

const Landing = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTips());

		return () => setIsVisible(false);
	}, [dispatch, isVisible]);

	const [isVisible, setIsVisible] = React.useState(false);
	return (
		<>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: '#fff'
				}}>
				<View style={styles.container}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start'
							// marginHorizontal: 20
							// alignItems: 'center'
						}}>
						<View
							style={{
								flexDirection: 'column',
								justifyContent: 'center',
								marginTop: 38.76
							}}>
							<Text style={styles.banner_subheading}>
								Available Balance
							</Text>
							<Text style={styles.banner_heading}>
								1000 POINTS
							</Text>
							<View
								style={{
									marginTop: 15
								}}>
								{renderInfo({
									title: 'Invested',
									amount: 10,
									coin: 'USDT',
									percentage: 21.5
								})}
								{renderInfo({
									title: 'Rewards',
									amount: 150,
									coin: 'USDT',
									percentage: 21.5
								})}
							</View>
						</View>
						<Image
							source={require('../../assets/coin.png')}
							style={{marginTop: 26.76}}
							// height={78}
							// width={80}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
							marginBottom: 30,
							alignItems: 'center'
						}}>
						<Button
							onPress={() => navigation.navigate('Portfolio')}
							buttonStyle={styles.whiteButtonStyle}
							textStyle={styles.whiteButtonStyleText}>
							My Portfolio
						</Button>
						<Button
							onPress={() =>
								navigation.navigate('CreateShareEarn')
							}
							buttonStyle={{
								...styles.whiteButtonStyle,
								backgroundColor: '#081539'
							}}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<SvgComponent
									svgStyle={{
										width: 16,
										height: 16
									}}
								/>

								{/* <Image
									style={{
										width: 30,
										height: 30,
										marginTop: 10
										// marginLeft: 10
									}}
									source={require('../../assets/coin.png')}></Image> */}
								<Text
									style={{
										...styles.whiteButtonStyleText,
										color: 'white',
										marginLeft: 5
									}}>
									Earn Rewards
								</Text>
							</View>
						</Button>
					</View>
				</View>
				<CurrentHeading />
				<BottomDrawer
					isModalVisible={isVisible}
					toggleModal={() => setIsVisible(!isVisible)}>
					<AddOrder />
				</BottomDrawer>
			</ScrollView>
			<FAB
				icon="plus"
				style={styles.addOrderIconStyle}
				onPress={() => {
					console.log('presed');
					setIsVisible(true);
				}}
			/>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#192551',
		borderBottomRightRadius: 24,
		borderBottomLeftRadius: 24,
		paddingHorizontal: 20,
		paddingBottom: 20
	},
	// banner: {
	// 	display: 'flex',
	// 	justifyContent: 'space-around',
	// 	alignItems: 'stretch',
	// 	flexDirection: 'column'
	// },
	banner_heading: {
		fontSize: 31,
		color: '#fff',
		fontFamily: 'Poppins-Bold',
		lineHeight: 60
	},
	banner_subheading: {
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		color: '#fff',
		lineHeight: 22,
		fontWeight: '500',
		textTransform: 'uppercase'
	},
	buttonStyle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('screen').width - 40,
		height: 48,
		backgroundColor: '#152554',
		borderRadius: 8,
		marginTop: 10
	},
	buttonStyleText: {
		color: '#fff',
		fontSize: 18,
		fontFamily: 'Poppins-Medium',
		lineHeight: 20
	},
	renderInfoText: {
		marginLeft: 10,
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '400',
		fontFamily: 'Poppins-Regular',
		color: '#fff'
	},
	whiteButtonStyle: {
		flexGrow: 1,
		backgroundColor: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// paddingVertical: 14,
		// paddingHorizontal: 16,
		borderRadius: 12,
		height: 48,
		width: 160
	},
	whiteButtonStyleText: {
		textAlign: 'center',
		color: '#152554',
		fontSize: 14,
		fontWeight: '600',
		lineHeight: 21,
		fontFamily: 'Poppins-SemiBold'
	},
	addOrderIconStyle: {
		position: 'absolute',
		margin: 20,
		right: 0,
		bottom: 0,
		backgroundColor: '#15234C',
		borderRadius: 12
	}
});
export default Landing;
