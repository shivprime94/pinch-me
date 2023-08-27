import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ActiveTrader from './ActiveTrader';
import Trader from './Trader';
import {useDispatch, useSelector} from 'react-redux';
import {getTraders} from '../../../store/game/actions';
import {ScrollView} from 'react-native';
import GraphComponent from '../../../components/graphComponent/graph';
import {Header} from '../../../components/molecules';

const GamePreview = ({route}) => {
	const {asset} = route.params;
	const dispatch = useDispatch();
	const traders = useSelector(state => state.game.traders);
	const [activeTrader, updateActiveTrader] = useState(null);

	useEffect(() => {
		dispatch(getTraders({asset: asset}));
	}, [dispatch, asset]);

	useEffect(() => {
		if (traders) {
			const traderWithMaxReturn = traders?.reduce(
				(traderWithMaxReturn, currentTrader) => {
					if (
						currentTrader.historical_return_percentage >
						traderWithMaxReturn.historical_return_percentage
					) {
						return currentTrader;
					}
					return traderWithMaxReturn;
				},
				{historical_return_percentage: 0}
			);
			updateActiveTrader(traderWithMaxReturn);
		}
	}, [traders]);

	return (
		<LinearGradient
			colors={['rgba(21, 37, 84, 0.26)', 'rgba(255, 255, 255, 0.0)']}
			x={0}
			y={1}
			x2={1}
			y2={0}
			style={{flex: 1}}>
			<ScrollView>
				<Header />
				<GraphComponent coin={asset} />
				{activeTrader && <ActiveTrader {...activeTrader} />}
				{traders &&
					activeTrader &&
					traders
						.filter(
							trader => trader.user_id !== activeTrader.user_id
						)
						.map(trader => (
							<Trader
								key={trader.user_id}
								trader={trader}
								updateActiveTrader={updateActiveTrader}
							/>
						))}
			</ScrollView>
		</LinearGradient>
	);
};

export default GamePreview;
