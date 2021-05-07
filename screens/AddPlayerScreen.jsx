import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ImageBackground, ScrollView, } from 'react-native'
import { FONTS, SIZES, COLORS } from '../config/constants'
import * as Yup from "yup";

import { db, storage } from '../database';

import { useNavigation } from '@react-navigation/native';
import BackArrow from '../components/BackArrow';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import AppButton from '../components/AppButton';
import { usePicture } from '../hooks/usePicture';
import AppSubmitButton from '../components/AppSubmitButton';
import PickerComponent from '../components/PickerComponent';


const playerSchema = Yup.object().shape({
    fullName: Yup.string().required().label("Full Name"),
    // position: Yup.string().required().label('Position'),
    number: Yup.string().required().label("Number / Jersey"),

});


const AddPlayerScreen = ({ route }) => {

    const [image, pickImage] = usePicture()
    const [imageUrl, setImageUrl] = useState(null)
    const [error, setError] = useState(null)
    const [picking, setPicking] = useState(false)
    const [picked, setPicked] = useState(null)
    const navigation = useNavigation()
    const { team } = route.params

    const getImageUrl = async (playerId) => {
        try {

            const ext = image.split('.').pop();
            const filename = `team-player-soga-${playerId}` + '.' + ext;
            const responde = await fetch(image);
            const blog = await responde.blob();
            const ref = storage
                .ref(`player-image/${filename}`)
                .put(blog, { contentType: 'image/jpeg' });

            ref.on(
                'stage_changed',
                (e) => {
                    let p = (e.bytesTransferred / e.totalBytes) * 100;
                },
                (err) => {
                    setError(err.message)
                },
                async () => {
                    const imageUri = await ref.snapshot.ref.getDownloadURL();

                    try {
                        await db.collection('players').doc(playerId).update({ imageUrl: imageUri })
                        const teamPlayers = (await db.collection('teams').doc(team.id).get()).data().players


                    } catch (error) {
                        console.log(error)
                    }

                }
            );
        } catch (err) {
            setError(err)
        }
    };


    const handlePlayer = async (values) => {
        try {

            if (values.fullName.split(' ').length < 2) {
                alert('Please type the full name')
                return;
            }
            if (!image) {
                alert('Please setect an image')
                return;
            }
            if (!picked) {
                alert('Please picked a position')
                return;
            }
            values.team = team
            values.position = picked
            values.teamId = team.id

            const playerAdded = await db.collection('players').add(values)
            if (playerAdded.id) {
                await getImageUrl(playerAdded.id)
                navigation.goBack()
            }


        } catch (error) {
            console.log('Error adding player', error)
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.playerModal}>
                <BackArrow onPress={() => navigation.goBack()} />
                {image && (
                    <ImageBackground style={{ width: SIZES.width, height: SIZES.height * 0.4, }} source={{ uri: image }}>

                        {}
                    </ImageBackground>
                )}
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ width: SIZES.width }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%", }}>

                        <AppForm
                            validationSchema={playerSchema}
                            onSubmit={handlePlayer}
                            initialValues={{ fullName: '', position: '', number: '', team: team, imageUrl: '' }}
                        >
                            <AppFormField autoCapitalize='words' textContentStyle='name' autoFocus={true} autoCorrect={false} name='fullName' placeholder='Full Name' />
                            <AppFormField onPress={() => setPicking(true)} style={styles.text} name='picked' value={picked} placeholder='Position' />


                            <PickerComponent visible={picking} picked={picked} setVisible={setPicking} setPicked={setPicked} />

                            <AppFormField keyboardType='numeric' name='number' placeholder='Number / Jersey' />
                            <AppButton style={{ backgroundColor: COLORS.lightGray, width: SIZES.width * 0.8, }} onPress={pickImage} textStyle={{ color: COLORS.black }} title={image ? 'Change Image' : 'Add Image'} />
                            <AppSubmitButton style={{ marginTop: 30, width: SIZES.width * 0.8 }} title='Add Player' />
                        </AppForm>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default AddPlayerScreen

const styles = StyleSheet.create({
    playerModal: {
        flex: 1,

        width: SIZES.width,
    }
})
