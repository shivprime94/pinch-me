import React, {useState} from 'react';
import {ScrollView, StyleSheet, Image, View} from 'react-native';
import AddBuyOrder from './AddBuyOrder';
import PinchOrder from './PinchOrder';
import {Button} from '../../components/atoms';
import {BottomDrawer, DialogBox} from '../../components/molecules';
import Statistics from './Statisics';
import GraphComponent from '../../components/graphComponent/graph';
import {useSelector, useDispatch} from 'react-redux';
import {copySharedTrades} from '../../store/orders';
import {Divider} from '@rneui/themed';
import ExecutedOrder from './ExecutedOrder';
import BuyOrderDrawer from './BuyOrderDrawer';
import {executeSellOrders, putPinchOrder} from '../../store/orders/actions';
import {createPreview} from '../../store/coins/actions';
import {API_URL} from '../../utils/endpoints';
import {useGoogleLogin} from '../../hooks';
import MessageBox from './MessageBox';
const CopyTrader = props => {
	const dispatch = useDispatch();
	const userDetails = useSelector(state => state.global.user);
	const previewDetails = useSelector(state => state.coins.previewDetails);
	const shareLink = useSelector(state => state.global.shareLink);
	const currentSymbol = useSelector(state => state.global.currentSymbol);
	const handleGoogleLogin = useGoogleLogin();
	const [isModalVisible, setModalVisible] = useState(false);
	const [editBuyOrder, setEditBuyOrder] = useState(null);
	const [deleteBuyOrder, setDeleteBuyOrder] = useState(null);

	const userId = userDetails?.id;
	const toggleModal = () => setModalVisible(!isModalVisible);
	const [visible, setVisible] = useState(false);
	const buyOrders = previewDetails?.pinch_buy_orders;
	const newOrders = previewDetails?.order_proportion?.filter(({Order}) =>
		Boolean(Order.pinch_order_id && !Order.orderId)
	);
	const executedOrders = previewDetails?.order_proportion?.filter(({Order}) =>
		Boolean(Order.orderId)
	);
	console.log('BUY ORDERS: ', buyOrders);
	console.log('NEW ORDERS: ', newOrders);
	console.log('EXEC ORDERS: ', executedOrders);
	const orderHistory = previewDetails?.filled_order_history?.map(i => {
		return {
			price: i.usdt_price,
			time: new Date(i.time).getTime(),
			type: i.side
		};
	});
	const handleBuyOrderEdit = order => {
		setEditBuyOrder(order);
		toggleModal();
	};

	const handleBuyOrderDelete = order => {
		setDeleteBuyOrder(order);
	};
	const handleDeleteConfirmation = async () => {
		const order = deleteBuyOrder;
		const apiParams = {
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
		await dispatch(putPinchOrder(apiParams));
		dispatch(createPreview({asset: currentSymbol, shareLink: shareLink}));
		resetDeleteSellOrder();
	};

	const resetDeleteSellOrder = () => setDeleteBuyOrder(null);
	const handleCopy = async () => {
		dispatch(copySharedTrades({sharedLink: shareLink}));
	};
	return (
		<>
			<ScrollView style={styles.scrollContainer}>
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
				{!userDetails && (
					<View style={styles.placeholderWrapperStyle}>
						<Image
							source={require('../../assets/copy-trader-placeholder.png')}
							style={styles.placeholderStyle}
						/>
					</View>
				)}
				{executedOrders && executedOrders.length > 0 && (
					<View style={styles.orderContainer}>
						{executedOrders.map((executedOrder, index) => (
							<View key={index + 1}>
								<ExecutedOrder
									type={'EXECUTED'}
									key={index}
									coin={currentSymbol}
									order={executedOrder}
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
									order={newOrder}
									userId={userId}
									shareTradeId={
										previewDetails?.share_trade_agg?.link_id
									}
									handleOrderEdit={handleBuyOrderEdit}
									handleOrderDelete={handleBuyOrderDelete}
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
				{buyOrders && (
					<View style={styles.orderContainer}>
						{buyOrders.map((pinchOrder, index) => (
							<View key={index + 1}>
								<PinchOrder
									type={'NEW'}
									key={index}
									coin={currentSymbol}
									order={pinchOrder}
									userId={userId}
									handleOrderEdit={handleBuyOrderEdit}
									handleOrderDelete={handleBuyOrderDelete}
								/>
								{index !== buyOrders.length - 1 && (
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
				{userDetails && (buyOrders?.length === 0 || !buyOrders) && (
					<AddBuyOrder
						toggleModal={toggleModal}
						// isModalVisible={isModalVisible}
						// asset={''}
						// previewDetails={previewDetails}
						symbol={currentSymbol}
						// shareTradeId={previewDetails?.share_trade_agg?.link_id}
						// editBuyOrder={editBuyOrder}
						// resetEditBuyOrder={() => setEditBuyOrder(null)}
						// userId={userId}
					/>
				)}
			</ScrollView>
			{userDetails ? (
				<View style={styles.copyTradeButtonWrapper}>
					<Button
						buttonStyle={styles.buttonStyle}
						textStyle={styles.buttonStyleText}
						onPress={handleCopy}
						disabled={!Boolean(buyOrders?.length)}>
						Click to copy trade
					</Button>
				</View>
			) : (
				<View style={styles.loginButtonWrapper}>
					<Button
						buttonStyle={styles.buttonStyle}
						textStyle={styles.buttonStyleText}
						onPress={handleGoogleLogin}>
						Login with google
					</Button>
				</View>
			)}
			{/* <Button
					buttonStyle={styles.buttonStyle}
					textStyle={styles.buttonStyleText}
					onPress={() => setVisible(true)}>
					open modal
				</Button>
				<MessageBox visible={visible} setVisible={setVisible} /> */}
			<BottomDrawer
				isModalVisible={isModalVisible}
				toggleModal={toggleModal}>
				<BuyOrderDrawer
					previewDetails={previewDetails}
					coin={currentSymbol}
					shareTrader={previewDetails?.share_trade_agg}
					editBuyOrder={editBuyOrder}
					resetEditBuyOrder={() => setEditBuyOrder(null)}
					userId={userId}
					toggleModal={toggleModal}
				/>
			</BottomDrawer>
			{(isModalVisible || Boolean(deleteBuyOrder)) && (
				<View style={styles.overlay} />
			)}
			<DialogBox
				onConfirm={handleDeleteConfirmation}
				onCancel={() => setDeleteBuyOrder(null)}
				showModal={Boolean(deleteBuyOrder)}
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
	copyTradeButtonWrapper: {
		marginTop: 'auto',
		marginBottom: 20,
		marginHorizontal: 16
	},
	loginButtonWrapper: {
		marginTop: 'auto'
	},
	buttonStyle: {
		backgroundColor: '#192551',
		borderRadius: 8,
		maxHeight: 50,
		marginTop: 'auto',
		marginBottom: 20,
		marginHorizontal: 16,
		paddingHorizontal: 16,
		paddingBottom: 10,
		paddingTop: 15
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
	},
	placeholderWrapperStyle: {
		flex: 1
	},
	placeholderStyle: {
		resizeMode: 'contain',
		width: '100%',
		height: 500
	}
});
export default CopyTrader;
