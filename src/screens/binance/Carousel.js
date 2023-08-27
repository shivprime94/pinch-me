import React, {useState, useRef} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	SafeAreaView,
	FlatList,
	Animated,
	ScrollView
} from 'react-native';

import CarouselItem from './CarouselItem';
import data from './data';
import Paginator from './Paginator';
const Onboarding = () => {
	const slidesRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const viewableItemsChanged = useRef(({viewableItems}) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;
	const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

	return (
		<View>
			<FlatList
				data={data}
				horizontal
				keyExtractor={item => item.id}
				pagingEnabled
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {x: scrollX}}}],
					{useNativeDriver: false}
				)}
				viewableItemsChanged={viewableItemsChanged}
				showsHorizontalScrollIndicator={false}
				viewabilityConfig={viewConfig}
				bounces={false}
				scrollEventThrottle={32}
				ref={slidesRef}
				renderItem={({item}) => <CarouselItem item={item} />}
			/>
			<Paginator data={data} scrollX={scrollX} />
		</View>
	);
};

export default Onboarding;
