import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TeamDetails = () => {
    return (
        <View style={styles.container}>
            <Text>Team Details</Text>
        </View>
    )
}

export default TeamDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
