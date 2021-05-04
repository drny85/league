import React from 'react'
import { StyleSheet, Text, View, Iconb, TouchableOpacity } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from '../config/constants';
import { useNavigation } from '@react-navigation/native';

const BackArrow = ({ onPress, iconName, style }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress ? onPress : () => navigation.goBack()}>
            <Feather name={iconName || 'x'} size={20} color={COLORS.black} />
        </TouchableOpacity>
    )
}

export default BackArrow
const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: COLORS.lightGray,
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        shadowColor: "#34495e",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.7,
        position: 'absolute',
        top: SIZES.statusBarHeight,
        left: 20,
        zIndex: 20,


    },
});
