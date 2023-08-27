import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
const CarouselItem = ({item}) => {
	const {width, height} = Dimensions.get('window');
	return (
		<View>
			<Image source={item.image} style={[styles.image, {width}]} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		height: 445,
		resizeMode: 'cover'
	}
});
export default CarouselItem;
