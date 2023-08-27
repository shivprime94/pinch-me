import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {Avatar} from '@rneui/themed';
import {ReturnPercentage, Button} from '../atoms';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
	const navigation = useNavigation();
	const user = useSelector(state => state.global.user);
	const previewDetails = useSelector(state => state.coins.previewDetails);
	let firstName = user.full_name.split(' ')[0];
	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	const historicReturn =
		previewDetails?.derived_metrics.historical_return_percentage;
	const handleBackAction = () => navigation.goBack();

	return (
		<View style={styles.headerContainer}>
			<Button onPress={handleBackAction}>
				<BackIcon name="arrowleft" size={25} color="#1C1C1C" />
			</Button>
			<View style={styles.headerContent}>
				<Avatar
					containerStyle={styles.headerAvatar}
					size={32}
					rounded
					source={{
						uri: 'https://randomuser.me/api/portraits/men/36.jpg'
					}}
				/>
				<View style={styles.headerTextContent}>
					<Text style={styles.headerUsername}>{firstName}</Text>
					<Text style={styles.headerUserHistoricReturn}>
						Historic return{' '}
						<ReturnPercentage>{historicReturn}</ReturnPercentage>
					</Text>
				</View>
			</View>
			<Icon name="share-a" size={20} color="#1C1C1C" />
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		// flex: 1
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 16,
		marginVertical: 20
	},
	headerContent: {
		flexGrow: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	headerTextContent: {
		color: '#000000'
	},
	headerUsername: {
		fontWeight: '700',
		fontSize: 14,
		lineHeight: 16.94,
		color: '#000000'
	},
	headerUserHistoricReturn: {
		flexDirection: 'row',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 16.94,
		color: '#000000',
		alignItems: 'center'
	},
	headerAvatar: {
		marginHorizontal: 10
	}
});

export default Header;
