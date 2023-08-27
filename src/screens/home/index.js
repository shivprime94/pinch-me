import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, StatusBar} from 'react-native';
import Banner from './banner';
import CopyLoop from './copy-loop';
import InvestWithFriends from './invest-with-friends';
import OneClick from './one-click';
import PrivacyCallout from './privacy-callout';
import Faq from './faq';
import Footer from './footer';
import {useSelector} from 'react-redux';
import {useNavigationState} from '@react-navigation/native';

const Home = ({navigation}) => {
	const user = useSelector(state => state.global.user);
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const isUserInGame = useSelector(state => state.global.isUserInGame);
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const navigationState = useNavigationState(state => state);
	useEffect(() => {
		if (!user) {
			navigation.navigate('Home');
			return;
		}
		// if (user?.binance_code !== 2) {
		// 	navigation.navigate('Binance Auth');
		// }
		if (user?.pinch_token && isCopyTrader) {
			console.log('Going to preview');
			const previewRoute = navigationState.routes.find(
				route => route.name === 'Preview'
			);
			navigation.navigate('Preview', previewRoute.params);
		} else if (user?.pinch_token) {
			if (isUserInGame) {
				return navigation.navigate('Landing');
			}
			return navigation.navigate('Dashboard');
		}
	}, [user, navigation]);
	return (
		<SafeAreaView>
			<StatusBar />
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Banner />
				<InvestWithFriends />
				<OneClick />
				<CopyLoop />
				<PrivacyCallout />
				<Faq />
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};
export default Home;
