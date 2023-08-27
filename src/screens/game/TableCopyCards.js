// import React from 'react';
// import {DataTable, List} from 'react-native-paper';
// import {View, StyleSheet, ScrollView} from 'react-native';
// import ExpectedReutrn from './ExpectedReturn';
// import Icon from 'react-native-vector-icons/Feather';
// const Table = props => {
// 	// const {trades} = props;
// 	return (
// 		<ScrollView style={styles.container}>
// 			{/* {props.isExpanded && ( */}
// 			<DataTable>
// 				<DataTable.Header>
// 					<DataTable.Title textStyle={styles.headerText}>
// 						Order ID
// 					</DataTable.Title>
// 					<DataTable.Title textStyle={styles.headerText}>
// 						Invested
// 					</DataTable.Title>
// 					<DataTable.Title textStyle={styles.headerText}>
// 						Price
// 					</DataTable.Title>
// 					<DataTable.Title textStyle={styles.headerText}>
// 						Expected Return
// 					</DataTable.Title>
// 				</DataTable.Header>
// 				{/* {trades &&
// 						trades.map((trade, index) => ( */}
// 				<DataTable.Row>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1949209
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						100 Points
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1000
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						<View>
// 							{ExpectedReutrn({percentage: 12.6})}
// 							<Icon name="x-circle" size={11} color="#828282" />
// 						</View>
// 					</DataTable.Cell>
// 				</DataTable.Row>

// 				{/* <DataTable.Row>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1949209
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						100 Points
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1000
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						<View>
// 							{ExpectedReutrn({percentage: 12.6})}
// 							<Icon name="x-circle" size={11} color="#828282" />
// 						</View>
// 					</DataTable.Cell>
// 				</DataTable.Row> */}
// 				{/* <DataTable.Row>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1949209
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						100 Points
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						1000
// 					</DataTable.Cell>
// 					<DataTable.Cell textStyle={styles.rowText}>
// 						<View>
// 							{ExpectedReutrn({percentage: 12.6})}
// 							<Icon name="x-circle" size={11} color="#828282" />
// 						</View>
// 					</DataTable.Cell>
// 				</DataTable.Row> */}

// 				{/* ))} */}
// 			</DataTable>
// 			{/* )} */}
// 		</ScrollView>
// 	);
// };
// const styles = StyleSheet.create({
// 	headerText: {
// 		fontSize: 14,
// 		fontFamily: 'Inter-Medium',
// 		color: '#111111'
// 	},
// 	rowText: {
// 		fontSize: 14,
// 		color: '#333333',
// 		fontFamily: 'Inter-Regular'
// 	},
// 	// container: {
// 	// 	maxHeight: 300
// 	// },
// 	rowShift: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		// width: 50,
// 		borderWidth: 1,
// 		borderColor: 'red'
// 	},
// 	removeBorder: {
// 		border: 'none'
// 		// borderWidth: 1,
// 		// borderColor: 'red',
// 		// alignItems: 'center'
// 		// flexDirection: 'row',
// 		// justifyContent: 'center'
// 	}
// });
// export default Table;
