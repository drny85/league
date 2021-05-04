import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FONTS, SIZES, COLORS } from '../config/constants'

const PickerItem = ({ title, subtitle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: SIZES.width * 0.95, marginVertical: 5, borderRadius: 10, paddingVertical: 5, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 60, backgroundColor: COLORS.light, paddingHorizontal: 10, marginHorizontal: 10, }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.lightGray, alignItems: 'center', paddingVertical: 5 }}>
                <Text style={{ ...FONTS.h1 }}>{title}</Text>
            </View>
            <View style={{ justifyContent: 'center', width: '100%', marginLeft: 30 }}>
                <Text style={{ ...FONTS.body3 }}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PickerItem

const styles = StyleSheet.create({})
