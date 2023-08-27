import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	SafeAreaView,
	ScrollView,
	useWindowDimensions,
	Animated
} from 'react-native';

const Paginator = ({data, scrollX}) => {
	const {width} = useWindowDimensions();
	return (
		<View
			style={{
				flexDirection: 'row',
				height: 34,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			{data.map((_, i) => {
				const inputRange = [
					(i - 1) * width,
					i * width,
					(i + 1) * width
				];
				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp'
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp'
				});
				return (
					<Animated.View
						style={[
							styles.dot,
							opacity,
							{
								backgroundColor:
									i === 0 ? '#2CB9B0' : '#0C0D34',
								width: dotWidth
							}
						]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4
	}
});
export default Paginator;
