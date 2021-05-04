import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useContext, useLayoutEffect } from 'react'

import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import authContext from '../context/auth/authContext'

import * as Yup from 'yup'
import AppSubmitButton from '../components/AppSubmitButton'
import { FONTS } from '../config/constants'


const signinSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
});


const Login = () => {

    const navigation = useNavigation()
    const { user, login } = useContext(authContext)

    const handleLogin = async ({ email, password }) => {
        try {
            const data = await login(email, password);
        } catch (error) {
            console.log('ER', error);
            Alert.alert(
                "Error",
                error.message,
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: user ? true : null,

        })

    }, [navigation])
    useEffect(() => {
        user && navigation.navigate('Settings')
    }, [user])
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled style={styles.container}>

                <Text style={{ ...FONTS.body2 }}>Login</Text>
                <View style={styles.formView}>
                    <AppForm initialValues={{ email: '', password: '' }} onSubmit={handleLogin} validationSchema={signinSchema} >
                        <AppFormField name='email' placeholder='Email Address'
                            keyboardType="email-address"
                            autoCorrect={false}

                            autoCapitalize="none"
                            textContentType="emailAddress"
                            autoFocus={true} />
                        <AppFormField name='password' placeholder='Password'
                            secureTextEntry={true}
                            autoCorrect={false}
                            icon="lock-open"
                            textContentType="password"
                        />

                        <AppSubmitButton style={{ marginTop: 20 }} title='Login' />
                    </AppForm>
                </View>
                <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.body4 }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ color: 'blue', marginTop: 10, ...FONTS.body3 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formView: {
        width: '100%'
    }
})
