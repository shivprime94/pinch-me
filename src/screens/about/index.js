import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const About = () => {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
			<ScrollView>
				<Text style={styles.heading}>🚀 About us</Text>
				<Text style={styles.text}>
					Crypto investing across the world has largely been adopted
					by youngsters and they find the technology and its usage
					exciting and want to be a part of this revolutionary
					phenomenon. People rely on social networks to learn and
					share information about trading insights, new developments
					in the blockchain world and everything else about
					cryptocurrencies. They perform their analytics on platforms
					like Trading View and execute trades on exchanges.
				</Text>
				<Text style={styles.text}>
					This disintegration has caused havoc for these people and
					created a steep learning curve for everyone. We aim to help
					these people by providing them with a one-stop solution to
					learn, share and trade together.
				</Text>

				<Text style={styles.heading}>😎 The Founding Team</Text>
				<Text style={styles.text}>
					Pinch has been founded by a couple of friends who faced a
					similar problem while they were trying to collaborate while
					trading cryptos and options in India. The realisation of its
					scale inspired us to develop Pinch and help people like us
					all well if Mr. Musk is able to land us there soon. over the
					globe and hopefully Mars as
				</Text>
				<Text style={styles.text}>
					Join us if this inspires you. Drop us an email or call us.
				</Text>
				<Text style={styles.text}>+91 99339 24059 </Text>
				<Text style={styles.text}>shubham@pinch-me.com </Text>
				<Text style={styles.text}>ashwini@pinch-me.com</Text>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
		fontFamily: 'Montserrat-Bold',
		color: '#000',
		margin: 8,
		lineHeight: 24
	},
	text: {
		fontSize: 16,
		margin: 8,
		color: '#1F1F1F',
		fontFamily: 'Montserrat-Regular',
		lineHeight: 20
	}
});

export default About;
