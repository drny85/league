import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Standings = () => {
    return (
        <View style={styles.container}>
            <Text>Standings</Text>
        </View>
    )
}

export default Standings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
