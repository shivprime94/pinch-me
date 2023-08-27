import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Share, View} from 'react-native';
import AddSellOrder from './AddSellOrder';
import PinchOrder from './PinchOrder';
import {Button} from '../../components/atoms';
import {BottomDrawer, DialogBox} from '../../components/molecules';
import Statistics from './Statisics';
import GraphComponent from '../../components/graphComponent/graph';
// import GraphComponent from '../../components/graphComponent/graphComponent';
import {useSelector, useDispatch} from 'react-redux';
import {updateUserDetails} from '../../store/global';
import {Divider} from '@rneui/themed';
import ExecutedOrder from './ExecutedOrder';
import SellOrderDrawer from './SellOrderDrawer';
import {
	executeSellOrders,
	putPinchOrder,
	cancelOrEditOrder
} from '../../store/orders/actions';
import {createPreview} from '../../store/coins/actions';
import {BASE_URL} from '../../utils/endpoints';

const ShareTrader = () => {
	const CURRENT_TIMESTAMP = new Date();
	const dispatch = useDispatch();
	const userDetails = useSelector(state => state.global.userDetails);
	const previewDetails = useSelector(state => state.coins.previewDetails);
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const isUserInGame = useSelector(state => state.global.isUserInGame);

	const [isModalVisible, setModalVisible] = useState(false);
	const [editSellOrder, setEditSellOrder] = useState(null);
	const [deleteSellOrder, setDeleteSellOrder] = useState(null);

	const userId = userDetails?.id;

	const newOrders = previewDetails?.order_proportion?.filter(({Order}) =>
		Boolean(Order.pinch_order_id && !Order.orderId)
	);
	const executedOrders = previewDetails?.order_proportion?.filter(({Order}) =>
		Boolean(Order.orderId)
	);

	const orderHistory = previewDetails?.filled_order_history?.map(i => {
		return {
			price: i.usdt_price,
			time: new Date(i.time).getTime(),
			type: i.side
		};
	});

	useEffect(() => {
		if (!isModalVisible) {
			resetEditSellOrder();
		}
	}, [isModalVisible]);

	const toggleModal = () => setModalVisible(!isModalVisible);

	const handleSellOrderEdit = order => {
		setEditSellOrder(order);
		toggleModal();
	};

	const handleSellOrderDelete = order => {
		setDeleteSellOrder(order);
	};

	const handleDeleteConfirmation = async () => {
		let deletedOrder = {
			...deleteSellOrder,
			updateTime: CURRENT_TIMESTAMP
		};
		if (isUserInGame) {
			deletedOrder.status = 'CANCEL';
			console.log('DELETED ORDER', deletedOrder);
			await dispatch(cancelOrEditOrder(deletedOrder));
		} else {
			const order = deleteSellOrder;
			deletedOrder = {
				exchange: 'binance',
				pinch_status: 'CANCEL',
				user_id: userId,
				id: order?.pinch_order_id,
				asset: order?.symbol.substr(0, 3),
				symbol: order?.symbol,
				price: Number(order?.price),
				orig_qty: Number(order?.origQty),
				time_in_force: 'GTC',
				type: order?.type,
				side: order?.side,
				share_trade_agg_link: previewDetails.share_trade_agg.link_id
			};
			await dispatch(putPinchOrder(deletedOrder));
		}
		dispatch(createPreview({asset: currentSymbol}));
		resetDeleteSellOrder();
	};
	const resetEditSellOrder = () => setEditSellOrder(null);
	const resetDeleteSellOrder = () => setDeleteSellOrder(null);
	const handleShare = async () => {
		const response = await dispatch(executeSellOrders(currentSymbol));
		console.log(response);
		const {meta} = response;
		try {
			if (meta.requestStatus === 'fulfilled') {
				dispatch(createPreview({asset: currentSymbol}));
				const shareLinkId = previewDetails.share_trade_agg.link_id;
				const shareUrl = `${BASE_URL}/preview?symbol=${currentSymbol}&shareLink=${shareLinkId}`;
				const shareResult = await Share.share({
					message: shareUrl
				});
				if (shareResult.action === Share.sharedAction) {
					if (shareResult.activityType) {
						console.info(
							'Share with activity type: ',
							shareResult.activityType
						);
					} else {
						console.info('URL shared by user successfully');
					}
				} else if (shareResult.action === Share.dismissedAction) {
					console.warning('Share dialog dismissed by user');
				}
			} else {
				throw new Error('Sell order execution failed');
			}
		} catch (error) {
			console.error('Unable to share trades: ', error);
		}
	};

	return (
		<>
			<ScrollView style={styles.scrollContainer} nestedScrollEnabled>
				<GraphComponent
					coin={currentSymbol}
					orderHistory={orderHistory}
				/>
				{previewDetails?.derived_metrics && (
					<Statistics
						statistics={previewDetails.derived_metrics}
						data={previewDetails?.order_proportion}
						coin={currentSymbol}
					/>
				)}
				{executedOrders && executedOrders.length > 0 && (
					<View style={styles.orderContainer}>
						{executedOrders.map((executedOrder, index) => (
							<View key={index + 1}>
								<PinchOrder
									type={'EXECUTED'}
									key={index}
									coin={currentSymbol}
									order={executedOrder.Order}
									editable={isUserInGame}
									handleOrderEdit={handleSellOrderEdit}
									handleOrderDelete={handleSellOrderDelete}
								/>
								{index !== executedOrders.length - 1 && (
									<Divider
										color={'rgba(0, 0, 0, 0.3)'}
										style={{
											width: '90%',
											alignSelf: 'center'
										}}
									/>
								)}
							</View>
						))}
					</View>
				)}
				{newOrders && newOrders.length > 0 && (
					<View style={styles.orderContainer}>
						{newOrders.map((newOrder, index) => (
							<View key={index + 1}>
								<PinchOrder
									key={index}
									type={'NEW'}
									coin={currentSymbol}
									order={newOrder.Order}
									userId={userId}
									shareTradeId={
										previewDetails?.share_trade_agg?.link_id
									}
									handleOrderEdit={handleSellOrderEdit}
									handleOrderDelete={handleSellOrderDelete}
								/>
								{index !== newOrders.length - 1 && (
									<Divider
										color={'rgba(0, 0, 0, 0.3)'}
										style={{
											width: '90%',
											alignSelf: 'center'
										}}
									/>
								)}
							</View>
						))}
					</View>
				)}
				<AddSellOrder
					toggleModal={toggleModal}
					symbol={currentSymbol}
				/>
			</ScrollView>
			<View style={styles.buttonWrapperStyle}>
				<Button
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonStyleText}
					onPress={handleShare}
					disabled={
						!Boolean(newOrders?.length || executedOrders?.length)
					}>
					{isUserInGame
						? 'Publish and Share'
						: 'Share trade with friends'}
				</Button>
			</View>
			<BottomDrawer
				isModalVisible={isModalVisible}
				toggleModal={toggleModal}>
				<SellOrderDrawer
					previewDetails={previewDetails}
					coin={currentSymbol}
					shareTradeId={previewDetails?.share_trade_agg?.link_id}
					editSellOrder={editSellOrder}
					resetEditSellOrder={() => setEditSellOrder(null)}
					userId={userId}
					toggleModal={toggleModal}
				/>
			</BottomDrawer>
			{(isModalVisible || Boolean(deleteSellOrder)) && (
				<View style={styles.overlay} />
			)}
			<DialogBox
				onConfirm={handleDeleteConfirmation}
				onCancel={() => setDeleteSellOrder(null)}
				showModal={Boolean(deleteSellOrder)}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		width: '100%',
		height: '100%',
		position: 'absolute'
	},
	buttonStyleText: {
		color: '#fff',
		fontSize: 17,
		textAlign: 'center',
		fontFamily: 'Inter-Regular',
		lineHeight: 22
	},
	buttonWrapperStyle: {
		marginTop: 'auto',
		marginBottom: 20,
		marginHorizontal: 16
	},
	buttonStyle: {
		backgroundColor: '#192551',
		borderRadius: 8,
		maxHeight: 50,
		// marginHorizontal: 16,
		padding: 16
	},
	orderContainer: {
		backgroundColor: '#fff',
		elevation: 5,
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 12,
		borderRadius: 12,
		marginRight: 16,
		marginTop: 16,
		marginBottom: 16,
		marginLeft: 16
	}
});
export default ShareTrader;
