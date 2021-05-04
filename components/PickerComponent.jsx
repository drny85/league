import React from 'react'
import { FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../config/constants'
import { positions } from '../positions'
import PickerItem from './PickerItem'

const PickerComponent = ({ visible, setPicked, setVisible }) => {

    const handlePickerPress = (title) => {
        setPicked(title)
        setVisible(false)
    }
    return (
        <SafeAreaView >
            <Modal animationType='slide' visible={visible}>
                <View style={{ position: 'absolute', top: SIZES.statusBarHeight, alignItems: 'center', justifyContent: 'center', left: 0, right: 0 }}>
                    <Text style={{ ...FONTS.h3 }}>Select A Position</Text>
                </View>

                <View style={styles.container}>

                    <FlatList snapToEnd={true} data={positions} keyExtractor={item => item.title} renderItem={({ item }) => <PickerItem onPress={() => handlePickerPress(item.title)} title={item.title} subtitle={item.subtitle} />} />
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default PickerComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.statusBarHeight + 30,

    }
})
