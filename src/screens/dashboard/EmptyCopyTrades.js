import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Dimensions
} from 'react-native';

const EmptyCopyTrades = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/dashboard-background.png')}
				style={styles.image}>
				<Text style={styles.heading}>
					You don't have any Copied Trades
				</Text>
				<Text style={styles.subheading}>
					will cancel this order on the exchange and remove this
					quantity for the copy action
				</Text>
			</ImageBackground>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexGrow: 1,
		justifyContent: 'center',
		// height: Dimensions.get('window').height * 0.7,
		// alignItems: 'center',
		paddingHorizontal: 20,
		// backgroundColor: '#ff00ff',
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	image: {
		// flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		width: '100%',
		aspectRatio: 1.5
		// backgroundColor: '#ff00ff'
	},
	heading: {
		fontSize: 20,
		color: '#000',
		textAlign: 'center',
		fontFamily: 'Poppins-SemiBold',
		lineHeight: 24
	},
	subheading: {
		marginTop: 5,
		fontSize: 16,
		lineHeight: 20,
		color: '#1F1F1F',
		textAlign: 'center',
		fontFamily: 'Inter-Regular'
	}
});
export default EmptyCopyTrades;
