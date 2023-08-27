import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HorizontalLine from '../../components/atoms/HorizontalLine';
import {useNavigation} from '@react-navigation/native';
const Footer = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.footer}>
			<View>
				<View>
					<Text style={styles.footerHeading}>Company</Text>
				</View>
				<View>
					<View style={styles.footer_container}>
						<TouchableOpacity
							onPress={() => navigation.navigate('About')}>
							<Text style={styles.footer_link_text}>About</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Privacy Policy')
							}>
							<Text
								style={[
									styles.footer_link_text,
									{paddingLeft: 22}
								]}>
								Privacy Policy
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.footer_container}>
						<TouchableOpacity
							onPress={() => navigation.navigate('Disclaimer')}>
							<Text style={styles.footer_link_text}>
								Disclaimer
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate('Terms Of Use')}>
							<Text style={styles.footer_link_text}>
								Terms of use
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<HorizontalLine lineStyle={styles.lineStyle} />

			<View style={styles.footer_social_wrapper}>
				<Text style={styles.join_community_text}>
					{' '}
					Join the community
				</Text>
				<View style={{display: 'flex', flexDirection: 'row'}}>
					<Icon
						name="whatsapp"
						size={48}
						color={'#0DC143'}
						style={{paddingRight: 24}}
					/>
					<Icon
						name="telegram"
						size={48}
						color={'#1877f2'}
						style={{paddingRight: 24}}
					/>
				</View>
				<Text style={styles.footerHeading}> Follow us</Text>
				<Icon
					name="linkedin"
					size={48}
					color={'#1877f2'}
					style={{paddingRight: 24}}
				/>
			</View>

			<Text style={styles.footer_box_text}>
				By continuing past this page, you agree to our Terms of service,
				Cookie policy, Privacy policy and Content policies. All
				trademarks are properties of their respective owners. 2022 ©
				Stint Infotech Pvt Ltd. All rights reserved
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	footer: {
		backgroundColor: '#192551',
		paddingTop: 30,
		paddingRight: 24,
		paddingBottom: 50,
		paddingLeft: 24
	},
	footer_container: {
		display: 'flex',
		flexDirection: 'row'
	},
	footer_link_text: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'Montserrat-Regular',
		lineHeight: 22,
		paddingRight: 40,
		paddingBottom: 20
	},
	footer_box_text: {
		color: '#fff',
		fontSize: 12,
		fontFamily: 'Montserrat-Regular',
		lineHeight: 19,
		marginTop: 14
	},
	footerHeading: {
		fontSize: 14,
		linrHeight: 17,
		fontFamily: 'Montserrat-Medium',
		color: '#fff',
		marginTop: 28,
		marginRight: 0,
		marginBottom: 18,
		marginLeft: 0
	},
	lineStyle: {
		backgroundColor: '#384575',
		height: 1,
		marginTop: 42,
		marginRight: 0,
		marginBottom: 25,
		marginLeft: 0
	},
	footer_social_wrapper: {
		marginBottom: 28
	},
	join_community_text: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'Montserrat-Medium',
		lineHeight: 17,
		marginTop: 28,
		marginBottom: 18
	}
});
export default Footer;
