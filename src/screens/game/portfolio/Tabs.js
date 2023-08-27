import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Tab} from '@rneui/themed';
import CopiedTrades from './CopiedTrades';
import SharedTrades from './SharedTrades';
import {Button, SvgComponent} from '../../../components/atoms';
import {BottomDrawer} from '../../../components/molecules';
import AvailableBalance from './AvailableBalance';
import AddRecommendation from '../AddRecommendation';
const Tabs = () => {
	const [index, setIndex] = React.useState(0);
	const [isVisible, setIsVisible] = React.useState(false);
	const [isVisible1, setIsVisible1] = React.useState(false);
	return (
		<View>
			<Tab
				value={index}
				onChange={setIndex}
				indicatorStyle={{
					backgroundColor: '#000',
					height: 3,
					borderRadius: 10,
					width: 150,
					marginLeft: 20,
					marginRight: 20
				}}>
				<Tab.Item
					title="Copied Trades"
					titleStyle={{
						color: index === 0 ? '#000' : '#818181',
						fontSize: 16,
						fontFamily: 'Inter-SemiBold',
						lineHeight: 20
					}}></Tab.Item>
				<Tab.Item
					title="Shared Trades"
					titleStyle={{
						color: index === 1 ? '#000' : '#818181',
						fontSize: 16,
						fontFamily: 'Inter-SemiBold',
						lineHeight: 20
					}}></Tab.Item>
			</Tab>
			{index === 0 ? <CopiedTrades /> : <SharedTrades />}
			<View
				style={{
					marginTop: 20,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginHorizontal: 20
				}}>
				<Button
					onPress={() => setIsVisible(true)}
					buttonStyle={styles.whiteButtonStyle}
					textStyle={styles.whiteButtonStyleText}>
					Available Balance
				</Button>
				<Button
					onPress={() => setIsVisible1(true)}
					buttonStyle={styles.whiteButtonStyle}
					textStyle={styles.whiteButtonStyleText}>
					Add Recommendation
				</Button>
			</View>

			<BottomDrawer
				isModalVisible={isVisible}
				toggleModal={() => setIsVisible(!isVisible)}>
				<AvailableBalance />
			</BottomDrawer>
			<BottomDrawer
				isModalVisible={isVisible1}
				toggleModal={() => setIsVisible1(!isVisible1)}>
				<AddRecommendation />
			</BottomDrawer>
		</View>
	);
};
const styles = StyleSheet.create({
	whiteButtonStyle: {
		flexGrow: 1,
		backgroundColor: '#152554',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		height: 48,
		width: 160
	},
	whiteButtonStyleText: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		lineHeight: 21,
		fontFamily: 'Poppins-SemiBold'
	}
});
export default Tabs;
