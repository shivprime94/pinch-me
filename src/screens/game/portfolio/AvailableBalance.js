import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
const AvailableBalace = () => {
	return (
		<View
			style={{
				justifyContent: 'center'
			}}>
			<View style={styles.gameBalanceContainer}>
				<View
					style={{
						marginTop: 30
					}}>
					<Text style={styles.banner_subheading}>
						AVAILABLE BALANCE
					</Text>
					<Text style={styles.banner_heading}>1000 POINTS</Text>
				</View>
				<Image source={require('../../../assets/coin.png')} />
			</View>
			<View
				style={{
					position: 'relative',
					top: -55,
					backgroundColor: '#fff',
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20
				}}>
				<View style={styles.flexRow}>
					<Text style={styles.whiteContainerText}>
						Initial Balance
					</Text>
					<Text
						style={{
							...styles.whiteContainerAmountText,
							color: '#02A01B'
						}}>
						+1000
					</Text>
				</View>
				<View style={styles.flexRow}>
					<Text style={styles.whiteContainerText}>
						Assets Balance
					</Text>
					<Text style={styles.whiteContainerAmountText}>0</Text>
				</View>
				<View style={styles.flexRow}>
					<Text style={styles.whiteContainerText}>
						Points Invested
					</Text>
					<Text style={styles.whiteContainerAmountText}>0</Text>
				</View>
				<View style={styles.flexRow}>
					<Text style={styles.whiteContainerText}>Profit Earned</Text>
					<Text style={styles.whiteContainerAmountText}>0</Text>
				</View>
				<View style={styles.flexRow}>
					<Text style={styles.whiteContainerText}>
						Rewards Earned
					</Text>
					<Text
						style={{
							...styles.whiteContainerAmountText,
							color: '#02A01B'
						}}>
						+20
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	gameBalanceContainer: {
		backgroundColor: '#192551',
		// width: Dimensions.get('window').width - 40,
		// height: 150,
		display: 'flex',
		flexDirection: 'row',
		// alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20
		// marginHorizontal: 20
	},
	banner_heading: {
		fontSize: 36,
		color: '#fff',
		fontFamily: 'Poppins-Bold',
		lineHeight: 46.5
	},
	banner_subheading: {
		fontSize: 16,
		fontFamily: 'Poppins-Medium',
		color: '#fff',
		lineHeight: 21
	},
	iconStyle: {
		backgroundColor: '#F0F0F0',
		borderRadius: 20,
		padding: 10,
		marginLeft: 10
	},
	whiteContainerText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		color: '#333333',
		lineHeight: 21
	},
	whiteContainerAmountText: {
		fontSize: 16,
		fontFamily: 'Poppins-Bold',
		color: '#333333',
		lineHeight: 21
	},
	flexRow: {
		marginTop: 20,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});
export default AvailableBalace;
