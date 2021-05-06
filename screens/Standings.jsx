import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useContext, useState } from 'react/cjs/react.development'
import gameContext from '../context/games/gameContext'
import teamContext from '../context/team/teamContext'
import { db } from '../database'

const Standings = () => {

    const { games, getGames } = useContext(gameContext)
    const { teams, getTeams } = useContext(teamContext)
    const stand = {}
    const calculateStangings = () => {

        teams.forEach(team => {
            stand[team.name] = 0

            games.forEach(game => {
                if (game.completed) {
                    if (game.winner.id === team.id) {
                        stand[team.name]++
                    }
                }
            })
        })

        return stand
    }
    useEffect(() => {
        games.length === 0 && getGames()
        teams.length === 0 && getTeams()

        console.log(calculateStangings())
        return () => {

        }
    }, [])


    return (
        <View style={styles.container}>
            <Text>Standings</Text>
        </View>
    )
}

export default Standings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
