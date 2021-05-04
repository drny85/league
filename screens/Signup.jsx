import React, { useEffect } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, KeyboardAvoidingView, Platform, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import { COLORS, FONTS, SIZES } from '../config/constants'

import * as Yup from 'yup'
import AppSubmitButton from '../components/AppSubmitButton'
import { useContext } from 'react'
import authContext from '../context/auth/authContext'
import { useFormikContext } from 'formik'


const signinSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
    confirm: Yup.string().required().min(6).label('Confirm Password'),
    fullName: Yup.string().required().min(3).label('Full Name'),
    phone: Yup.string().required().min(10).label('Phone Number'),
});


const Signup = ({ navigation }) => {

    const { signup, createUser, user } = useContext(authContext)


    const handleSignup = async ({ email, password, fullName, phone, confirm }) => {

        try {

            if (password !== confirm) {
                alert('Passwords must match')
                return
            }
            const data = await signup(email, password)
            if (!data) return;
            await createUser(data.user.uid,
                fullName, phone, email)



            //navigation.navigate('Settings')
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Error",
                error.message,
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
    }


    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView

                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null} enabled
            >
                <AppForm
                    initialValues={{ email: "", password: "", fullName: '', phone: '' }}
                    onSubmit={handleSignup}
                    validationSchema={signinSchema}
                >
                    <AppFormField autoFocus={true} placeholder='Full Name' name='fullName' autoCapitalize='words' textContentType='name' />
                    <AppFormField placeholder='Phone Number' name='phone' maxLength={10} keyboardType='numeric' />
                    <AppFormField

                        placeholder="Email"
                        keyboardType="email-address"
                        icon="email"
                        name="email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                    />

                    <AppFormField
                        placeholder="Password"
                        name="password"
                        secureTextEntry={true}
                        autoCorrect={false}
                        icon="lock-open"
                        textContentType="password"
                    />
                    <AppFormField
                        placeholder="Confirm Password"
                        name="confirm"
                        secureTextEntry={true}
                        autoCorrect={false}
                        icon="lock-open"
                        textContentType="password"
                    />

                    <AppSubmitButton style={{ width: '90%', marginTop: 20 }} title="SignUp" />
                </AppForm>

                <View style={styles.account}>
                    <Text style={{ ...FONTS.body6 }}>Have an account?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                        <Text style={styles.signupText}>Sign In</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>


    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width,

    },
    account: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    text: {
        color: COLORS.primary,
        fontSize: 18,
    },
    signupText: {
        fontSize: 18,
        color: "blue",
        marginLeft: 10,
    },
})
