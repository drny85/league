import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeNav from './HomeNav'
import { Ionicons } from '@expo/vector-icons';

import StandingNav from './StandingNav';
import GameSettingsNav from './GameSettignsNav';
import ScheduleNav from './ScheduleNav';
import { COLORS } from '../config/constants';


const BottomTab = createBottomTabNavigator()


const BottomTabs = () => {

    return (
        <BottomTab.Navigator tabBarOptions={{
            inactiveTintColor: COLORS.secondary,
            activeTintColor: COLORS.ascent,

        }}>
            <BottomTab.Screen name='Home' component={HomeNav} options={{
                tabBarLabel: 'Teams',
                tabBarIcon: ({ size, color }) => (<Ionicons name="baseball" size={size} color={color} />)
            }} />
            <BottomTab.Screen options={{
                tabBarIcon: ({ size, color }) => (<Ionicons name="ios-calendar-outline" size={size} color={color} />)
            }} name='Schedule' component={ScheduleNav} />
            <BottomTab.Screen options={{
                tabBarIcon: ({ size, color }) => (<Ionicons name="flag" size={size} color={color} />)
            }} name='Standings' component={StandingNav} />
            <BottomTab.Screen options={{
                tabBarIcon: ({ size, color }) => (<Ionicons name="md-settings-outline" size={size} color={color} />)
            }} name='Settings' component={GameSettingsNav} />

        </BottomTab.Navigator>
    )
}

export default BottomTabs