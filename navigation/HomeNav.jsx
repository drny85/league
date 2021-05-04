import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens'
import Home from '../screens/Home'
import TeamDetails from '../screens/TeamDetails'
import PlayerDetails from '../screens/PlayerDetails'

enableScreens()


const Stack = createSharedElementStackNavigator()

const HomeNavigation = () => {
    return <Stack.Navigator mode='modal' screenOptions={{ headerShown: null }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen
            name='TeamDetails' component={TeamDetails} />
        <Stack.Screen name='PlayerDetails' component={PlayerDetails} />
    </Stack.Navigator>
}

export default HomeNavigation