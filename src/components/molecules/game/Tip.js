import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {CryptoIcon} from '../../atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {Divider, Avatar} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const Tip = props => {
	const {asset, traders, max_return} = props;
	const navigation = useNavigation();

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
					<CryptoIcon
						coin={asset}
						coinStyle={{
							width: 40,
							height: 40
						}}
					/>
					<View
						style={{
							marginHorizontal: 10
						}}>
						<View>
							<Text
								style={{
									fontFamily: 'Inter-Bold',
									fontSize: 16,
									fontWeight: '600',
									lineHeight: 19.36,
									color: '#000000'
								}}>
								{asset}
							</Text>
							<Text
								style={{
									fontFamily: 'Inter-Regular',
									fontSize: 14,
									lineHeight: 17,
									color: '#7C7C7C',
									marginTop: 5
								}}>
								Earn upto {max_return * 100}% Return
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					onPress={() =>
						navigation.navigate('GamePreview', {asset: asset})
					}>
					<View
						style={{
							backgroundColor: '#F0F0F0',
							borderRadius: 20,
							padding: 5,
							borderWidth: 1.79051,
							borderColor: '#FFFFFF'
						}}>
						<Icon
							name="chevron-right"
							size={25}
							color={'#152554'}
						/>
					</View>
				</TouchableOpacity>
			</View>
			<Divider
				style={{
					backgroundColor: 'rgba(229, 229, 229, 0)',
					height: 0.5,
					marginTop: 15
				}}
			/>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginTop: 15
				}}>
				<Avatar
					size={32}
					rounded
					source={{
						uri: 'https://randomuser.me/api/portraits/men/36.jpg'
					}}
				/>
				<Avatar
					size={32}
					rounded
					source={{
						uri: 'https://randomuser.me/api/portraits/men/35.jpg'
					}}
				/>
				<Avatar
					size={32}
					rounded
					source={{
						uri: 'https://randomuser.me/api/portraits/men/34.jpg'
					}}
				/>
				<Text
					style={{
						fontFamily: 'Inter-Regular',
						fontSize: 13,
						fontWeight: '500',
						lineHeight: 17,
						color: '#7C7C7C'
					}}>
					+{traders} Traders
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		minHeight: 150,
		width: Dimensions.get('window').width - 40,
		borderWidth: 0.75,
		borderColor: '#E5E5E5',
		borderRadius: 10,
		padding: 20
	}
});

export default Tip;
