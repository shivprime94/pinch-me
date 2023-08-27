import React from 'react';
import shareVideo from '../../assets/share-with-friends.mp4';
import Video from 'react-native-video';
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Image,
	SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const InvestWithFriends = () => {
	return (
		<ScrollView style={styles.invest}>
			<View style={styles.wrapper}>
				<View style={{marginBottom: 8}}>
					<Text style={styles.headingText}>
						Invest with
						<Text style={styles.specialText}> friends</Text>
					</Text>
				</View>
				<View style={{marginBottom: 12}}>
					<Text style={styles.subHeadingText}>
						Share your investments with friends anywhere.
					</Text>
				</View>
				<View style={styles.invest_icon_container}>
					<View style={styles.invest_icon}>
						<Icon name="telegram" size={35} color={'#2D3C73'} />
					</View>
					<View style={styles.invest_icon}>
						<Icon name="discord" size={35} color={'#2D3C73'} />
					</View>
					<View style={styles.invest_icon}>
						<Icon name="facebook" size={35} color={'#1877f2'} />
					</View>
					<View style={styles.invest_icon}>
						<Icon name="whatsapp" size={35} color={'#0DC143'} />
					</View>
					<View style={styles.invest_icon}>
						<Icon name="youtube" size={35} color={'#e21a20'} />
					</View>
				</View>
				<ScrollView style={styles.invest_image_container}>
					{/* <Video
						source={require('../../assets/share-with-friends.mp4')}
						controls={false}
						resizeMode="cover"
						ref={ref => {
							this.player = ref;
						}}
						onBuffer={this.onBuffer}
						onError={this.videoError}
					/> */}
				</ScrollView>
				<View>
					<Text style={styles.invest_copy_callout}>
						Let your friends copy the current and future{'\n'}
						investments instantly.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	invest: {
		backgroundColor: '#FFFDFD',
		padding: 18
	},
	invest_icon_container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	invest_icon: {
		width: 47,
		height: 47,
		borderRadius: '50%',
		marginRight: 12,
		background: '#f0f0f0'
	},
	invest_image_container: {
		margin: 20
	},
	headingText: {
		textAlign: 'center',
		fontSize: 24,
		color: '#000000',
		lineHeight: 29,
		fontFamily: 'Montserrat-Bold'
	},
	subHeadingText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#1F1F1F',
		lineHeight: 24,
		fontFamily: 'Montserrat-Regular'
	},
	specialText: {
		color: '#F5BF5A',
		lineHeight: 29,
		fontFamily: 'Montserrat-Bold'
	},
	invest_copy_callout: {
		color: '#1f1f1f',
		fontSize: 12,
		lineHeight: 15,
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular'
	}
});
export default InvestWithFriends;
