import React, {useState} from 'react';
import {DataTable, List} from 'react-native-paper';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ReturnPercentage} from '../../../components/atoms';
import Icon from 'react-native-vector-icons/Feather';
import {DialogBox} from '../../../components/molecules';
const Table = props => {
	// const {trades} = props;
	const [confirmVisible, setConfirmVisible] = useState(false);
	return (
		<ScrollView style={styles.container}>
			{/* {props.isExpanded && ( */}
			<DataTable>
				<DataTable.Header>
					<DataTable.Title textStyle={styles.headerText}>
						Order ID
					</DataTable.Title>
					<DataTable.Title textStyle={styles.headerText}>
						Invested
					</DataTable.Title>
					<DataTable.Title textStyle={styles.headerText}>
						Price
					</DataTable.Title>
					<DataTable.Title>
						{/* <Text style={{...styles.headerText, marginRight: 40}}> */}
						Expected Return
						{/* </Text> */}
					</DataTable.Title>
				</DataTable.Header>
				<DataTable.Row>
					<DataTable.Cell textStyle={styles.rowText}>
						1949209
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						100 Points
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						1000
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
							<ReturnPercentage>12</ReturnPercentage>
							<TouchableOpacity
								onPress={() => setConfirmVisible(true)}>
								<Icon
									name="x-circle"
									size={11}
									color="#828282"
									style={{
										marginLeft: 10
									}}
								/>
							</TouchableOpacity>
						</View>
					</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell textStyle={styles.rowText}>
						1949209
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						100 Points
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						1000
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
							<ReturnPercentage>12</ReturnPercentage>
							<TouchableOpacity
								onPress={() => setConfirmVisible(true)}>
								<Icon
									name="x-circle"
									size={11}
									color="#828282"
									style={{
										marginLeft: 10
									}}
								/>
							</TouchableOpacity>
						</View>
					</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell textStyle={styles.rowText}>
						1949209
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						100 Points
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						1000
					</DataTable.Cell>
					<DataTable.Cell textStyle={styles.rowText}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
							<ReturnPercentage>12</ReturnPercentage>
							<TouchableOpacity
								onPress={() => setConfirmVisible(true)}>
								<Icon
									name="x-circle"
									size={11}
									color="#828282"
									style={{
										marginLeft: 10
									}}
								/>
							</TouchableOpacity>
						</View>
					</DataTable.Cell>
				</DataTable.Row>
			</DataTable>
			<DialogBox
				showModal={confirmVisible}
				onConfirm={() => setConfirmVisible(false)}
			/>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	headerText: {
		fontSize: 14,
		fontFamily: 'Inter-Medium',
		color: '#111111'
	},
	rowText: {
		fontSize: 14,
		color: '#333333',
		fontFamily: 'Inter-Regular'
	},
	// container: {
	// 	maxHeight: 300
	// },
	rowShift: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// width: 50,
		borderWidth: 1,
		borderColor: 'red'
	},
	removeBorder: {
		border: 'none'
		// borderWidth: 1,
		// borderColor: 'red',
		// alignItems: 'center'
		// flexDirection: 'row',
		// justifyContent: 'center'
	}
});
export default Table;
