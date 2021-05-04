import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../config/constants'
import { AntDesign } from '@expo/vector-icons';

const SettingsTile = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={{ ...FONTS.h3 }}>{title}</Text>
            <AntDesign name="right" size={24} color="black" />

        </TouchableOpacity>
    )
}

export default SettingsTile

const styles = StyleSheet.create({
    container: {
        height: 80,
        shadowColor: COLORS.lightGray,
        shadowOffset: { width: 6, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        width: SIZES.width,
        padding: SIZES.padding * 0.5,
        margin: SIZES.padding * 0.5,
        justifyContent: 'space-between',
        alignItems: 'center'




    }
})
