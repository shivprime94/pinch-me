import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tip} from '../../components/molecules/game';
import {useSelector} from 'react-redux';

const CurrentHeading = () => {
	const tips = useSelector(state => state.game.tips);

	return (
		<>
			<View style={styles.heading}>
				<Text style={styles.headingText}>
					Trade with friends and experts
				</Text>
			</View>
			{tips?.map(tip => (
				<View
					key={tip.asset + 1}
					style={{
						marginTop: 10
					}}>
					<Tip {...tip} key={tip.asset} />
				</View>
			))}
		</>
	);
};

const styles = StyleSheet.create({
	heading: {
		marginTop: 24,
		marginHorizontal: 20
	},
	headingText: {
		fontSize: 18,
		fontFamily: 'Poppins-Bold',
		color: '#000',
		lineHeight: 27,
		fontWeight: '600'
	}
});

export default CurrentHeading;
