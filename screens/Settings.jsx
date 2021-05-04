import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import authContext from '../context/auth/authContext'
import LoadingScreen from './LoadingScreen'
import { CommonActions } from "@react-navigation/native";
import Login from './Login'
import teamContext from '../context/team/teamContext';
import SettingsTile from '../components/SettingsTile';
import { COLORS, FONTS, SIZES } from '../config/constants';
import Signup from './Signup';

const Settings = ({ navigation }) => {

    const { user, logout } = useContext(authContext)
    const { getTeamByUserId, team, loading } = useContext(teamContext)

    const resetNav = async () => {
        await logout()
        return navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Signin" }],
            })
        );
    }

    const confirmLogOut = () => {
        Alert.alert('Log Out', 'Are you sure you want to sign out?', [{ text: 'Yes', onPress: resetNav }, { text: 'No', style: 'cancel' }])
    }

    useEffect(() => {
        getTeamByUserId(user?.id)
    }, [user])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => user ? <TouchableOpacity onPress={confirmLogOut} style={{ marginRight: 10 }}><Text style={{ color: 'blue', opacity: 0.7 }}>Log Out</Text></TouchableOpacity> : null,
            title: team ? team.name : null,
        })
    }, [navigation, user])


    if (loading) return <LoadingScreen />
    if (!user && !loading) return <Login />
    console.log(team)
    return (
        <View style={styles.container}>
            {user.team ? (<SettingsTile title='Team Players' onPress={() => navigation.navigate('TeamPlayers', { teamId: team.id })} />)
                : (<TouchableOpacity style={{
                    alignItems: 'center',
                    ustifyContent: 'center', backgroundColor: COLORS.light, borderRadius: SIZES.radius * 3,
                    marginVertical: SIZES.padding * 0.7, paddingHorizontal: SIZES.padding * 2, paddingVertical: SIZES.padding * 0.5
                }} onPress={() => { navigation.navigate('AddTeam') }}>
                    <Text style={{ ...FONTS.h3 }}>Add Team</Text>
                </TouchableOpacity>)}

        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    }
})
