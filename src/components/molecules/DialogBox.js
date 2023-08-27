import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {
	TouchableOpacity,
	gestureHandlerRootHOC
} from 'react-native-gesture-handler';

const DialogContent = gestureHandlerRootHOC(props => {
	const {onConfirm, onCancel} = props;

	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<View
					style={{
						width: 80,
						height: 80,
						margin: 'auto',
						backgroundColor: '#01B2AB',
						borderRadius: 50,
						alignSelf: 'center'
					}}></View>
				<Text
					style={{
						fontFamily: 'Inter-Bold',
						fontSize: 17,
						lineHeight: 22.42,
						marginTop: 16,
						marginBottom: 4,
						color: '#000000',
						alignSelf: 'center'
					}}>
					Are you sure?
				</Text>
				<Text
					style={{
						fontFamily: 'Inter-Medium',
						fontSize: 12,
						lineHeight: 15.83,
						color: '#666666',
						alignSelf: 'center'
					}}>
					Do you want to delete the entry?
				</Text>
				<View
					style={{
						borderColor: 'rgba(0, 0, 0, 0.12)',
						borderWidth: StyleSheet.hairlineWidth,
						marginTop: 20,
						width: '100%'
					}}></View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-evenly'
					}}>
					<TouchableOpacity
						style={styles.openButton}
						onPress={onCancel}>
						<Text
							style={[
								styles.textStyle,
								{
									color: 'rgb(31, 31, 31)'
								}
							]}>
							Cancel
						</Text>
					</TouchableOpacity>
					<View
						style={{
							borderColor: 'rgba(0, 0, 0, 0.12)',
							borderWidth: StyleSheet.hairlineWidth
						}}></View>
					<TouchableOpacity
						style={styles.openButton}
						onPress={onConfirm}>
						<Text style={styles.textStyle}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
});

const DialogBox = props => (
	<Modal animationType="slide" transparent={true} visible={props.showModal}>
		<DialogContent {...props} />
	</Modal>
);

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: 22
	},
	modalView: {
		width: '70%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 24,
		paddingTop: 16,
		// paddingLeft: 16,
		// paddingRight: 16,
		// alignItems: 'center',
		// shadowColor: '#000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 10
		// elevation: 2,
		// margin: 10,
		// borderColor: '#01B2AB',
		// borderWidth: 1
	},
	textStyle: {
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		color: '#01B2AB'
	}
});

export default DialogBox;
