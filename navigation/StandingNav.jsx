import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens';
import Standings from '../screens/Standings';


enableScreens()


const Stack = createSharedElementStackNavigator()

const StandingNav = () => {
    return <Stack.Navigator mode='modal' screenOptions={{ headerShown: null }}>
        <Stack.Screen name='Standings' component={Standings} />
    </Stack.Navigator>
}

export default StandingNav