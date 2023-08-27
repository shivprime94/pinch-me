import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import {Divider} from '@rneui/themed';
import Button from '../../components/atoms/Button';
import TelegramSVG from '../../assets/telegram-svg.svg';
import ShareWithFriendsSVG from '../../assets/share-with-friends-svg.svg';
const CreateShareEarn = () => {
	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: '#fff'
			}}>
			<View style={styles.container}>
				<View style={styles.gameBalanceContainer}>
					<View
						style={{
							marginTop: 60
						}}>
						<Text style={styles.banner_subheading}>
							REWARDS EARNED
						</Text>
						<Text style={styles.banner_heading}>10 POINTS</Text>
					</View>
					<Image
						source={require('../../assets/coin.png')}
						style={{
							width: 130,
							height: 130,
							marginTop: 30
						}}
					/>
				</View>
				<View style={styles.rewardContainer}>
					<View>
						<Text style={styles.rewardText}>
							Points{'\n'}Invested{'\n'}
							<Text style={styles.rewardMoneyText}>10 USDT</Text>
						</Text>
					</View>
					<Divider style={styles.dividerStyle}></Divider>
					<View>
						<Text style={styles.rewardText}>
							Points{'\n'}Invested{'\n'}
							<Text style={styles.rewardMoneyText}>10 USDT</Text>
						</Text>
					</View>
					<Divider style={styles.dividerStyle}></Divider>
					<View>
						<Text style={styles.rewardText}>
							Total{'\n'}Reward{'\n'}
							<Text style={styles.rewardMoneyText}>10</Text>
						</Text>
					</View>
				</View>
			</View>
			{fullTimeLine({headline: 'Create trades and share with friends'})}
			{fullTimeLine({
				headline: 'Pick the trader’s trade and share with friends'
			})}
			{EarnPoints()}
			<View
				style={{
					backgroundColor: '#Fff',
					marginTop: 20,
					height: 220
				}}>
				<View
					style={{
						marginHorizontal: 20
					}}>
					<Text
						style={{
							...styles.RewardCalculationText,
							marginLeft: 0,
							color: '#5E5C5C',
							fontFamily: 'Poppins-SemiBold'
						}}>
						How we calculate rewards
					</Text>
				</View>
				{RewardCalculation({
					text: `Reward (2%)*(Points invested) + (20%)*(profit earned)`
				})}
				{RewardCalculation({
					text: `If your friend invests 1,000 points and makes 1,400  ${'\n'}points, Return becomes = 400 points`
				})}
				{RewardCalculation({
					text: 'Reward = (2%)*(1000) + (20%)*(400) = 100 points'
				})}
			</View>
		</ScrollView>
	);
};

