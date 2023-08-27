import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ExpectedReutrn = ({percentage}) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				height: 22,
				// width: 54,
				borderRadius: 6,
				backgroundColor: 'rgba(47, 227, 87, 0.15)'
			}}>
			<Text
				style={[
					styles.banner_subheading,
					{
						marginTop: 2
					}
				]}>
				{percentage}%
			</Text>
			<MaterialIcon
				name="arrow-up-bold"
				size={14}
				color={'#00C853'}
				style={{marginBottom: 1.5, marginLeft: 2}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	banner_subheading: {
		fontSize: 14,
		fontFamily: 'Poppins-Medium',
		color: '#000',
		lineHeight: 17
	}
});

export default ExpectedReutrn;
