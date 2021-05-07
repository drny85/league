import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useContext, useState } from 'react/cjs/react.development'
import { COLORS, FONTS, SIZES } from '../config/constants'
import gameContext from '../context/games/gameContext'
import teamContext from '../context/team/teamContext'
import { db } from '../database'
import { useStandings } from '../hooks/useStandings'


const Standings = () => {

    const standings = useStandings()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Text style={{ ...FONTS.h2, marginVertical: 20 }}>Team Standings</Text>

                <View style={{ width: '100%', flexDirection: 'row', padding: SIZES.padding * 0.5, justifyContent: 'space-around', backgroundColor: COLORS.lightGray, borderRadius: 15, }}>
                    <View style={{ justifyContent: 'center', width: '60%' }}>
                        <Text style={{ marginLeft: 20, ...FONTS.h3 }}>Teams</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                        <Text style={{ ...FONTS.h3 }}>W</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                        <Text style={{ ...FONTS.h3 }}>L</Text>
                    </View>


                </View>
                <FlatList data={standings} keyExtractor={item => item.teamName.trim()} renderItem={({ item, index }) => (
                    <View style={styles.header}>
                        <View style={{ justifyContent: 'center', width: '60%' }}>
                            <Text style={{ ...FONTS.h4 }}>{index + 1} - <Text>{item.teamName}</Text></Text>
                        </View>

                        {/* WINS COLUMN */}
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                            <Text style={{ ...FONTS.body3 }}>{item.wins}</Text>
                        </View>
                        {/* LOSSES COLUMN */}
                        <View style={{ justifyContent: 'center', width: '20%', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3 }}>{item.losses}</Text>
                        </View>
                    </View>
                )} />
            </View>
        </SafeAreaView>
    )
}

export default Standings

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center'
    },
    header: { width: '100%', flexDirection: 'row', padding: SIZES.padding * 0.5, justifyContent: 'space-around', },
    box: {


        alignItems: 'center',
        shadowColor: COLORS.lightGray,
        shadowOffset: { width: 8, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 8,
        padding: 10,
        width: SIZES.width * 0.96,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginTop: 15,

    }
})
