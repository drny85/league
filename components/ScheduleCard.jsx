import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { COLORS, FONTS, SIZES } from '../config/constants'

const ScheduleCard = ({ game, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: game?.completed ? COLORS.lightGray : COLORS.white }]}>
            <View style={{ borderBottomLeftRadius: COLORS.secondary, borderBottomWidth: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    ...FONTS.h5,
                }}>{moment(game.date).format('LLLL')}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: SIZES.width, flexDirection: 'row', paddingHorizontal: SIZES.padding }}>
                <View >
                    <Text style={{ ...FONTS.h5 }}>{game.away.name} {game.completed && game.winnerId === game.away.id && (<Text style={{ ...FONTS.h4, marginLeft: 15 }}>W</Text>)}</Text>
                    <Text style={{ textAlign: 'center' }}>Vs.</Text>
                    <Text style={{ ...FONTS.h5 }}>{game.home.name} {game.completed && game.winnerId === game.home.id && (<Text style={{ ...FONTS.h4, marginLeft: 15 }}>W</Text>)}</Text>
                </View>

                <View style={{ marginRight: 20 }}>
                    <Text style={{ ...FONTS.h5 }}>
                        Location
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                        {game.location}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default ScheduleCard

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        height: SIZES.height * 0.12,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.lightGray,
        shadowOffset: {
            width: 4, height: 4
        },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
        margin: 5,
        padding: SIZES.padding * 0.5,
        borderRadius: SIZES.radius * 0.5,

    }
})
