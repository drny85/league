import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../config/constants'

const AppButton = ({ title, onPress, style, isDisable = false, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: isDisable ? COLORS.lightGray : COLORS.black }, style]} disabled={isDisable}>
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...textStyle, textAlign: 'center' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.radius * 3,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 0.3,
        backgroundColor: COLORS.secondary,
        margin: 8,

    }
})
