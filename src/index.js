import React, {useEffect, useState} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './navigation/routes';
import gameRoutes from './navigation/gameRoutes';
import {retrieveUserData} from './utils/app-storage';
import {updateUser, updateSymbol, updateShareLink} from './store/global';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getAccountInfo} from './store/global/actions';
import {getAllSymbols} from './store/coins/actions';
import {useLiveDataProvider} from './hooks';

const Stack = createNativeStackNavigator();

const LogoTitle = ({route}) => {
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const previewDetails = useSelector(state => state.coins.previewDetails);
	return (
		<View>
			<Image
				style={{height: 26, width: 100}}
				source={require('./assets/pinch-logo.png')}
			/>
			{isCopyTrader && route.name === 'Preview' && (
				<Text style={{color: '#000000'}}>
					Shared by{' '}
					{previewDetails && previewDetails['share_trader_name']}
				</Text>
			)}
		</View>
	);
};

const Main = () => {
	const dispatch = useDispatch();
	const account = useSelector(state => state.global.account);
	const userDetails = useSelector(state => state.global.user);
	const isUserInGame = useSelector(state => state.global.isUserInGame);
	const aggregateSymbols = useSelector(state => state.coins.aggregateSymbols);

	const connectToBinance = useLiveDataProvider();

	useEffect(() => {
		console.log('Account: ', account);
		if (!account && userDetails) {
			dispatch(getAccountInfo());
		}
		if (!aggregateSymbols) {
			dispatch(getAllSymbols());
		}
		if (Array.isArray(aggregateSymbols)) {
			console.log('Connecting to binance websocket...');
			// const coins = aggregateSymbols?.filter(
			// 	coin => coin.asset !== 'USDT'
			// );
			connectToBinance(aggregateSymbols);
		}
		retrieveUserData().then(existingUserData => {
			if (existingUserData && !userDetails) {
				// console.log('updating user.....');
				dispatch(updateUser(existingUserData));
			}
		});
	}, [dispatch, connectToBinance, account, userDetails, aggregateSymbols]);

	return (
		<Stack.Navigator
			screenOptions={isUserInGame ? {headerShown: false} : ''}>
			{isUserInGame
				? gameRoutes.map(route => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							key={route.name}
							options={({route}) => ({
								headerTitle: () => <LogoTitle route={route} />
							})}
						/>
				  ))
				: routes.map(route => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							key={route.name}
						/>
				  ))}
		</Stack.Navigator>
	);
};

export default Main;
