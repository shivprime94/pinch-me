import {React, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Faq = () => {
	const [faq1, setFaq1] = useState(false);
	const [faq2, setFaq2] = useState(false);
	const [faq3, setFaq3] = useState(false);
	const [faq4, setFaq4] = useState(false);
	const [faq5, setFaq5] = useState(false);
	const [faq6, setFaq6] = useState(false);
	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>Frequently asked questions</Text>
			<View style={styles.rcCollapse}>
				<TouchableOpacity onPress={() => setFaq1(!faq1)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>What is Pinch?</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq1 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							Pinch is a social trading platform that allows you
							to copy the trades of other traders.
						</Text>
					</View>
				)}

				<TouchableOpacity onPress={() => setFaq2(!faq2)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>
							How and what will be shared with the link?
						</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq2 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							You can choose to share information on an instrument
							with your friends and they will be able to see the
							prices on sell orders, your history of buy and sell
							prices on the instrument and your % return profile.
							No one will ever get to know about the amount you
							have invested in history and are currently on an
							instrument. Only the prices will get copied to the
							friend's profile.
						</Text>
					</View>
				)}

				<TouchableOpacity onPress={() => setFaq3(!faq3)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>
							How do I know what trades I have copied?
						</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq3 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							You can always visit your dashboard and get to see
							the trades that have been copied on your trading
							account. Along with the trades, you can see the
							proportion you have invested, expected return and
							realised return when the trade gets executed. Or you
							can always visit your exchange to see the trades.
						</Text>
					</View>
				)}
				<TouchableOpacity onPress={() => setFaq4(!faq4)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>
							What do I do if I want to abort the copy action?
						</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq4 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							You can visit your dashboard on the platform and
							click on the cancel button for either order or the
							instrument to cancel all the orders. Also, you can
							cancel orders on your trading account, we will
							remove that proportion for future actions.
						</Text>
					</View>
				)}
				<TouchableOpacity onPress={() => setFaq5(!faq5)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>
							How do I integrate my binance account?
						</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq5 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							You will be asked to integrate the exchange account
							upon login. There is a tutorial on the same screen
							to help you with the integration.
						</Text>
					</View>
				)}
				<TouchableOpacity onPress={() => setFaq6(!faq6)}>
					<View style={styles.titleContainer}>
						<Text style={styles.questionsText}>
							How do I know what is happening with my binance
							account?
						</Text>
						<MaterialIcons
							name="keyboard-arrow-down"
							size={30}
							color={'#1F1F1F'}></MaterialIcons>
					</View>
				</TouchableOpacity>
				{faq6 && (
					<View style={styles.body}>
						<Text style={styles.answerText}>
							As per the permissions we have received, we can
							never place, modify or cancel orders without your
							will to do so. These permissions are required to
							make your experience with the platform seamless and
							we don't have any control over your account. You can
							read the “terms and conditions” and “privacy policy”
							to get the whole information.
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: '#fff'
		// display: 'flex',
		// flexDirection: 'column',
		// justifyContent: 'space-between'
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		background: '#F5F5F5'
	},
	body: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 10,
		background: '#F5F5F5',
		borderRadius: 5
	},
	headingText: {
		fontSize: 20,
		lineHeight: 29,
		marginBottom: 20,
		padding: 10,
		color: '#000',
		fontFamily: 'Montserrat-Regular'
	},
	questionsText: {
		fontSize: 16,
		color: '#1F1F1F',
		fontFamily: 'Montserrat-Medium',
		lineHeight: 28
	},
	answerText: {
		fontSize: 14,
		color: '#1F1F1F',
		fontFamily: 'Montserrat-Regular',
		lineHeight: 28
	},
	rcCollapse: {
		backgroundColor: '#fff',
		border: 'none'
	}
});
export default Faq;
