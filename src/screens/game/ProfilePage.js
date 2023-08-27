import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider, Avatar, SocialIcon} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import FlowTree from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {BottomDrawer} from '../../components/molecules';
import ConnectExchange from './ConnectExchange';
const subCards = ({iconName, heading, subHeading, setIsVisible}) => {
	const navigation = useNavigation();
	return (
		<View style={styles.subCard}>
			<View
				style={{
					height: 42,
					width: 42,
					borderRadius: 10,
					backgroundColor: '#ECF1FF',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10
				}}>
				<FlowTree name={iconName} size={20} color="#152554" />
			</View>
			<View
				style={{
					marginLeft: 20
				}}>
				<Text style={styles.subCardHeading}>{heading}</Text>
				<Text style={styles.subCardSubHeading}>{subHeading}</Text>
			</View>
			<View
				style={[
					styles.iconStyle,
					{
						position: 'absolute',
						right: 20,
						top: '50%'
					}
				]}>
				{setIsVisible ? (
					<TouchableOpacity
						onPress={() => {
							setIsVisible(true);
						}}>
						<Icon name="right" size={10} color="#152554" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity>
						<Icon name="right" size={10} color="#152554" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};
const YourGameBalance = () => {
	return (
		<View style={styles.gameBalanceContainer}>
			<View>
				<Text style={styles.banner_subheading}>YOUR GAME BALANCE</Text>
				<Text style={styles.banner_heading}>1000 POINTS</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: 5
					}}>
					<Text style={styles.banner_subheading}>
						Earn more points by {'\n'}refering your friends
					</Text>
					<View style={styles.iconStyle}>
						<Icon name="right" size={10} color="#152554" />
					</View>
				</View>
			</View>
			<Image
				source={require('../../assets/coin.png')}
				style={{
					width: 130,
					height: 130,
					marginTop: 30
				}}
			/>
		</View>
	);
};
const ProfilePage = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: '#fff'
			}}>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<View style={styles.profileImage}>
						<Avatar
							rounded
							size={96}
							source={{
								uri: 'https://randomuser.me/api/portraits/men/56.jpg'
							}}
						/>
					</View>
					<Text style={styles.usernameText}>Gaurav</Text>
					<Text style={styles.emailId}>hello.gaurav@gmail.com</Text>
				</View>
				<View
					style={{
						marginTop: 20
					}}>
					{YourGameBalance()}
				</View>
				<View style={{marginTop: 20}}>
					{subCards({
						iconName: 'flow-tree',
						heading: 'Connect exchange',
						subHeading: 'Subheading',
						setIsVisible
					})}
					<BottomDrawer
						isModalVisible={isVisible}
						toggleModal={() => setIsVisible(!isVisible)}>
						<ConnectExchange />
					</BottomDrawer>
				</View>
				<View style={{marginTop: 10}}>
					{subCards({
						iconName: 'copy',
						heading: 'Copied trades',
						subHeading: 'Subheading'
					})}
				</View>
			</View>
			<View
				style={{
					backgroundColor: '#fff',
					alignItems: 'center'
				}}>
				{subCards({
					iconName: 'share',
					heading: 'Share app',
					subHeading: 'Subheading'
				})}
				{subCards({
					iconName: 'flow-tree',
					heading: 'Rate app',
					subHeading: 'Subheading'
				})}
				{subCards({
					iconName: 'flow-tree',
					heading: 'Privacy policy',
					subHeading: 'Subheading'
				})}
				{subCards({
					iconName: 'flow-tree',
					heading: 'FAQs',
					subHeading: 'Subheading'
				})}
				{subCards({
					iconName: 'flow-tree',
					heading: 'Logout',
					subHeading: 'Subheading'
				})}
			</View>
			{/* <View>
				<SocialIcon type={'whatsapp'} iconType={'whatsapp'} />
			</View> */}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ECF1FF',
		alignItems: 'center',
		height: 540,
		borderBottomRightRadius: 24,
		borderBottomLeftRadius: 24,
		paddingTop: 30
	},
	profileContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	profileImage: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		borderRadius: 90,
		borderWidth: 3.62577,
		borderColor: '#fff',
		padding: 5
	},
	usernameText: {
		fontFamily: 'Poppins-Bold',
		fontSize: 24,
		lineHeight: 33,
		color: '#152554',
		marginTop: 10
	},
	emailId: {
		fontFamily: 'Poppins-Regular',
		fontSize: 11,
		lineHeight: 16,
		color: '#152554'
	},

	//Game Balance
	gameBalanceContainer: {
		backgroundColor: '#192551',
		width: Dimensions.get('window').width - 40,
		height: 130,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
		borderRadius: 16
	},
	banner_heading: {
		fontSize: 25,
		color: '#fff',
		fontFamily: 'Poppins-Bold',
		lineHeight: 38
	},
	banner_subheading: {
		fontSize: 12,
		fontFamily: 'Poppins-Medium',
		color: '#fff',
		lineHeight: 18
	},
	iconStyle: {
		backgroundColor: '#F0F0F0',
		borderRadius: 20,
		padding: 10,
		marginLeft: 10
	},

	//SubCard
	subCard: {
		backgroundColor: '#fff',
		width: Dimensions.get('window').width - 40,
		display: 'flex',
		flexDirection: 'row',
		padding: 20,
		borderRadius: 16
	},
	subCardHeading: {
		fontSize: 18,
		fontFamily: 'Inter-Bold',
		color: '#000000',
		lineHeight: 22
	},
	subCardSubHeading: {
		fontSize: 16,
		fontFamily: 'Inter-Medium',
		color: '#70747C',
		lineHeight: 24
	}
});

export default ProfilePage;
