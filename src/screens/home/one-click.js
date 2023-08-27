import React from 'react';
import oneclickImage from '../../assets/one-click.png';
import copyLoop from '../../assets/copy-loop.mp4';
import {
	View,
	ScrollView,
	Image,
	StyleSheet,
	Text,
	SafeAreaView
} from 'react-native';
import Video from 'react-native-video';
const OneClick = () => {
	return (
		<ScrollView style={styles.oneClickWrapper}>
			<View style={{marginBottom: 8}}>
				<Text style={styles.headingText}>
					Everything with just
					<Text style={styles.specialText}> one click</Text>
				</Text>
			</View>
			<View style={{marginBottom: 12}}>
				<Text style={styles.subHeadingText}>
					Connect Exchange. Share live trades. {'\n'}Vet the trader
					with true trade history. {'\n'} Copy the trades. Enjoy the
					same profits.
				</Text>
			</View>
			<View>
				{/* <Video
          source={copyLoop}
          controls={false}
          ref={ref => {
            this.player = ref;
          }}
          onBuffer={this.onBuffer}
          onError={this.videoError}
          style={styles.video}
        /> */}
				<Image source={oneclickImage} />
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	oneClickWrapper: {
		paddingTop: 40,
		paddingRight: 16,
		paddingLeft: 16,
		paddingBottom: 0,
		backgroundColor: '#FFFDFD'
	},
	textCentre: {
		textAlign: 'center',
		marginTop: 5,
		marginBottom: 15,
		paddingLeft: 25,
		paddingRight: 25,
		fontFamily: 'Montserrat'
	},
	headingText: {
		textAlign: 'center',
		fontSize: 24,
		color: '#000000',
		fontFamily: 'Montserrat-Bold',
		lineHeight: 29
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
		fontFamily: 'Montserrat-Bold',
		textAlign: 'center',
		fontSize: 24
	}
});
export default OneClick;
