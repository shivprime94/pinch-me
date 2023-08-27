import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, processColor} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import getStockData from '../../utils/getStockData';
const petrel = '#028090';
const GraphComponent = props => {
	const {coin, orderHistory} = props;
	const [endTime, setEndTime] = useState(Date.now());
	const [history, setHistory] = useState([]);
	const [data, setData] = useState({});
	useEffect(() => {
		getStockData({
			symbol: coin + 'USDT',
			interval: '4h',
			endTime: endTime,
			limit: 500
		}).then(response => {
			if (orderHistory) {
				const history = orderHistory?.map(i => {
					return {
						price: parseFloat(i.price.toFixed(1)),
						time: i.time
					};
				});
				setHistory(history);
				response = [...history, ...response];
				response = response.sort((a, b) => a.time - b.time);
			}
			setData({
				dataSets: [
					{
						values: [
							...response?.map(i => {
								return {y: i.price, x: i.time};
							})
						],
						label: '',
						config: {
							mode: 'CUBIC_BEZIER',
							drawValues: false,
							lineWidth: 2,
							drawCircles: true,
							circleColor: processColor(petrel),
							drawCircleHole: true,
							circleRadius: 1,
							highlightColor: processColor('black'),
							color: processColor(petrel),
							drawFilled: true,
							fillGradient: {
								colors: [
									processColor('#028090'),
									processColor('#00bfb2')
								],
								positions: [0, 0.5],
								angle: 90,
								orientation: 'TOP_BOTTOM'
							},
							fillAlpha: 1000,
							valueTextSize: 15
						}
					}
				]
			});
		});
	}, []);
	return (
		<View>
			<LineChart
				style={{
					width: Dimensions.get('screen').width,
					height: 250
				}}
				data={data}
				chartDescription={{text: ''}}
				legend={{
					enabled: false
				}}
				marker={{
					enabled: true,
					markerColor: processColor('white'),
					textColor: processColor('black')
				}}
				xAxis={{
					enabled: false
				}}
				yAxis={{
					left: {
						enabled: false
					},
					right: {
						enabled: false
					}
				}}
				animation={{
					durationX: 0,
					durationY: 1500,
					easingY: 'EaseInOutQuart'
				}}
				autoScaleMinMaxEnabled={true}
				drawGridBackground={false}
				drawBorders={false}
				touchEnabled={true}
				dragEnabled={true}
				scaleEnabled={true}
				scaleXEnabled={true}
				scaleYEnabled={true}
				pinchZoom={true}
				doubleTapToZoomEnabled={false}
				dragDecelerationEnabled={true}
				dragDecelerationFrictionCoef={0.99}
				keepPositionOnRotation={false}
			/>
		</View>
	);
};
export default GraphComponent;
