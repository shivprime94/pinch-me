import {
	interpolateColors,
	Group,
	useComputedValue,
	Box,
	rrect,
	rect
} from '@shopify/react-native-skia';
import React from 'react';

// import {COLORS} from '../Model';

export const Popup = ({x, y}) => {
	// const color = useComputedValue(
	// 	() =>
	// 		interpolateColors(
	// 			x.current / width,
	// 			COLORS.map((_, i) => i / COLORS.length),
	// 			COLORS
	// 		),
	// 	[x]
	// );
	const transform = useComputedValue(
		() => [{translateX: x.current}, {translateY: y.current}],
		[x, y]
	);
	return (
		<Group transform={transform}>
			<Box box={rrect(rect(64, 64, 128, 128), 24, 24)} color="#000000" />
		</Group>
	);
};
