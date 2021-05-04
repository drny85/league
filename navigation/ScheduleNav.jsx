import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens';

import Schedule from '../screens/Schedule';
import GameDetails from '../screens/GameDetails';
enableScreens()




const Stack = createSharedElementStackNavigator()

const ScheduleNav = () => {
    return <Stack.Navigator mode='modal' screenOptions={{ headerShown: null }}>
        <Stack.Screen name='Schedule' component={Schedule} />
        <Stack.Screen name='GameDetails' component={GameDetails} />
    </Stack.Navigator>
}

export default ScheduleNav