import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SmallCoinSvg from '../../assets/coin-small-svg.svg';
import InvestSvg from '../../assets/invest-svg.svg';
import {Landing, ProfilePage, Portfolio} from '../../screens';
const Tab = createBottomTabNavigator();
// const TabButton = props => {
// 	console.log(props);
// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				backgroundColor: '#15234C',
// 				flexDirection: 'row'
// 			}}>
// 			<MaterialCommunityIcons name="home" size={30} color="#fff" />
// 			<Text
// 				style={{
// 					color: '#fff',
// 					fontSize: 12,
// 					fontWeight: 'bold',
// 					textAlign: 'center'
// 				}}>
// 				Invest
// 			</Text>
// 		</View>
// 	);
// };
const BottomNavigation = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#fff',
				tabBarLabelPosition: 'beside-icon',
				tabBarActiveBackgroundColor: '#15234C',
				tabBarInactiveBackgroundColor: '#fff',
				tabBarStyle: {
					height: 80,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				},
				tabBarItemStyle: {
					marginHorizontal: 10,
					height: 50,
					borderRadius: 12
				},
				tabBarLabelStyle: {
					fontSize: 16,
					fontFamily: 'Inter-SemiBold'
				}
			}}>
			<Tab.Screen
				name="tabs"
				component={Portfolio}
				options={{
					tabBarLabel: 'Invest',
					tabBarIcon: ({focused, color, size}) => (
						<InvestSvg
							style={{color: color}}
							height={15}
							width={15}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="Game"
				component={Landing}
				options={{
					tabBarLabel: 'Game',
					tabBarIcon: ({focused, color, size}) => (
						<SmallCoinSvg
							style={{color: focused ? '#FFE27A' : color}}
							height={size}
							width={size}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfilePage}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({focused, color, size}) => (
						<MaterialCommunityIcons
							name="account"
							color={focused ? '#FFE27A' : color}
							size={size}
						/>
					)
				}}
			/>
		</Tab.Navigator>
	);
};
export default BottomNavigation;
