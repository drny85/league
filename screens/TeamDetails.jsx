import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, FlatList, ScrollView } from 'react-native'
import BackArrow from '../components/BackArrow';

import { COLORS, FONTS, ICONS, SIZES } from '../config/constants';

import { LinearGradient } from 'expo-linear-gradient';
import ScheduleCard from '../components/ScheduleCard';
import teamContext from '../context/team/teamContext';
import LoadingScreen from './LoadingScreen';
import PlayerList from '../components/PlayerList';
import playerContext from '../context/players/playerContext';
import gameContext from '../context/games/gameContext';
import { SharedElement } from 'react-navigation-shared-element';



const TeamDetails = ({ route, navigation }) => {
    const { teamId } = route.params;
    const { getTeamById, loadingTeam, teams, team } = useContext(teamContext)
    const { players, getPlayersByTeamId, loading } = useContext(playerContext)
    const { games, getGames } = useContext(gameContext)

    const renderPlayer = () => {
        return (
            <View style={[styles.players, { height: players.length > 0 ? SIZES.height * 0.3 : 80 }]}>
                {players?.length > 0 ? (<FlatList contentContainerStyle={{ margin: 3 }} showsVerticalScrollIndicator={false} keyExtractor={item => item.id} data={players} renderItem={({ item, index }) => <PlayerList key={item.id} player={item} onPress={() => navigation.navigate('PlayerDetails', { player: item })} />} />) : (<View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}><Text style={{ ...FONTS.body3 }}>No Players</Text></View>)}
            </View>
        )
    }

    const renderSchedule = () => {
        return (
            <View style={styles.scheduleView}>
                <Text style={styles.title}>Upcoming Games</Text>
                <FlatList contentContainerStyle={{ width: SIZES.width }} data={games.filter(g => g.home.id === teamId || g.away.id === teamId).filter(g => g.won === null)} keyExtractor={item => item.id.toString()} renderItem={({ item, index }) => <ScheduleCard game={item} onPress={() => navigation.navigate('GameDetails', { gameId: item.id })} />} />

            </View>
        )
    }

    useEffect(() => {

        getTeamById(teamId)
        return () => {

        }
    }, [teamId])

    useEffect(() => {
        getGames()
        getPlayersByTeamId(teamId)

    }, [teamId])


    if (loadingTeam || !team) return <LoadingScreen />

    return (
        <View style={styles.container}>
            <SharedElement id={teamId}>
                <ImageBackground source={{ uri: team?.imageUrl }} style={styles.image}>
                    <BackArrow onPress={() => navigation.pop()} />
                    <LinearGradient start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 0.8 }} colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)']} style={{ position: 'absolute', bottom: 0, left: 0, width: SIZES.width, height: 50, justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.white, fontFamily: 'tange-bold', fontSize: 34, marginLeft: SIZES.padding * 0.7 }}>{team?.name}</Text>
                    </LinearGradient>
                </ImageBackground>
            </SharedElement>

            {renderPlayer()}
            {renderSchedule()}



        </View>
    )
}

export default TeamDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary

    },
    image: {
        width: SIZES.width,
        height: SIZES.height * 0.3,
        resizeMode: 'cover'
    },
    name: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 24,
        ...FONTS.h1,
        color: '#fff',
        fontFamily: 'tange-bold'

    },
    players: {
        marginTop: SIZES.padding * 0.3,

        maxHeight: SIZES.height * 0.4,
    },
    title: { ...FONTS.h4, marginLeft: SIZES.padding * 0.3, },
    scheduleView: {
        flex: 1,
    }
})
