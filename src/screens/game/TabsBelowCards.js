// import React, {useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Tab} from '@rneui/themed';
// import TabsBelowCardCopiedTrades from './TabsBelowCardCopiedTrades';
// import TabsBelowCardSharedTrades from './TabsBelowCardsSharedTrades';
// const TabsBelowCard = () => {
// 	const [index, setIndex] = useState(0);
// 	return (
// 		<View>
// 			<Tab
// 				value={index}
// 				onChange={setIndex}
// 				indicatorStyle={{
// 					backgroundColor: '#000',
// 					height: 3,
// 					borderRadius: 10,
// 					width: 150,
// 					marginLeft: 20,
// 					marginRight: 20
// 				}}>
// 				<Tab.Item
// 					title="Copied Trades"
// 					titleStyle={{
// 						color: index === 0 ? '#000' : '#818181',
// 						fontSize: 16,
// 						fontFamily: 'Inter-SemiBold',
// 						lineHeight: 20
// 					}}></Tab.Item>
// 				<Tab.Item
// 					title="Shared Trades"
// 					titleStyle={{
// 						color: index === 1 ? '#000' : '#818181',
// 						fontSize: 16,
// 						fontFamily: 'Inter-SemiBold',
// 						lineHeight: 20
// 					}}></Tab.Item>
// 			</Tab>
// 			{index === 0 ? (
// 				<TabsBelowCardCopiedTrades />
// 			) : (
// 				<TabsBelowCardSharedTrades />
// 			)}
// 		</View>
// 	);
// };
// export default TabsBelowCard;
