import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView
} from 'react-native';
import copyLoop from '../../assets/copy-loop.mp4';
import copyLoopPng from '../../assets/copy-loop.png';
import Video from 'react-native-video';
const CopyLoop = () => {
	return (
		<View>
			<ScrollView style={styles.copyloop_wrapper}>
				<View style={{marginBottom: 8}}>
					<Text style={styles.headingText}>
						Continuous
						<Text style={styles.specialText}> copy loop </Text>
					</Text>
				</View>
				<View style={{marginBottom: 12}}>
					<Text style={styles.subHeadingText}>
						The product not only takes care of the present, but also
						what lies in the future. The technology ensures that
						your trades will have exactly the same exit on an asset
						as the trader you copied does.
					</Text>
				</View>
				<View>
					{/* <Video
          source={{uri: copyLoop}}
          ref={ref => {
            this.player = ref;
          }}
          controls={false}
          audioOnly={true}
          // poster={copyLoopPng}
        /> */}
					{/* <Image source={copyLoopPng} /> */}
				</View>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	copyloop_wrapper: {
		backgroundColor: '#FFFAF3',
		paddingTop: 40,
		paddingRight: 16,
		paddingLeft: 16,
		paddingBottom: 0
	},
	headingText: {
		textAlign: 'center',
		fontSize: 24,
		color: '#000',
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
		textAlign: 'center',
		fontSize: 24,
		lineHeight: 29,
		fontFamily: 'Montserrat-Bold'
	}
});
export default CopyLoop;
