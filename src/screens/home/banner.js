import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import PinchLogo from '../../assets/pinch-logo.png';
import HorizontalLine from '../../components/atoms/HorizontalLine';
import Button from '../../components/atoms/Button';
import {useGoogleLogin} from '../../hooks';
import Icon from 'react-native-vector-icons/AntDesign';

const Banner = () => {
	const handleGoogleLogin = useGoogleLogin();

	return (
		<View style={styles.container}>
			{/* <Image source={PinchLogo} style={{marginTop: 10, margin: 5}} /> */}
			<View style={styles.banner}>
				<Text style={styles.banner_heading}>
					<Text style={styles.specialText}>Share</Text> in cryptos{' '}
					{'\n'} with friends
				</Text>
				<Button
					textStyle={styles.banner_button_text}
					buttonStyle={styles.banner_button}
					onPress={handleGoogleLogin}>
					<Icon name="google" size={20} /> Login with google
				</Button>
				<HorizontalLine lineStyle={styles.lineStyle} />
				<Text style={styles.banner_subheading}>
					Evaluate before investing {'\n'} in Pinch
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#192551',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	banner: {
		height: 400,
		// marginTop: 100,
		// marginBottom: 100,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	banner_heading: {
		// marginBottom: 5,
		fontSize: 32,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat-Bold',
		lineHeight: 39
	},
	banner_subheading: {
		marginTop: 20,
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
		lineHeight: 24
	},
	banner_button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		marginTop: 10,
		backgroundColor: '#fff',
		padding: 12
		// width: 225
	},
	banner_button_text: {
		color: '#000',
		fontSize: 20,
		textAlign: 'center',
		lineHeight: 22,
		fontFamily: 'Montserrat-Medium'
	},
	specialText: {
		color: '#F5BF5A'
	},
	lineStyle: {
		backgroundColor: '#8ad0dc',
		height: 2,
		width: 64,
		marginTop: 20,
		marginBottom: 10,
		borderRadius: 50
	}
});
export default Banner;
