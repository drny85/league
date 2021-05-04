import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, } from 'react-native'
import AppButton from '../components/AppButton';

import { COLORS, FONTS, SIZES } from '../config/constants';
import BackArrow from '../components/BackArrow';
import AppForm from '../components/AppForm';
import * as ImagePicker from 'expo-image-picker';

import AppFormField from '../components/AppFormField';

import AppSubmitButton from '../components/AppSubmitButton';
import { usePicture } from '../hooks/usePicture';
import { auth, db, storage } from '../database';
import { useNavigation } from '@react-navigation/native';
import authContext from '../context/auth/authContext';
import teamContext from '../context/team/teamContext';



const AddTeamScreen = () => {

    const navigation = useNavigation()
    const [name, setName] = useState('')

    const [image, pickImage] = usePicture()
    const { user } = useContext(authContext)
    const { addTeam, error, clearError } = useContext(teamContext)
    const [addingPlayer, setAddingPlayer] = useState(false);
    const [players, setPlayers] = useState([])
    const [team, setTeam] = useState({

        name: '',
        imageUrl: ''
    })

    const goBack = () => {
        navigation.goBack()
    }

    const getImageUrl = async (teamId) => {
        try {

            const ext = image.split('.').pop();
            const filename = `team-soga-${teamId}` + '.' + ext;
            const responde = await fetch(image);
            const blog = await responde.blob();
            const ref = storage
                .ref(`team-image/${filename}`)
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
                        await db.collection('teams').doc(teamId).update({ imageUrl: imageUri })
                        await db.collection('users').doc(user.id).update({ team: teamId })
                    } catch (error) {
                        console.log(error)
                    }

                }
            );
        } catch (err) {
            setError(err)
        }
    };


    const handleAddteam = async () => {
        try {

            if (error) {
                Alert.alert('Error', error, [{ text: 'Ok', style: 'cancel' }])

                setTimeout(() => {
                    clearError()
                }, 2000)
                return
            }

            const teamId = await addTeam({ name: team.name, userId: user.id })
            console.log('ID', teamId)
            if (!teamId) {
                Alert.alert('Error', 'Team was not added', [{ text: 'Ok', style: 'cancel' }])
                return
            }

            await getImageUrl(teamId)

            goBack()


        } catch (error) {
            console.log('ERR', error)
            alert(error.message)

        }
    }

    console.log('Submit Error', error)

    return (
        <View style={{ flex: 1, ...styles.container }}>
            <BackArrow style={{ marginTop: 10, }} />
            <View style={{ height: SIZES.height * 0.4 }}>
                {image && (
                    <ImageBackground style={{
                        width: SIZES.width,
                        height: SIZES.height * 0.4,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0
                    }} imageStyle={{ resizeMode: 'cover', borderTopRightRadius: SIZES.radius * 4, borderTopLeftRadius: SIZES.radius * 4, overflow: 'hidden' }} source={{ uri: image }}>
                        <Text style={{ ...FONTS.h2, position: 'absolute', right: 10, bottom: 10, color: COLORS.white }}>{team.name !== '' && team.name}</Text>
                    </ImageBackground>
                )}
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, }}>

                <TouchableOpacity onPress={pickImage} style={{ backgroundColor: COLORS.lightGray, paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding * 0.5, borderRadius: SIZES.radius * 3, marginBottom: 20, }}>
                    <Text style={{ ...FONTS.body4, color: 'blue' }}>{image ? 'Change Team Image' : 'Please select a Team Image'}</Text>
                </TouchableOpacity>
                {image && (
                    <View>
                        <TextInput placeholder='Team Name' autoCapitalize='words' value={team.name} onChangeText={text => setTeam({ ...team, name: text })} autoFocus={true} placeholderTextColor={COLORS.lightGray} style={{ backgroundColor: COLORS.white, width: SIZES.width * 0.9, paddingHorizontal: SIZES.padding * 0.5, paddingVertical: SIZES.padding * 0.5, borderBottomWidth: 0.5, borderBottomColor: COLORS.lightGray, ...FONTS.h3 }} />
                        <AppButton title='Add Team' style={{ marginTop: 20, }} onPress={handleAddteam} />
                    </View>
                )}
            </View>


        </View>
    )
}

export default AddTeamScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        width: SIZES.width,

    },
    imageView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: SIZES.height * 0.2,
        resizeMode: 'cover',
        width: SIZES.width,
    }
    ,
    text: {
        textTransform: 'uppercase'
    }
    ,

})
