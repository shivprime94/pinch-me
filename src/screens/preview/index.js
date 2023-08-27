import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAccountInfo} from '../../store/global/actions';
import {createPreview, getPreview} from '../../store/coins/actions';
import {updateUser, updateSymbol, updateShareLink} from '../../store/global';
import ShareTrader from './ShareTrader';
import CopyTrader from './CopyTrader';
import {Header} from '../../components/molecules';

const Preview = ({route}) => {
	const {symbol, shareLink} = route.params;
	const dispatch = useDispatch();
	const isCopyTrader = useSelector(state => state.global.isCopyTrader);
	const account = useSelector(state => state.global.account);
	const userDetails = useSelector(state => state.global.user);
	const previewDetails = useSelector(state => state.coins.previewDetails);
	useEffect(() => {
		if (shareLink) {
			console.log(
				'calling update symbol and share link from preview/index.js'
			);
			dispatch(updateSymbol(symbol));
			dispatch(updateShareLink(shareLink));
			dispatch(getPreview({shareLink: shareLink})).then(response => {
				if (!response.payload.link_expired) {
					if (
						response.payload.share_trade_agg.user_id ===
						userDetails?.id
					) {
						dispatch(updateShareLink(false));
						dispatch(updateSymbol(symbol));
						dispatch(createPreview({asset: symbol}));
					}
				}
			});
		} else {
			console.log('CREATING PREVIEW');
			dispatch(updateSymbol(symbol));
			dispatch(createPreview({asset: symbol}));
		}
	}, [dispatch, symbol, shareLink]);

	useEffect(() => {
		if (userDetails && !account) {
			dispatch(getAccountInfo());
		}
		// if (previewDetails && userDetails && isCopyTrader) {
		// 	if (userDetails.id === previewDetails.share_trade_agg.user_id) {
		// 		dispatch(updateShareLink(false));
		// 		dispatch(updateSymbol(symbol));
		// 		dispatch(createPreview({asset: symbol}));
		// 	}
		// }
	}, [dispatch, account, userDetails, previewDetails, symbol, isCopyTrader]);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
			<Header />
			{isCopyTrader ? <CopyTrader /> : <ShareTrader />}
		</SafeAreaView>
	);
};

export default Preview;
