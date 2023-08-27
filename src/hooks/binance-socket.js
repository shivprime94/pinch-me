import {useSelector} from 'react-redux';
import {updateInstruments} from '../store/global';

const useBinanceSocket = asset => {
	const liveData = useSelector(state => state.global.instrumentsData);
	const liveAssetData = liveData.find(
		liveAsset => liveAsset.symbol !== 'USDT' && liveAsset.symbol === asset
	);
	return liveAssetData;
};

export default useBinanceSocket;
