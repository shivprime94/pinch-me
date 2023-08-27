import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar} from '@rneui/themed';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../../components/atoms';

const ExpectedReutrn = ({percentage}) => {
	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				height: 22,
				width: 60,
				borderRadius: 6,
				backgroundColor: 'rgba(47, 227, 87, 0.15)'
			}}>
			<Text
				style={[
					styles.banner_subheading,
					{
						marginTop: 2
					}
				]}>
				{percentage}%
				<MaterialIcon
					name="arrow-up-bold"
					size={17}
					color={'#00C853'}
				/>
			</Text>
		</View>
	);
};

const Trader = props => {
	const {trader, updateActiveTrader} = props;
	return (
		<View style={styles.resCards}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<View>
						{
							<Avatar
								rounded
								size={40}
								source={{
									uri: 'https://randomuser.me/api/portraits/men/43.jpg'
								}}
							/>
						}
					</View>
					<View
						style={{
							marginHorizontal: 10
						}}>
						<View>
							<Text
								style={{
									fontFamily: 'Inter-Bold',
									fontSize: 20,
									lineHeight: 24,
									color: '#000000'
								}}>
								{trader.user_name}
							</Text>
							<Text
								style={{
									fontFamily: 'Inter-Regular',
									fontSize: 16,
									lineHeight: 19,
									color: '#7C7C7C',
									marginTop: 5
								}}>
								Historic Return :{' '}
								<Text
									style={{
										fontFamily: 'Inter-Bold',
										fontSize: 14,
										lineHeight: 17,
										color: '#7C7C7C'
									}}>
									{trader.historical_return_percentage}%
								</Text>
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: 5
								}}>
								{ExpectedReutrn({
									percentage:
										trader.expected_return_percentage
								})}
								<Text
									style={{
										fontFamily: 'Inter-Regular',
										fontSize: 17,
										lineHeight: 20,
										color: '#7C7C7C',
										marginLeft: 10
									}}>
									Expected Return
								</Text>
							</View>
						</View>
					</View>
				</View>
				<Button
					buttonStyle={styles.buttonStyle}
					onPress={() => updateActiveTrader(trader)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	resCards: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		marginTop: 10,
		minHeight: 110,
		width: Dimensions.get('window').width - 40,
		borderWidth: 0.5,
		borderColor: '#EAEAEA',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		borderRadius: 16,
		padding: 20
	},
	banner_subheading: {
		fontSize: 17,
		fontFamily: 'Poppins-Medium',
		color: '#000',
		lineHeight: 20
	},
	buttonStyle: {
		borderRadius: 50,
		height: 26,
		width: 26,
		borderWidth: 1.79051,
		borderColor: '#BAB5B5'
	}
});

export default Trader;
