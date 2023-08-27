import React, {useState, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	SafeAreaView,
	ScrollView
} from 'react-native';
import Button from '../../components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import Carousel from './Carousel';
import {useSelector, useDispatch} from 'react-redux';
import {putBinanceDetails, updateUserDetails} from '../../store/global';
const Binance = () => {
	const [apiKey, setApiKey] = useState(''),
		[apiSecret, setApiSecret] = useState('');
	const [isValidInput, updateIsValidInput] = useState(false);
	const userVal = useSelector(updateUserDetails),
		USERID = userVal.payload.global.userDetails?.id;
	const {isCopyTrader} = userVal.payload.global;
	const navigation = useNavigation();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!userVal || !USERID) {
			navigation.navigate('Home');
		}
	}, [userVal, USERID]);

	const handleBinanceSignIn = async e => {
		// dispatch(setShowLoader(true));
		const binanceResponse = dispatch(
			putBinanceDetails({apiKey, apiSecret})
		);
		binanceResponse.then(({payload}) => {
			// dispatch(setShowLoader(false));
			if (payload?.data === 'success') {
				const path = isCopyTrader ? -1 : dashboard; // -1 is equivalent to hitting the back button
				if (path === -1) {
					navigation.goBack();
				} else {
					navigation.navigate('Dashboard');
				}
			} else if (payload?.err) {
				// dispatch(setToastMessage(payload.err));
				console.log('error', payload.err);
			} else {
				// dispatch(setToastMessage('Something went wrong'));
				console.log('error', 'Something went wrong');
			}
		});

		return;
	};

	useEffect(() => {
		if (apiKey && apiSecret) {
			if (validRegex.test(apiKey) && validRegex.test(apiSecret)) {
				updateIsValidInput(true);
			} else {
				updateIsValidInput(false);
			}
		}

		return () => updateIsValidInput(false);
	}, [apiKey, apiSecret]);

	const handleApiKeyInput = event => {
		const value = event.target.value;
		if (validRegex.test(value)) {
			setApiKey(value);
		} else {
			event.target.classList.add('error');
		}
	};

	const handleApiSecretInput = event => {
		const value = event.target.value;
		if (validRegex.test(value)) {
			setApiSecret(value);
		} else {
			event.target.classList.add('error');
		}
	};
	return (
		<SafeAreaView>
			<ScrollView style={{backgroundColor: '#fff'}}>
				<Text style={styles.styleText}>Connect Binance Account</Text>
				<View style={styles.input_container}>
					<TextInput
						type="text"
						placeholder="Enter API Key"
						style={styles.textInput}
						onChange={handleApiKeyInput}
						value={apiKey}
						autoComplete="off"
					/>
					<TextInput
						type="text"
						placeholder="API Secret"
						style={styles.textInput}
						value={apiSecret}
						onChange={handleApiSecretInput}
						autoComplete="off"
					/>
				</View>
				<Button
					buttonStyle={[styles.buttonStyle, {marginBottom: 20}]}
					textStyle={styles.buttonStyleText}
					onPress={handleBinanceSignIn}
					disabled={!isValidInput}>
					Confirm
				</Button>
				<Carousel />
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	input_container: {
		margin: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		backgroundColor: '#F2F2F2',
		padding: 12,
		marginTop: 10,
		borderRadius: 10,
		width: '100%',
		borderWidth: 1.0
	},
	buttonStyleText: {
		color: '#fff',
		fontSize: 14,
		textAlign: 'center',
		padding: 15,
		fontFamily: 'Popins-Medium',
		lineHeight: 16
	},
	buttonStyle: {
		backgroundColor: '#192551',
		borderRadius: 8,
		marginLeft: '2%',
		marginRight: '2%',
		minHeight: 50,
		marginTop: 10
	},
	styleText: {
		marginLeft: 12,
		marginTop: 10,
		color: '#111111',
		fontSize: 20,
		fontFamily: 'Popins-Bold',
		lineHeight: 24
	}
});
export default Binance;
