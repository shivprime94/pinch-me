import React from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from '@rneui/themed';
import {CryptoIcon} from '../../components/atoms';
const AddSellOrder = props => {
	const {symbol, toggleModal} = props;
	return (
		<View style={styles.containerStyle}>
			<TouchableOpacity onPress={toggleModal}>
				<View style={styles.quantityContainer}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							// justifyContent: 'center',
							alignItems: 'center'
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
								<CryptoIcon
									coin={symbol}
									coinStyle={{
										marginBottom: 2
									}}
								/>
							}
						</Avatar>
						<View
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginLeft: 20
							}}>
							<Text style={styles.styleText}>Add Sell Order</Text>
							<Text
								style={[
									styles.styleSubText,
									{alignSelf: 'flex-start'}
								]}>
								{symbol}USDT
							</Text>
						</View>
					</View>
					<View
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Text style={styles.styleText}>
							Add Price & {'\n'} Quantity
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	containerStyle: {
		flexGrow: 0,
		marginHorizontal: 16,
		marginBottom: 20
	},
	quantityContainer: {
		minHeight: 70,
		backgroundColor: '#F4F4F4',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
		padding: 20,
		borderRadius: 12
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
	IconStyle: {
		color: '#F7931A'
	}
});
export default AddSellOrder;
