import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Tooltip from 'react-native-walkthrough-tooltip';
import AvailableBalance from './AvailableBalance';
import InfoCircle from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
const Statistics = props => {
	const coin_info = props.statistics;
	const data = props.data;
	const coin = props.coin;
	const [infoToggle, setInfoToggle] = useState(false);
	const [toolTipVisible1, setToolTipVisible1] = useState(false);
	const [toolTipVisible2, setToolTipVisible2] = useState(false);
	const [toolTipVisible3, setToolTipVisible3] = useState(false);
	const [toolTipVisible4, setToolTipVisible4] = useState(false);
	const userDetails = useSelector(state => state.global.user);
	console.log('Statistics: ', userDetails);
	return (
		<>
			<View style={styles.return_container}>
				<Text style={styles.styleText}>Statistics</Text>
				<View style={styles.return_container_child}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<Text style={styles.styleSubText}>
							Historic Return ({coin_info.total_filled_orders})
						</Text>
						<Tooltip
							isVisible={toolTipVisible1}
							// disableShadow={true}
							contentStyle={{
								backgroundColor: '#444'
							}}
							backgroundColor="rgba(0,0,0,0)"
							content={
								<View>
									<Text style={styles.toolTipText}>
										Return profile of user based on order
										history
									</Text>
								</View>
							}
							placement="top"
							onClose={() => setToolTipVisible1(false)}>
							<TouchableOpacity
								onPress={() => setToolTipVisible1(true)}>
								<InfoCircle
									name="information-circle-sharp"
									size={14}
									style={{
										color: '#787a8d',
										marginLeft: 5
									}}
								/>
							</TouchableOpacity>
						</Tooltip>
					</View>
					<Text style={styles.styleSubText}>
						{parseFloat(
							isNaN(coin_info.historical_return_percentage)
								? '0'
								: coin_info.historical_return_percentage
						).toFixed(2)}
						%
					</Text>
				</View>
				<View style={styles.return_container_child}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<Text style={styles.styleSubText}>
							Expected Return (%)
						</Text>
						<Tooltip
							isVisible={toolTipVisible2}
							contentStyle={{
								backgroundColor: '#444'
							}}
							backgroundColor="rgba(0,0,0,0)"
							content={
								<View>
									<Text style={styles.toolTipText}>
										Return expected of user based on order
										live orders
									</Text>
								</View>
							}
							placement="top"
							onClose={() => setToolTipVisible2(false)}>
							<TouchableOpacity
								onPress={() => setToolTipVisible2(true)}>
								<InfoCircle
									name="information-circle-sharp"
									size={14}
									style={{
										color: '#787a8d',
										marginLeft: 5
									}}
								/>
							</TouchableOpacity>
						</Tooltip>
					</View>
					<Text style={styles.styleSubText}>
						{parseFloat(
							isNaN(coin_info.win_percentage)
								? '0'
								: coin_info.win_percentage
						).toFixed(2)}
						%
					</Text>
				</View>
				<View style={styles.return_container_child}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<Text style={styles.styleSubText}>
							Buy Price ({coin_info.total_buy_orders})
						</Text>
						<Tooltip
							isVisible={toolTipVisible3}
							contentStyle={{
								backgroundColor: '#444'
							}}
							backgroundColor="rgba(0,0,0,0)"
							content={
								<View>
									<Text style={styles.toolTipText}>
										Average value of the instrument as per
										the buying history of the user
									</Text>
								</View>
							}
							placement="top"
							onClose={() => setToolTipVisible3(false)}>
							<TouchableOpacity
								onPress={() => setToolTipVisible3(true)}>
								<InfoCircle
									name="information-circle-sharp"
									size={14}
									style={{
										color: '#787a8d',
										marginLeft: 5
									}}
								/>
							</TouchableOpacity>
						</Tooltip>
					</View>
					<Text
						style={[
							styles.styleSubText,
							{
								color: '#029da0'
							}
						]}>
						{parseFloat(
							isNaN(coin_info.average_buy_price)
								? '0'
								: coin_info.average_buy_price
						).toFixed(2)}{' '}
						USDT
					</Text>
				</View>
				<View style={styles.return_container_child}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						<Text style={styles.styleSubText}>
							Latest Buy Price
						</Text>
						<Tooltip
							isVisible={toolTipVisible4}
							contentStyle={{
								backgroundColor: '#444'
							}}
							backgroundColor="rgba(0,0,0,0)"
							content={
								<View>
									<Text style={styles.toolTipText}>
										Price of the most recent buy order of
										the user
									</Text>
								</View>
							}
							placement="top"
							onClose={() => setToolTipVisible4(false)}>
							<TouchableOpacity
								onPress={() => setToolTipVisible4(true)}>
								<InfoCircle
									name="information-circle-sharp"
									size={14}
									style={{
										color: '#787a8d',
										marginLeft: 5
									}}
								/>
							</TouchableOpacity>
						</Tooltip>
					</View>
					<Text
						style={[
							styles.styleSubText,
							{
								color: '#029da0'
							}
						]}>
						{parseFloat(
							isNaN(coin_info.latest_buy_price)
								? '0'
								: coin_info.latest_buy_price
						).toFixed(2)}{' '}
						USDT
					</Text>
				</View>
			</View>
			{userDetails && <AvailableBalance data={data} coin={coin} />}
		</>
	);
};

const styles = StyleSheet.create({
	return_container: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 16,
		marginBottom: 16,
		paddingBottom: 0
	},
	return_container_child: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 8
	},
	styleText: {
		color: '#000',
		fontSize: 20,
		fontFamily: 'Poppins-Bold',
		lineHeight: 29,
		fontStyle: 'normal'
	},
	styleSubText: {
		color: '#444444',
		fontSize: 16,
		// marginTop: 10,
		fontFamily: 'Poppins-Regular',
		fontStyle: 'normal',
		lineHeight: 20
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	toolTipText: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		fontStyle: 'normal',
		lineHeight: 20,
		color: '#fff'
	}
});
export default Statistics;
