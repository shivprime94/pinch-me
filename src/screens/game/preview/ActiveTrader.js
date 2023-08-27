import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Divider, Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {updateShareLink} from '../../../store/global';
import {useDispatch} from 'react-redux';

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

const ActiveTrader = props => {
	const {
		user_name,
		historical_return_percentage,
		expected_return_percentage,
		share_link,
		asset
	} = props;

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const navigateToCopyTraderPreview = () => {
		navigation.navigate('Preview', {symbol: asset, shareLink: share_link});
	};

	return (
		<View style={styles.container}>
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
									uri: 'https://randomuser.me/api/portraits/men/56.jpg'
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
								{user_name}
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
										color: '#7C7C7C',
										marginTop: 5
									}}>
									{historical_return_percentage}%
								</Text>
							</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						backgroundColor: '#F0F0F0',
						borderRadius: 50,
						padding: 8,
						borderWidth: 1.79051,
						borderColor: '#FFFFFF'
					}}>
					<Icon name="check" size={20} color="#152554" />
				</View>
			</View>
			<Divider
				style={{
					backgroundColor: '#E5E5E5',
					height: 0.5,
					marginTop: 10
				}}
			/>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginVertical: 10
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					{ExpectedReutrn({percentage: expected_return_percentage})}
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
				<Button
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonStyleText}
					onPress={navigateToCopyTraderPreview}>
					View / Copy
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		marginTop: 20,
		minHeight: 150,
		width: Dimensions.get('window').width - 40,
		borderWidth: 0.5,
		borderColor: '#162654',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		borderRadius: 10,
		padding: 20
	},
	banner_subheading: {
		fontSize: 17,
		fontFamily: 'Poppins-Medium',
		color: '#000',
		lineHeight: 20
	},
	buttonStyle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#152554',
		borderRadius: 12,
		padding: 13
	},
	buttonStyleText: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		lineHeight: 17
	}
});

export default ActiveTrader;
