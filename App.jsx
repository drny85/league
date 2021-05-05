import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';
import AuthState from './context/auth/authState';
import authContext from './context/auth/authContext';
import TeamState from './context/team/teamState';
import PlayerState from './context/players/playerState';
import GameState from './context/games/gameState';

const loadFonts = async () => {
	return await Font.loadAsync({
		montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
		monte: require('./assets/fonts/Montez-Regular.ttf'),
		'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
		'montserrat-bold-italic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
		lobster: require('./assets/fonts/Lobster-Regular.ttf'),
		tange: require('./assets/fonts/Tangerine-Regular.ttf'),
		'tange-bold': require('./assets/fonts/Tangerine-Bold.ttf'),
	});
};

const App = () => {

	const [isReady, setIsReady] = useState(false);
	const { getCurrentUser, authUnsubcribe } = useContext(authContext);

	if (!isReady) {
		getCurrentUser()
		return (
			<AppLoading
				startAsync={loadFonts}
				onFinish={() => setIsReady(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<TeamState>
			<PlayerState>
				<GameState>
					<NavigationContainer>
						<BottomTabs />
					</NavigationContainer>
				</GameState>
			</PlayerState>
		</TeamState>
	);
}

export default () => {
	return (
		<AuthState>
			<App />
		</AuthState>


	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
