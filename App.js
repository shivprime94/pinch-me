import React from 'react';
import Main from './src';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import store from './src/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import linking from './src/linking';
const App = () => {
	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{flex: 1}}>
				<MenuProvider>
					<NavigationContainer linking={linking}>
						<Main />
					</NavigationContainer>
				</MenuProvider>
			</GestureHandlerRootView>
		</Provider>
	);
};

export default App;
