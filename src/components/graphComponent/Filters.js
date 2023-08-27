import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button} from '../atoms';

const Filters = props => {
	const {updateEndTime} = props;
	const [year, setYear] = useState(null);
	const [month, setMonth] = useState(null);
	const [showYear, updateShowYears] = useState(false);
	const [showMonth, updateShowMonths] = useState(false);
	const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017];
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	return (
		<View style={styles.filtersContainer}>
			<Button
				buttonStyle={styles.filterButtonStyle}
				textStyle={styles.filterTextStyle}>
				Default
			</Button>
			<View style={styles.yearsContainer}>
				<Button
					buttonStyle={styles.filterButtonStyle}
					textStyle={styles.filterTextStyle}>
					{year || 'Year'}
				</Button>
				<View style={styles.yearsOptionsContainer}>
					<ScrollView
						contentContainerStyle={
							styles.yearsOptionsContentContainer
						}
						nestedScrollEnabled>
						{years.map(year => (
							<Button
								buttonStyle={styles.yearButtonStyle}
								textStyle={styles.yearTextStyle}>
								{year}
							</Button>
						))}
					</ScrollView>
				</View>
			</View>
			<ScrollView horizontal>
				{months.map((month, index) => (
					<Button
						key={index}
						buttonStyle={styles.filterButtonStyle}
						textStyle={styles.filterTextStyle}
						onPress={() => updateEndTime(index + 1)}>
						{month}
					</Button>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	filtersContainer: {
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		zIndex: 1,
		paddingVertical: 20,
		backgroundColor: '#00bfb2'
	},
	filterButtonStyle: {
		backgroundColor: '#000000',
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginHorizontal: 5
	},
	filterTextStyle: {
		color: '#FFFFFF',
		marginBottom: 2
	},
	yearsContainer: {
		position: 'relative',
		zIndex: 1,
	},
	yearsOptionsContainer: {
		height: 80,
		flex: 1,
		position: 'absolute',
		zIndex: 1,
	},
	yearsOptionsContentContainer: {
		flexGrow: 1,
		backgroundColor: 'red',
		zIndex: 1,
	}
});

export default Filters;
