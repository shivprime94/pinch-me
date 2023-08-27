import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	SafeAreaView
} from 'react-native';
import noKYC from '../../assets/no-kyc.png';
import noDeposit from '../../assets/no-deposit.png';
import deepEncryption from '../../assets/deep-encryption.png';

function PrivacyCallout() {
	return (
		<ScrollView style={styles.privacy_container}>
			<View style={{marginBottom: 24}}>
				<Text style={styles.headingText}>
					Privacy is <Text style={styles.specialText}>built in</Text>
				</Text>
			</View>
			<View style={styles.privacy_box}>
				<Image source={noKYC}></Image>
				<Image source={noDeposit}></Image>
				<Image source={deepEncryption}></Image>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	privacy_container: {
		backgroundColor: '#FFF',
		paddingTop: 40,
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 40
	},
	privacy_box: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headingText: {
		textAlign: 'center',
		fontSize: 24,
		lineHeight: 29,
		color: '#000',
		fontFamily: 'Montserrat-Bold'
	},
	specialText: {
		color: '#F5BF5A',
		textAlign: 'center',
		fontSize: 24,
		lineHeight: 29,
		fontFamily: 'Montserrat-Bold'
	}
});
export default PrivacyCallout;
