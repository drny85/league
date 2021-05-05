import React, { useContext, useEffect } from 'react'
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import TeamCard from '../components/TeamCard'
import { FONTS, SIZES } from '../config/constants'
import authContext from '../context/auth/authContext'
import playerContext from '../context/players/playerContext'
import teamContext from '../context/team/teamContext'
import LoadingScreen from './LoadingScreen'

export default function Home({ navigation }) {

    const { players, getPlayersByTeamId } = useContext(playerContext)
    const { user, loading } = useContext(authContext)
    const { team, getTeamByUserId, getTeams, teams } = useContext(teamContext)

    useEffect(() => {
        getTeams()
        getTeamByUserId(user?.id)

    }, [user])

    useEffect(() => {
        getPlayersByTeamId(team?.id)
    }, [team])


    if (teams.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...FONTS.body2 }}>No Team</Text>
        </View>
    }


    if (loading) return <LoadingScreen />

    return (
        <SafeAreaView style={styles.container}>
            <FlatList contentContainerStyle={{ width: SIZES.width }} data={teams} keyExtractor={item => item.id} renderItem={({ item }) => <TeamCard key={item.id} team={item} onPress={() => navigation.navigate('TeamDetails', { teamId: item.id })} />} />

        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})
