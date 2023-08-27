import React, {useState, useEffect, useRef} from 'react';
import getStockData from '../../utils/getStockData';
import {View, useWindowDimensions, Easing} from 'react-native';
import {
	Canvas,
	Line,
	Path,
	runTiming,
	Skia,
	SkPath,
	useComputedValue,
	useValue,
	vec,
	Circle,
	Group
} from '@shopify/react-native-skia';
import {curveNatural, line, scaleLinear, scaleTime} from 'd3';
import Filters from './Filters';
import {useGraphTouchHandler} from './useGraphTouchHandler';
import {Popup} from './popup';
import {getYForX} from './Math.ts';

const Graph = props => {
	const {coin, orderHistory} = props;
	const [endTime, setEndTime] = useState(Date.now());
	const [history, setHistory] = useState(null);
	const [data, setData] = useState(null);
	const {height, width} = useWindowDimensions();
	const getX = useRef();
	const getY = useRef();

	const transition = useValue(1);
	const transitionState = useValue({
		current: 0,
		next: 1
	});

	const GRAPH_HEIGHT = height * 0.35;
	const GRAPH_WIDTH = width;

	const makeGraph = corruptData => {
		if (corruptData) {
			let data = corruptData.filter(data => data.time !== 0);

			const maxPrice = Math.max(...data?.map(val => val.price));
			const minPrice = Math.min(...data?.map(val => val.price));
			const maxTime = Math.max(...data?.map(val => val.time));
			const minTime = Math.min(...data?.map(val => val.time));

			const y = scaleLinear()
				.domain([minPrice, maxPrice])
				.range([GRAPH_HEIGHT, 35]);

			const x = scaleTime()
				.domain([new Date(minTime), new Date(maxTime)])
				.range([10, GRAPH_WIDTH - 10]);

			const curvedLine = line()
				.x(d => x(new Date(d.time)))
				.y(d => y(d.price))
				.curve(curveNatural)(data);

			const skPath = Skia.Path.MakeFromSVGString(curvedLine);

			getX.current = x;
			getY.current = y;

			return {
				maxPrice,
				minPrice,
				curve: skPath
			};
		}
		return null;
	};

	const transitionStart = end => {
		transitionState.current = {
			current: end,
			next: transitionState.current.current
		};
		transition.current = 0;
		runTiming(transition, 1, {
			duration: 750,
			easing: Easing.inOut(Easing.cubic)
		});
	};

	const graphData = makeGraph(data);

	const path = graphData?.curve;

	const popupX = useValue(0);
	const popupY = useValue(0);
	// const popupY = useComputedValue(
	// 	() => getYForX(path?.toCmds() || [], popupX.current),
	// 	[popupX, path]
	// );

	const onTouch = useGraphTouchHandler(
		popupX,
		popupY,
		GRAPH_WIDTH,
		GRAPH_HEIGHT
	);

	useEffect(() => {
		getStockData({
			symbol: coin + 'USDT',
			interval: '4h',
			endTime: endTime,
			limit: 250
		}).then(response => {
			if (orderHistory) {
				const history = orderHistory
					.map(i => {
						return {
							price: parseFloat(i.price.toFixed(1)),
							time: i.time,
							type: i.type
						};
					})
					.filter(order => order.time < endTime);
				setHistory(history);
				response = [...response];
				response = response.sort((a, b) => a.time - b.time);
			}
			setData(response);
			transitionStart(transitionState.current.next);
		});
	}, [endTime]);

	const updateEndTime = value => {
		const time = new Date(`2022-${value}-01`);
		console.log(time.getTime());
		setEndTime(time.getTime());
	};

	return (
		<View style={{flex: 1}}>
			<Filters updateEndTime={updateEndTime} />
			{path && (
				<Canvas
					style={{
						width: GRAPH_WIDTH,
						height: GRAPH_HEIGHT,
						backgroundColor: '#00bfb2',
						marginTop: 50
					}}
					onTouch={onTouch}>
					<Group>
						<Path
							style="stroke"
							path={path}
							strokeWidth={2}
							color="#FFFFFF"
						/>
						{history?.map(order => (
							<Circle
								cx={getX.current(order.time)}
								cy={getY.current(order.price)}
								r={5}
								color={
									order.type === 'BUY'
										? 'rgba(1, 190, 104, 0.5)'
										: 'rgba(240, 57, 101, 0.5)'
								}
							/>
						))}
						{/* <Popup x={popupX} y={popupY} /> */}
					</Group>
				</Canvas>
			)}
		</View>
	);
};

export default Graph;
