import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import playerContext from '../context/players/playerContext'
import teamContext from '../context/team/teamContext'

const TeamPlayers = () => {

    const { players, getPlayersByTeamId } = useContext(playerContext)
    const { team } = useContext(teamContext)

    useEffect(() => {
        getPlayersByTeamId(team.id)
    })

    console.log(players.length)
    return (
        <View style={styles.container}>
            <Text>TeamPlayers</Text>
        </View>
    )
}

export default TeamPlayers

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
