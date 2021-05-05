import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { COLORS, FONTS, SIZES } from '../config/constants'
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

const PlayerList = ({ player, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={{ width: SIZES.width * 0.3 }}>
                <SharedElement id={`player.${player.image}.image`}>
                    <Image style={styles.image} source={{ uri: player?.imageUrl }} />
                </SharedElement>

            </View>
            <View style={{ justifyContent: 'space-around', alignItems: 'flex-start', height: '100%', marginRight: 'auto', flex: 1, paddingLeft: 10 }}>
                <SharedElement id={`player.${player.name}.name`}>
                    <Text style={styles.name}>{player.fullName}</Text>
                </SharedElement>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 5, }}><Text style={{ fontWeight: 'bold' }}>Pos: </Text>{player.position}</Text>
                    <Text><Text style={{ fontWeight: 'bold' }}>Jersey:</Text> {player.number}</Text>

                </View>
            </View>
            <AntDesign name="right" size={18} style={{ marginRight: 5 }} color="black" />


        </TouchableOpacity >
    )
}

export default PlayerList

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        height: SIZES.height * 0.08,
        maxHeight: SIZES.height * 0.10,
        backgroundColor: COLORS.white,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'space-between',

        alignItems: 'center',
        shadowOffset: {
            height: 6, width: 6
        },

        shadowColor: COLORS.lightGray,
        shadowRadius: 8,
        shadowOpacity: 0.6,
        elevation: 8,
        flexDirection: 'row'

    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',

        alignContent: 'center',
        borderTopLeftRadius: SIZES.radius * 0.5,
        borderBottomLeftRadius: SIZES.radius * 0.5,
    },
    name: {

        ...FONTS.h3
    }
})
