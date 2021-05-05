import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import { COLORS, FONTS, SIZES } from '../config/constants'


const PlayerRow = ({ player, index, onPress }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 20 }}>
                <Text>{index + 1}</Text>
            </View>
            <View style={{ width: '30%', height: 80 }}>

                {player.imageUrl !== '' && (
                    <SharedElement id={`player.${player.imageUrl}.image`}>
                        <Image source={{ uri: player.imageUrl }} style={styles.image} />
                    </SharedElement>
                )}

            </View>
            <View style={{ flex: 1, padding: SIZES.padding * 0.3, width: '70%' }}>
                <SharedElement id={`player.${player.fullName}.name`}>
                    <Text style={{ textAlign: 'center', ...FONTS.h4 }} >{player.fullName}</Text>
                </SharedElement>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                    <SharedElement id={`player.${player.position}.position`}>
                        <Text style={{ ...FONTS.h4 }}>Pos: <Text style={{ ...FONTS.body3 }}>{player.position}</Text></Text>
                        <Text style={{ ...FONTS.h4 }}>Jersey: <Text style={{ ...FONTS.body3 }}> {player.number}</Text></Text>
                    </SharedElement>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default PlayerRow

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SIZES.width,
        justifyContent: 'space-around',

        shadowColor: COLORS.opacity,
        shadowOffset: { width: 4, height: 6 },
        elevation: 8,
        backgroundColor: COLORS.white,
        shadowOpacity: 0.7,
        shadowRadius: 5,
        marginVertical: SIZES.padding * 0.3
    },
    image: {
        width: SIZES.width * 0.3, height: '100%',
        borderRadius: SIZES.radius,
        resizeMode: 'cover'
    }
})
