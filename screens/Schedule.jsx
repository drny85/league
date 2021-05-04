import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import ScheduleCard from '../components/ScheduleCard'
import { COLORS, FONTS, SIZES } from '../config/constants'
import { games } from '../data'
import { Feather } from '@expo/vector-icons';
import BackArrow from '../components/BackArrow'
import DateTimePicker from '@react-native-community/datetimepicker';

import { Picker } from '@react-native-picker/picker';
import AppButton from '../components/AppButton'
import { db } from '../database'
import { useContext } from 'react/cjs/react.development'
import teamContext from '../context/team/teamContext'

const Schedule = ({ navigation }) => {

    const [past, setPast] = useState(false)
    const [show, setShow] = useState(false)
    const { teams, getTeams } = useContext(teamContext)
    // const [teams, setTeams] = useState([])
    const [date, setDate] = useState(new Date())

    const [pickingAway, setPickingAway] = useState(false)
    const [pickingHome, setPickingHome] = useState(false)
    const [showGameDate, setShowGameDate] = useState(false)
    const [showGameTime, setShowGameTime] = useState(false)

    useEffect(() => {
        getTeams()
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const [awayTeam, setAwayTeam] = useState('')
    const [homeTeam, setHomeTeam] = useState('')

    const handleAwayTeamPicker = (team) => {
        if (awayTeam !== '') {

            setPickingAway(false)

        }

        return
    }
    const handleHomeTeamPicker = (team) => {
        if (homeTeam !== '') {
            setPickingHome(false)
        }

        return
    }

    const handleScheduleGame = async () => {

        try {
            if (awayTeam !== '' && homeTeam !== '') {
                await db.collection('games').add({
                    date: date,
                    location: 'Moshulu',
                    home: teams.find(t => t.name === homeTeam),
                    away: teams.find(t => t.name === awayTeam),
                    won: null,
                    teams: [teams.find(t => t.name === homeTeam), teams.find(t => t.name === awayTeam)]
                })

            } else {
                alert('Missing Info')
            }
            setShow(false)
            console.log('DONE')
        } catch (error) {
            console.error(error)
        }

    }

    function pickTeams() {
        return (
            <Modal visible={show} animationType='slide'>
                <View style={styles.modalView}>
                    <BackArrow onPress={() => setShow(false)} />
                    <View style={styles.modalCard}>
                        <Text style={{ ...FONTS.h4 }}> Pick Teams</Text>
                        <View style={{ width: SIZES.width * 0.9, flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'center', }}>
                            <TouchableOpacity style={styles.teamPick} onPress={() => setPickingAway(true)}>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Away</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={awayTeam === ''} style={styles.teamPick} onPress={() => setPickingHome(true)}>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Home</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginVertical: 10, }}>
                            {(awayTeam !== '' || homeTeam !== '') && (<Text style={{ ...FONTS.h3 }}>{awayTeam} Vs {homeTeam}</Text>)}
                        </View>





                    </View>

                    <Modal visible={pickingAway}>
                        <View style={styles.awayModal}>
                            <BackArrow onPress={() => setPickingAway(false)} />
                            <View style={{ width: '100%' }}>
                                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Select Away Team</Text>
                                <Picker selectedValue={awayTeam} onValueChange={(itemValue) => setAwayTeam(itemValue)} style={{ backgroundColor: COLORS.tile }}>
                                    {teams.map(team => <Picker.Item key={team.id.toString()} value={team.name} label={team.name} />)}
                                </Picker>

                            </View>
                            <AppButton onPress={() => handleAwayTeamPicker(awayTeam)} title='Got it!' style={{ width: '50%', }} />
                        </View>
                    </Modal>
                    <Modal visible={pickingHome}>
                        <View style={styles.awayModal}>
                            <BackArrow onPress={() => setPickingHome(false)} />
                            <View style={{ width: '100%' }}>
                                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Select Home Team</Text>
                                <Picker selectedValue={homeTeam} onValueChange={(itemValue) => setHomeTeam(itemValue)} style={{ backgroundColor: COLORS.tile }}>
                                    {teams.map(team => <Picker.Item key={team.id.toString()} value={team.name} label={team.name} />)}
                                </Picker>

                            </View>
                            <AppButton onPress={() => handleHomeTeamPicker(homeTeam)} title='Got it!' style={{ width: '50%', }} />
                        </View>
                    </Modal>
                    <View style={styles.modalCard}>
                        <Text style={{ ...FONTS.h4 }}>Date & Time</Text>
                        <View style={{ width: SIZES.width * 0.9, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.teamPick, { justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowGameDate(true)}>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Select Date</Text>
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', }}>
                                    {showGameDate && (
                                        <DateTimePicker
                                            value={date}
                                            mode='date'
                                            minimumDate={new Date()}
                                            maximumDate={new Date(2021, 12, 31)}
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.teamPick, { alignItems: 'center', justifyContent: 'center' }} onPress={() => setShowGameTime(true)}>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Select Time</Text>
                                <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                                    {showGameDate && (
                                        <DateTimePicker
                                            style={{ width: '100%', }}
                                            value={date}
                                            mode='time'

                                            onChange={onChange}

                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>




                    </View>
                    <View>
                        <View>
                            <AppButton onPress={handleScheduleGame} title='Schedule Game' />
                        </View>
                    </View>
                </View>
            </Modal>

        )
    }



    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h4, textAlign: 'center', marginLeft: 'auto', flex: 1 }}>Schedule</Text>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Feather name="plus" size={24} color="black" style={{ marginRight: 5, }} />
                </TouchableOpacity>


            </View>
            <View style={{ height: 40, width: SIZES.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
                <TouchableOpacity disabled={!past} style={[styles.tab, { backgroundColor: !past ? COLORS.lightGray : COLORS.primary }]} onPress={() => setPast(p => !p)}>
                    <Text style={!past ? { ...FONTS.h4 } : { ...FONTS.body3 }}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={past} style={[styles.tab2, { backgroundColor: past ? COLORS.lightGray : COLORS.primary }]} onPress={() => setPast(p => !p)} >
                    <Text style={past ? { ...FONTS.h4 } : { ...FONTS.body3 }}>Past Games</Text>
                </TouchableOpacity>

            </View>

            {pickTeams()}

            <FlatList data={games.sort((a, b) => a.date > b.date ? 1 : -1)} keyExtractor={item => item.id.toString()} renderItem={({ item }) => <ScheduleCard game={item} onPress={() => navigation.navigate('GameDetails', { game: item })} />} />
        </View>
    )
}

export default Schedule

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: SIZES.statusBarHeight,


    },
    tab: {
        height: '100%',
        flex: 0.5,
        backgroundColor: COLORS.lightGray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    },
    tab2: {
        height: '100%',
        flex: 0.5,
        backgroundColor: COLORS.lightGray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3

    },
    modalView: {
        flex: 1,
        width: SIZES.width, height: SIZES.height * 0.95,
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: COLORS.white, borderTopRightRadius: SIZES.radius * 4,
        borderTopLeftRadius: SIZES.radius * 4, shadowOffset: { width: 5, height: 5 },
        shadowColor: COLORS.opacity,
        shadowRadius: SIZES.radius * 4,
        elevation: 8,
        shadowOpacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalCard: {
        width: SIZES.width * 0.98, alignItems: 'center', justifyContent: 'center',
        shadowOpacity: 0.8,
        shadowRadius: SIZES.radius,
        shadowOffset: { width: 6, height: 3 },
        backgroundColor: COLORS.tile,
        shadowColor: COLORS.opacity,
        elevation: 5,
        borderRadius: SIZES.radius,
        marginVertical: 10,
    },
    teamPick: {
        width: '50%',
        backgroundColor: COLORS.tile,
        paddingVertical: SIZES.padding * 0.3,
        borderRadius: SIZES.radius,
        shadowOpacity: 0.7,
        shadowRadius: SIZES.radius,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: COLORS.opacity,
        elevation: 5,
        margin: 5,
    },
    awayModal: {
        flex: 1,
        height: SIZES.height * 0.8,
        width: SIZES.width,
        position: 'absolute',
        bottom: 0, left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius * 4,
        borderTopColor: COLORS.lightGray,
        shadowOpacity: 0.8,
        shadowRadius: SIZES.radius,
        shadowOffset: { width: 6, height: 3 },
        backgroundColor: COLORS.tile,
        shadowColor: COLORS.opacity,
        elevation: 5,


    }
})
