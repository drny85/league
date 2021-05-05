import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import BackArrow from '../components/BackArrow';
import { COLORS, FONTS, SIZES } from '../config/constants';
import { SharedElement } from 'react-navigation-shared-element';

const PlayerDetails = ({ route, navigation }) => {

    const { player } = route.params;


    return (
        <View style={styles.container}>
            <SharedElement id={`player.${player.imageUrl}.image`}>
                <ImageBackground style={{ width: SIZES.width, height: SIZES.height * 0.5, }} imageStyle={{ borderBottomRightRadius: SIZES.radius * 4, borderBottomLeftRadius: SIZES.radius * 4 }} source={{ uri: player.imageUrl }}>
                    <BackArrow onPress={() => navigation.pop()} />
                </ImageBackground>
            </SharedElement>

            <View style={{ padding: SIZES.padding * 0.5, flexDirection: 'row', width: SIZES.width, justifyContent: 'space-between', alignItems: 'center' }}>
                <SharedElement id={`player.${player.fullName}.name`}>
                    <Text style={{ ...FONTS.h3, }}>{player.fullName} #{player.number}</Text>
                </SharedElement>
                <SharedElement id={`player.${player.position}.position`}>
                    <Text style={{ ...FONTS.h3, }}>{player.position}</Text>
                </SharedElement>

            </View>

            <View style={{ padding: SIZES.padding * 0.5, }}>
                <Text>Last Games</Text>
                <View>

                </View>
            </View>


        </View>
    )
}


export default PlayerDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})
