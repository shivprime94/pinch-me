import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const Input = props => {
	const {inputValue, handleInputChange, inputLabelLeft, inputLabelRight} =
		props;
	return (
		<View style={styles.inputFieldWrapper}>
			<TextInput
				keyboardType="decimal-pad"
				style={styles.inputField}
				theme={{colors: {text: '#000000'}}}
				onChangeText={handleInputChange}
				value={inputValue}
			/>
			<Text style={styles.inputLabelLeft}>{inputLabelLeft}</Text>
			<Text style={styles.inputLabelRight}>{inputLabelRight}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	inputFieldWrapper: {
		display: 'flex',
		position: 'relative',
		marginTop: 10,
		flexDirection: 'row'
	},
	inputField: {
		width: '100%',
		backgroundColor: '#F2F2F2',
		paddingVertical: 14,
		paddingRight: 72,
		borderRadius: 6,
		textAlign: 'right',
		color: '#000000',
		alignItems: 'center'
	},
	inputLabelLeft: {
		position: 'absolute',
		left: 0,
		alignSelf: 'center',
		marginLeft: 16,
		fontSize: 15,
		color: '#808080',
		fontFamily: 'Roboto-Regular'
	},
	inputLabelRight: {
		position: 'absolute',
		right: 0,
		alignSelf: 'center',
		marginRight: 16,
		fontSize: 15,
		color: '#808080',
		fontFamily: 'Roboto-Regular'
	}
});

export default Input;