const fullTimeLine = ({headline}) => {
	return (
		<View
			style={{
				width: Dimensions.get('window').width - 40,
				height: 311,
				marginHorizontal: 20,
				backgroundColor: 'rgba(255, 255, 255, 0.04)',
				marginTop: 10,
				marginBottom: 20
			}}>
			<Text
				style={{
					fontSize: 16,
					fontFamily: 'Poppins-Bold',
					color: '#000',
					lineHeight: 24,
					marginTop: 20
				}}>
				{headline}
			</Text>
			<View
				style={{
					marginTop: 20
				}}>
				<TimeLineComponent
					number={1}
					text={`Connect telegram channel or create trade ${'\n'}from portfolio`}
					showLine={true}
				/>
				<TimeLineComponent
					number={2}
					text={'Share with friends. They copy the trades'}
					showLine={true}
				/>
				<TimeLineComponent
					number={3}
					text={'Make 20% of the profits your friends make'}
					showLine={false}
				/>
			</View>
			<Button
				buttonStyle={[
					styles.buttonStyle,
					{
						width: Dimensions.get('window').width - 40,
						marginTop: 20
					}
				]}
				textStyle={styles.buttonStyleText}>
				My Portfolio
			</Button>
		</View>
	);
};
const TimeLineComponent = ({text, showLine, number}) => {
	return (
		<>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<View style={styles.timeLineCricle}>
					{number == 1 ? (
						<TelegramSVG width={32} height={32} />
					) : number == 2 ? (
						<ShareWithFriendsSVG />
					) : (
						<Text
							style={{
								fontSize: 16,
								fontFamily: 'Poppins-Bold',
								color: '#192551',
								lineHeight: 24
							}}>
							20%
						</Text>
					)}
				</View>
				<View>
					<Text style={styles.timelineText}>{text}</Text>
				</View>
			</View>
			{showLine && <View style={styles.timeLineVerticalLine}></View>}
		</>
	);
};
const EarnPoints = () => {
	return (
		<View style={styles.earnPointsContainer}>
			<Image source={require('../../assets/earn-usdt.png')}></Image>
			<Text style={styles.earnPointsHeadingText}>Earn 5 USDT Points</Text>
			<Text style={styles.earnPointsSubHeadingText}>Share the app.</Text>
			<Text style={styles.earnPointsSubHeadingText}>
				when you friends invest game points
			</Text>
			<Button
				buttonStyle={styles.buttonStyle}
				textStyle={styles.buttonStyleText}>
				Share
			</Button>
		</View>
	);
};
const RewardCalculation = ({text}) => {
	return (
		<View
			style={{
				marginTop: 20,
				flexDirection: 'row',
				alignItems: 'center'
			}}>
			<View
				style={{
					...styles.timeLineVerticalLine,
					backgroundColor: '#029DA0',
					height: 39,
					width: 6,
					borderRadius: 8
				}}></View>
			<View
				style={{
					marginLeft: 20
				}}>
				<Text style={styles.RewardCalculationText}>{text}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#192551',
		height: 313
	},
	gameBalanceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20
	},
	banner_heading: {
		fontSize: 40,
		color: '#fff',
		fontFamily: 'Poppins-Bold',
		lineHeight: 48
	},
	banner_subheading: {
		fontSize: 16,
		fontFamily: 'Poppins-Medium',
		color: '#fff',
		lineHeight: 18
	},
	iconStyle: {
		backgroundColor: '#F0F0F0',
		borderRadius: 20,
		padding: 10,
		marginLeft: 10
	},
	rewardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 90,
		width: Dimensions.get('window').width - 40,
		marginHorizontal: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.04)',
		borderRadius: 20
	},
	rewardText: {
		fontSize: 12,
		fontFamily: 'Poppins-Medium',
		color: '#fff',
		lineHeight: 18,
		textAlign: 'center'
	},
	rewardMoneyText: {
		fontSize: 16,
		fontFamily: 'Poppins-Bold',
		color: '#fff',
		lineHeight: 24,
		textAlign: 'center',
		letterSpacing: 0.9
	},
	dividerStyle: {
		backgroundColor: '#27396C',
		height: 50,
		width: 1,
		marginHorizontal: 10
	},

	//EarnPoints Component

	earnPointsContainer: {
		width: Dimensions.get('window').width - 40,
		height: 311,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		backgroundColor: '#ECF1FF',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#C9D1E8',
		marginTop: 40
	},
	earnPointsHeadingText: {
		fontSize: 21,
		fontFamily: 'Poppins-Bold',
		color: '#000000',
		lineHeight: 27.7,
		textAlign: 'center',
		marginTop: 20
	},
	earnPointsSubHeadingText: {
		fontSize: 16,
		fontFamily: 'Poppins-Medium',
		color: '#000000',
		lineHeight: 18,
		textAlign: 'center',
		marginTop: 10
	},
	buttonStyle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 160,
		height: 48,
		backgroundColor: '#152554',
		borderRadius: 8,
		marginTop: 10
	},
	buttonStyleText: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		lineHeight: 17
	},
	//timeline component vertical line
	timeLineVerticalLine: {
		position: 'relative',
		left: 22,
		top: 0,
		backgroundColor: '#ECF1FF',
		width: 1,
		height: 40,
		borderWidth: 1,
		borderColor: '#ECF1FF'
	},
	timelineText: {
		fontSize: 15,
		fontFamily: 'Poppins-Medium',
		color: '#1F1F1F',
		lineHeight: 22,
		marginLeft: 20
	},
	timeLineCricle: {
		backgroundColor: '#ECF1FF',
		width: 50,
		height: 50,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	RewardCalculationText: {
		fontSize: 15,
		fontFamily: 'Poppins-Regular',
		color: '#404041',
		lineHeight: 22,
		marginLeft: 10
	}
});
export default CreateShareEarn;
