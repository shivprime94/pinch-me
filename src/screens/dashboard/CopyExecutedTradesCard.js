import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import {Divider} from '@rneui/themed';
import Table from './Table';

const CopyExecutedTradesCard = props => {
	const {executedTrades} = props;
	const [isExpanded, setIsExpanded] = React.useState(false);
	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<ScrollView>
			<View style={styles.copy_trade_card}>
				<View style={styles.card_top}>
					<Text style={styles.styleText}>Executed Trades</Text>
				</View>
				<View style={styles.card_top}>
					<Text style={styles.styleSubText}>
						{executedTrades.length} order (s)
					</Text>
				</View>
				<Divider
					style={{
						backgroundColor: '#E5E5E5',
						height: 1,
						marginVertical: 10
					}}
				/>
				<Table isExpanded={isExpanded} trades={executedTrades} />
				<TouchableOpacity onPress={toggleExpanded}>
					<View style={styles.card_top}>
						<Text style={[styles.styleSubText, {color: '#029DA0'}]}>
							View all Executed Trades
						</Text>
						{isExpanded ? (
							<Icon
								name="arrow-up"
								size={12}
								style={[
									styles.styleSubText,
									{color: '#029DA0'}
								]}></Icon>
						) : (
							<Icon
								name="arrow-down"
								size={12}
								style={[
									styles.styleSubText,
									{color: '#029DA0'}
								]}></Icon>
						)}
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	copy_trade_card: {
		backgroundColor: '#fff',
		elevation: 5,
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOffset: {width: -2, height: 2},
		shadowOpacity: 0.6,
		shadowRadius: 12,
		borderRadius: 12,
		elevation: 5,
		padding: 16,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		minHeight: 115,
		borderWidth: 1,
		borderColor: '#E5E5E5'
	},
	card_top: {
		marginTop: 5,
		marginBottom: 5,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	GainColor: {
		color: '#02A01B',
		marginLeft: 5
	},
	LossColor: {
		color: '#F64A35',
		marginLeft: 5
	},
	TextColor: {
		color: '#029DA0'
	},
	styleText: {
		color: '#111111',
		fontSize: 17,
		fontFamily: 'Inter-SemiBold'
	},
	styleSubText: {
		color: '#70747C',
		fontSize: 14,
		lineHeight: 14,
		marginBottom: 8,
		marginTop: 8,
		fontFamily: 'Inter-Regular'
	}
});
export default CopyExecutedTradesCard;
