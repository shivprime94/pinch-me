import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Input from '../../components/molecules/Input';
import Button from '../../components/atoms/Button';
const AddRecommendation = () => {
	return (
		<View>
			<View style={styles.modelContainer}>
				<Text style={styles.headingText}>
					Please add your Recommendation of buy price
				</Text>
				<Text style={styles.subHeadingText}>
					Create trades on any asset in your portfolio and publish for
					the community to copy. On every successful copy action, you
					make 20% of the
				</Text>
				<View style={styles.priceContainer}>
					<View style={styles.priceBox}>
						<Text style={styles.headingText}>Current Price</Text>
						<Text style={styles.headingText}>USDT 3999</Text>
					</View>
					<View style={styles.inputBox}>
						<Input
							inputValue={'0.00'}
							inputLabelLeft="Enter Price"
							inputLabelRight={'USDT'}
						/>
					</View>
				</View>
				<View style={{marginTop: 40}}>
					<Button
						buttonStyle={styles.buttonStyle}
						textStyle={styles.buttonTextStyle}>
						Add Recommendation
					</Button>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	modelContainer: {
		backgroundColor: '#F0F4FF',
		padding: 20,
		height: Dimensions.get('window').height / 2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	priceContainer: {
		flexDirection: 'column',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#fff',
		borderRadius: 16,
		marginTop: 10
	},
	priceBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	buttonStyle: {
		position: 'relative',
		bottom: 0,
		backgroundColor: '#152554',
		minHeight: 50,
		width: '100%',
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonTextStyle: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 20,
		fontFamily: 'Poppins-Regular'
	},
	headingText: {
		fontSize: 20,
		fontFamily: 'Poppins-Bold',
		color: '#000',
		lineHeight: 30,
		marginBottom: 10
	},
	subHeadingText: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#666666',
		lineHeight: 21,
		marginBottom: 10
	}
});
export default AddRecommendation;
