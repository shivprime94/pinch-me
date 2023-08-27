import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
// import {Slider} from '@miblanchard/react-native-slider';
import Slider from '@react-native-community/slider';
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const trackMark = () => {
	return <View style={styles.trackMark} />;
};

const CustomSlider = props => {
	const {handleSliderChange, value} = props;
	const {width} = useWindowDimensions();
	let left = 0;
	// const [value, updateValue] = useState(0);
	if (value < 10) {
		left = (value * (width - 72)) / 100 + 5;
	} else if (value < 100) {
		left = (value * (width - 72)) / 100;
	} else {
		left = (value * (width - 72)) / 100;
	}
	return (
		<View style={styles.sliderStyle}>
			<Text style={{...styles.sliderValuePopup, left: left}}>
				{value}%
			</Text>
			<Slider
				style={{width: width - 40}}
				minimumValue={0}
				maximumValue={100}
				step={1}
				maximumTrackTintColor="#F4F4F4"
				minimumTrackTintColor="#2f48a3"
				thumbTintColor="#1DBB73"
				defaultValue={0}
				value={value}
				valueLableFormat={value => `${value}%`}
				onValueChange={handleSliderChange}
				animateTransitions={true}
				// trackMarks={[0, 25, 50, 75, 100]}
				// renderTrackMarkComponent={trackMark}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	sliderStyle: {
		marginVertical: 20
	},
	sliderValuePopup: {
		color: '#000000'
	},
	trackMark: {
		width: 5,
		height: 5,
		backgroundColor: 'rgb(211,211,211)',
		borderRadius: 100
	}
});

export default CustomSlider;
