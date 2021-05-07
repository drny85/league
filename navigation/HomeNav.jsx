import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens'
import Home from '../screens/Home'
import TeamDetails from '../screens/TeamDetails'
import PlayerDetails from '../screens/PlayerDetails'
import GameDetails from '../screens/GameDetails'

enableScreens()


const Stack = createSharedElementStackNavigator()

const HomeNavigation = () => {
    return <Stack.Navigator mode='modal'>
        <Stack.Screen name='Home' component={Home} options={{ title: "Teams" }} />
        <Stack.Screen name='GameDetails' component={GameDetails} options={{ headerShown: null }} />
        <Stack.Screen
            name='TeamDetails' component={TeamDetails} sharedElementsConfig={(route) => {
                return [{ id: route.params.teamId }]
            }} options={{ headerShown: null }} />
        <Stack.Screen name='PlayerDetails' options={{ headerShown: null }} sharedElementsConfig={(route) => {
            const { player } = route.params;
            return [
                { id: `player.${player.imageUrl}.image` },
                { id: `player.${player.fullName}.name` },
                { id: `player.${player.position}.position` },

            ]
        }} component={PlayerDetails} />
    </Stack.Navigator>
}

export default HomeNavigation