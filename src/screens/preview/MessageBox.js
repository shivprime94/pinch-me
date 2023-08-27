import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Successfull from '../../assets/successful.png';
import Button from '../../components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
const MessageBox = ({visible, setVisible}) => {
	const navigation = useNavigation();
	return (
		<Modal
			visible={visible}
			coverScreen={false}
			backdropColor={'#000'}
			backdropOpacity={0.5}>
			<View style={styles.container}>
				<View style={styles.content}>
					{/* <TouchableOpacity
						onPress={() => {
							setVisible(false);
						}}>
						<Icon name="check-circle" size={20} color="black" />
					</TouchableOpacity> */}
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Image source={Successfull}></Image>
						<Text
							style={{
								color: '#01B2AB',
								fontSize: 20,
								lineHeight: 24,
								fontFamily: 'Inter-Bold',
								marginTop: 15
							}}>
							Congratulations !
						</Text>
						<Text
							style={{
								color: '#000',
								fontSize: 14,
								lineHeight: 16,
								fontFamily: 'Inter-Medium',
								marginTop: 16
							}}>
							Yay! trade copied
						</Text>
						<Text
							style={{
								color: '#696969',
								fontSize: 13,
								lineHeight: 17.1,
								fontFamily: 'Inter-Regular',
								marginTop: 10,
								marginHorizontal: 20
							}}>
							Your order of BNB of 10 has been placed on Binance.
							The copy action will get triggered once your order
							gets successfully executed.
						</Text>
					</View>
				</View>
				<View
					style={{
						position: 'absolute',
						bottom: 20,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Text
						style={{
							color: '#696969',
							fontSize: 13,
							lineHeight: 17.1,
							fontFamily: 'Inter-Regular'
						}}>
						Visit your dashboard to follow the updates.
					</Text>
					<Button
						onPress={() => {
							setVisible(false);
							navigation.navigate('Dashboard');
						}}
						buttonStyle={styles.buttonStyle}
						textStyle={styles.buttonStyleText}>
						View Dashboard
					</Button>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		marginBottom: 40
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
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		lineHeight: 17
	}
});

export default MessageBox;
