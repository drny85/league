import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, Modal, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useContext, useEffect } from 'react/cjs/react.development'
import { COLORS, FONTS, SIZES } from '../config/constants'
import gameContext from '../context/games/gameContext'
import teamContext from '../context/team/teamContext'
import LoadingScreen from './LoadingScreen'

import { Feather } from '@expo/vector-icons';

import moment, { suppressDeprecationWarnings } from 'moment'
import BackArrow from '../components/BackArrow'
import MiniSection from '../components/MiniSection'
import AppButton from '../components/AppButton'


const GameDetails = ({ route, navigation }) => {
    const { gameId } = route.params

    const { game, getGameById, loadingGame, updateGame } = useContext(gameContext)
    const [editingGame, setEditingGame] = useState(false)

    const [winner, setWinner] = useState('')
    const [innings, setInnings] = useState('')
    const [runs, setRuns] = useState({ away: '', home: '' })
    const [results, setResults] = useState({
        winner: null,
        runs: { [game?.away.name]: null, [game?.home.name]: null },
        innings: null
    })


    const submitResult = async () => {

        if (results.runs[game?.away.name] === '' || results.runs[game?.home.name] === '') {
            alert('Results are incomplete')
            return
        }

        try {
            const updatedGame = { ...game }

            updatedGame.winner = { id: game?.away.name === winner ? game?.away.id : game?.home.id, name: winner }
            updatedGame.results = results
            updatedGame.won = winner
            updatedGame.completed = true
            updatedGame.inningsPlayed = innings
            updatedGame.loserId = game?.away.name !== winner ? game?.away.id : game?.home.id
            updatedGame.winnerId = game?.away.name === winner ? game?.away.id : game?.home.id



            const submitted = await updateGame(updatedGame)
            if (!submitted) return
            resetAllState()
        } catch (error) {
            console.log(error)
        }


    }

    const resetAllState = () => {

        setWinner('')
        setInnings('')
        setRuns({ away: '', home: '' })
        setResults({
            winner: null,
            runs: { [game?.away.name]: null, [game?.home.name]: null },
            innings: null
        })
        setEditingGame(false)

    }

    const handleResultsPreview = () => {
        setResults({ winner: game?.away.name === winner ? winner : game?.home.name, runs: { [game?.away.name]: runs.away, [game?.home.name]: runs.home }, innings: innings })

            < Alert.alert('Results', `Winner: ${winner} \n Innings: ${innings} \n ${game?.away.name}: ${runs.away} \n ${game?.home.name}: ${runs.home} \n`, [{ text: "Accept", onPress: submitResult }, { text: 'Cancel', style: 'cancel' }])

    }

    useEffect(() => {
        getGameById(gameId)
    }, [gameId])


    if (loadingGame) return <LoadingScreen />

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BackArrow />
            <View style={{ width: SIZES.width, height: SIZES.height * 0.4, flexDirection: 'row', }}>
                <Image style={{ height: '100%', width: '50%' }} source={{ uri: game?.away.imageUrl }} />
                <Image style={{ height: '100%', width: '50%' }} source={{ uri: game?.home.imageUrl }} />
                <View style={{ position: 'absolute', top: SIZES.height * 0.4 / 2, left: 0, right: 0 }}>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)']}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', color: COLORS.white }}>{game?.away.name} Vs {game?.home.name}</Text>
                    </LinearGradient>

                </View>
            </View>
            <View style={{ padding: SIZES.padding * 0.5, width: SIZES.width, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ ...FONTS.body3 }}>{game?.completed ? 'Edit Game' : 'Mark Game as Completed'}</Text>
                <Feather onPress={() => setEditingGame(true)} name="edit" size={24} color="black" />

            </View>

            <MiniSection title='Date & Time'>
                <Text style={{ ...FONTS.body3, padding: 10, }}>{moment(game?.date).format('LLL')}</Text>

            </MiniSection>

            <MiniSection>

            </MiniSection>

            <Modal animationType='slide' visible={editingGame}>
                <BackArrow onPress={() => setEditingGame(false)} />
                <SafeAreaView style={{ flex: 1, marginTop: SIZES.statusBarHeight + 40 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MiniSection title='Pick a Winner'>
                            <View style={{ width: SIZES.width * 0.8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                                <TouchableOpacity onPress={() => setWinner(game?.away.name)} style={{ width: '50%', borderRadius: 30, backgroundColor: winner === game?.away.name ? COLORS.black : COLORS.light, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingVertical: SIZES.padding * 0.3, marginRight: 3 }}>
                                    {winner === game?.away.name && (<Feather name="check-circle" size={24} color='white' />)}
                                    <Text style={{ ...FONTS.body3, color: winner === game?.away.name ? COLORS.white : COLORS.black }}>{game?.away.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setWinner(game?.home.name)} style={{ width: '50%', borderRadius: 30, backgroundColor: winner === game?.home.name ? COLORS.black : COLORS.light, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingVertical: SIZES.padding * 0.3, marginRight: 3 }}>
                                    {winner === game?.home.name && (<Feather name="check-circle" size={24} color='white' />)}
                                    <Text style={{ ...FONTS.body3, color: winner === game?.home.name ? COLORS.white : COLORS.black }}>{game?.home.name}</Text>
                                </TouchableOpacity>

                            </View>
                        </MiniSection>
                    </View>
                    {/* HOW MAMNY INNING PLAYED */}
                    <View style={{ marginTop: SIZES.padding, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <MiniSection title='Innings Played'>

                            <TextInput maxLength={2} style={{ paddingHorizontal: 12, borderBottomColor: COLORS.lightGray, borderBottomWidth: 0.5, paddingVertical: 10, ...FONTS.body4, }} placeholder='Innings' value={innings} onChangeText={text => setInnings(text)} />

                        </MiniSection>

                    </View>
                    {/* HOW MANY RUN FOR EACH TEAM */}

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MiniSection title='Runs for Each Team'>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                                <View>
                                    <Text style={{ ...FONTS.h3, marginRight: 10, }}>{game?.away.name}</Text>
                                    <TextInput maxLength={2} style={{ textAlign: 'center', paddingHorizontal: 12, borderBottomColor: COLORS.lightGray, borderBottomWidth: 0.5, paddingVertical: 5, ...FONTS.body4, }} placeholder='Runs' value={runs.away} onChangeText={text => setRuns({ ...runs, away: text })} />
                                </View>
                                <View>
                                    <Text style={{ ...FONTS.h3, marginRight: 10, }}>{game?.home.name}</Text>
                                    <TextInput maxLength={2} style={{ textAlign: 'center', paddingHorizontal: 12, borderBottomColor: COLORS.lightGray, borderBottomWidth: 0.5, paddingVertical: 5, ...FONTS.body4, }} placeholder='Runs' value={runs.home} onChangeText={text => setRuns({ ...runs, home: text })} />
                                </View>

                            </View>
                        </MiniSection>
                    </View>



                    <View style={{ marginTop: SIZES.padding, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                        <AppButton isDisable={winner === '' || innings === ''} title='View Results' onPress={handleResultsPreview} />

                    </View>

                </SafeAreaView>

            </Modal>
            {/* VIEW PREVIEW Modal */}

        </View >
    )
}

export default GameDetails

const styles = StyleSheet.create({})
