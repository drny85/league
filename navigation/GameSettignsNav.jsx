import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens';
import StandingNav from './StandingNav';
import Login from '../screens/Login';
import Settings from '../screens/Settings';
import Signup from '../screens/Signup';
import TeamPlayers from '../screens/TeamPlayers';
import AddPlayerScreen from '../screens/AddPlayerScreen';
import AddTeamScreen from '../screens/AddTeamScreen';

enableScreens()




const Stack = createSharedElementStackNavigator()

const GameSettingsNav = () => {
    return <Stack.Navigator mode='modal'>
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='AddPlayer' options={{ headerShown: null }} component={AddPlayerScreen} />
        <Stack.Screen name='AddTeam' options={{ headerShown: null }} component={AddTeamScreen} />
        <Stack.Screen name='TeamPlayers' component={TeamPlayers} options={{ title: 'Team Players' }} />
        <Stack.Screen name='Settings' options={{ headerLeft: null, }} component={Settings} />

    </Stack.Navigator>
}

export default GameSettingsNav