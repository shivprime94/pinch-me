import React from 'react';
import {DataTable, List} from 'react-native-paper';
import {View, StyleSheet, ScrollView} from 'react-native';

const Table = props => {
	const {trades} = props;
	// console.log('trades', trades);
	return (
		<ScrollView style={styles.container}>
			{props.isExpanded && (
				<DataTable>
					<DataTable.Header>
						<DataTable.Title style={styles.headerText}>
							Type
						</DataTable.Title>
						<DataTable.Title style={styles.headerText}>
							QTY
						</DataTable.Title>
						<DataTable.Title style={styles.headerText}>
							Price
						</DataTable.Title>
					</DataTable.Header>
					{trades &&
						trades.map((trade, index) => (
							<DataTable.Row key={index}>
								<DataTable.Cell style={styles.rowText}>
									{trade.symbol}
								</DataTable.Cell>
								<DataTable.Cell style={styles.rowText}>
									{trade.orig_qty.toFixed(4)}
								</DataTable.Cell>
								<DataTable.Cell style={styles.rowText}>
									{trade.price.toFixed(2)}
								</DataTable.Cell>
							</DataTable.Row>
						))}
				</DataTable>
			)}
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	headerText: {
		fontSize: 13,
		fontWeight: '500',
		color: '#111111'
	},
	rowText: {
		fontSize: 12,
		color: '#333333',
		fontWeight: '400'
	},
	container: {
		maxHeight: 300
	}
});
export default Table;
