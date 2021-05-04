import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens'
import Home from '../screens/Home'
import TeamDetails from '../screens/TeamDetails'
import PlayerDetails from '../screens/PlayerDetails'

enableScreens()


const Stack = createSharedElementStackNavigator()

const HomeNavigation = () => {
    return <Stack.Navigator mode='modal'>
        <Stack.Screen name='Home' component={Home} options={{ title: "Teams" }} />
        <Stack.Screen
            name='TeamDetails' component={TeamDetails} options={{ headerShown: null }} />
        <Stack.Screen name='PlayerDetails' options={{ title: "Player Details" }} component={PlayerDetails} />
    </Stack.Navigator>
}

export default HomeNavigation