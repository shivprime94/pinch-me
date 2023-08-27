import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Divider, Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AddRecommendation from './AddRecommendation';
import TabsBelowCard from './TabsBelowCards';
import ExpectedReutrn from './ExpectedReturn';
const GamePreviewCard = () => {
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
								Shubham
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
									12%
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
					<Icon name="check" size={16} color="#152554" />
				</View>
			</View>
			<Divider
				style={{
					backgroundColor: '#E5E5E5',
					height: StyleSheet.hairlineWidth,
					marginTop: 20
				}}
			/>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: 12
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					{ExpectedReutrn({percentage: 12})}
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
					onPress={() => {
						navigation.navigate('ProfilePage');
					}}
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonStyleText}>
					View / Copy
				</Button>
			</View>
		</View>
	);
};

const RestCards = () => {
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
								Gaurav
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
									12%
								</Text>
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: 5
								}}>
								{ExpectedReutrn({percentage: 12})}
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
				<View
					style={{
						borderRadius: 50,
						height: 22,
						width: 22,
						borderWidth: 1.79051,
						borderColor: '#BAB5B5'
					}}></View>
			</View>
		</View>
	);
};
const GamePreview = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	return (
		<View
			style={{
				backgroundColor: '#ECF1FF',
				flex: 1,
				paddingTop: 20
			}}>
			{GamePreviewCard()}
			{RestCards(12)}
			{/* <Button
				onPress={() => {
					setIsVisible(true);
				}}
				buttonStyle={[
					styles.buttonStyle,
					{position: 'absolute', top: 0}
				]}
				textStyle={styles.buttonStyleText}>
				Open Recommedation
			</Button> */}
			{/* <AddRecommendation
				isVisible={isVisible}
				setIsVisible={setIsVisible}
			/>
			<TabsBelowCard /> */}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		minHeight: 150,
		width: Dimensions.get('window').width - 40,
		borderWidth: 1,
		borderColor: '#162654',
		borderRadius: 16,
		padding: 20
	},
	resCards: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		marginVertical: 10,
		minHeight: 110,
		width: Dimensions.get('window').width - 40,
		borderWidth: 1,
		borderColor: '#EAEAEA',
		borderRadius: 16,
		padding: 20
	},
	banner_subheading: {
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		color: '#000',
		lineHeight: 17
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
export default GamePreview;
