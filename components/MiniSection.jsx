import React from 'react'
import { Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../config/constants'

const MiniSection = ({ title, children }) => {
    return (
        <View style={{
            width: SIZES.width * 0.95, justifyContent: 'center',
            alignItems: 'center', marginHorizontal: SIZES.padding, marginVertical: 10,
            shadowColor: COLORS.lightGray, shadowOpacity: 0.7, shadowOffset: { width: 5, height: 4 },
            shadowRadius: SIZES.radius,
            elevation: 10,
            backgroundColor: COLORS.white,
            borderRadius: 10,




        }}>
            <View style={{ backgroundColor: COLORS.lightGray, padding: 8, width: '100%', overflow: 'hidden', borderRadius: 10, }}>
                <Text style={{ ...FONTS.h4, textAlign: 'center' }}>{title}</Text>
            </View>
            <View style={{ paddingVertical: SIZES.padding * 0.6 }}>
                {children}
            </View>


        </View>
    )
}

export default MiniSection


