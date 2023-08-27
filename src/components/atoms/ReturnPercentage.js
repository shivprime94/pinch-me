import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ReturnPercentage = ({children}) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 6,
				backgroundColor: 'rgba(47, 227, 87, 0.15)',
				paddingHorizontal: 10,
				paddingVertical: 5
			}}>
			<Text
				style={[
					styles.banner_subheading,
					{
						marginTop: 2
					}
				]}>
				{children}%
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
		fontSize: 10,
		fontWeight: '700',
		fontFamily: 'Poppins-Medium',
		color: '#000',
		lineHeight: 15
	}
});

export default ReturnPercentage;
