import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, ICONS, SIZES } from '../config/constants'
import { LinearGradient } from 'expo-linear-gradient';

const TeamCard = ({ onPress, team, }) => {
    return (

        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ImageBackground style={styles.image} imageStyle={{ alignSelf: 'center', resizeMode: 'cover', }} source={{ uri: team?.imageUrl }}>
                <LinearGradient start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 0.8 }} colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)']} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 50, justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, fontFamily: 'tange-bold', fontSize: 34, marginLeft: SIZES.padding * 0.7 }}>{team.name}</Text>
                </LinearGradient>
            </ImageBackground>


        </TouchableOpacity>

    )
}

export default TeamCard

const styles = StyleSheet.create({
    container: {
        width: SIZES.width * 0.98,
        height: SIZES.height * 0.2,
        backgroundColor: COLORS.white,
        margin: 5,
        borderRadius: SIZES.radius,
        shadowColor: 'rgba(0,0,0,0.9)',
        elevation: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 5, height: 6 },
        shadowRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        opacity: 0.8,
    }
})
