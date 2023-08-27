import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
	TouchableOpacity,
	gestureHandlerRootHOC
} from 'react-native-gesture-handler';

const ModalContent = gestureHandlerRootHOC(({toggleModal, children}) => (
	<View style={styles.modalWrapper}>
		<View style={styles.closeIconWrapper}>
			<TouchableOpacity onPress={toggleModal}>
				<Icon
					name="cross"
					style={styles.closeIcon}
					color="#ffffff"
					size={30}></Icon>
			</TouchableOpacity>
		</View>
		<View style={styles.modalContent}>{children}</View>
	</View>
));

const BottomDrawer = props => {
	const {isModalVisible, toggleModal, children} = props;
	return (
		<Modal
			animationType="slide"
			hardwareAccelerated
			visible={isModalVisible}
			transparent={true}
			onRequestClose={toggleModal}>
			<ModalContent toggleModal={toggleModal}>{children}</ModalContent>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1
	},
	modalContent: {
		backgroundColor: '#fff',
		paddingTop: 12,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		paddingBottom: 20,
		minHeight: 400
	},
	closeIconWrapper: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	closeIcon: {
		alignSelf: 'center',
		width: 50,
		backgroundColor: '#1c1c1c',
		borderRadius: 100,
		padding: 10,
		marginBottom: 16
	}
});

export default BottomDrawer;
