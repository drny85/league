import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlayerDetails = () => {
    return (
        <View style={styles.container}>
            <Text>Team Details</Text>
        </View>
    )
}

export default PlayerDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
    }
})
