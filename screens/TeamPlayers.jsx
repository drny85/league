import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import playerContext from '../context/players/playerContext'
import teamContext from '../context/team/teamContext'
import { AntDesign } from '@expo/vector-icons';
import PlayerRow from '../components/PlayerRow';
import { FONTS } from '../config/constants';

const TeamPlayers = ({ route, navigation }) => {
    const { teamId } = route.params
    const { players, getPlayersByTeamId } = useContext(playerContext)
    const { team } = useContext(teamContext)
    const [adding, setAdding] = useState(false)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={{ marginRight: 10, }} onPress={() => navigation.navigate('AddPlayer', { team })}>
                <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
        })
        return () => {

        };
    }, [navigator])

    useEffect(() => {
        getPlayersByTeamId(teamId)

        return () => {
            setAdding(false)
        }
    }, [teamId])


    return (
        <View style={styles.container}>
            {players.length > 0 ? (
                <FlatList data={players} keyExtractor={item => item.id} renderItem={({ item, index }) => <PlayerRow player={item} index={index} onPress={() => navigation.navigate('PlayerDetails', { player: item })} />} />
            ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3 }}>No Players</Text>
                    </View>
                )}



        </View>
    )
}

export default TeamPlayers

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
