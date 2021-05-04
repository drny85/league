// @ts-nocheck
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

import { auth, db } from '../../database'
import { SET_LOADING, SIGNUP, LOGOUT } from "../types";

const AuthState = (props) => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const signup = async (email, password) => {
        return await auth.createUserWithEmailAndPassword(email, password);
    };

    const createUser = async (id, fullName, phone, email) => {
        try {
            const data = await db.collection("users").doc(id).set({
                id: id,
                fullName: fullName,
                phone: phone,
                email: email,
                imageUrl: null,
                isManager: false,
                isAdmin: false,
                team: null,
                signedDate: new Date().toISOString(),
            });

            await auth.currentUser.updateProfile({ displayName: fullName })
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (email, password) => {
        return await auth.signInWithEmailAndPassword(email, password);
    };

    const setUser = async (userId) => {
        try {
            const data = await db.collection("users").doc(userId).get();

            dispatch({ type: SIGNUP, payload: data.data() });
        } catch (error) {
            console.log(error.message);
        }
    };


    const logout = async () => {
        try {
            setLoading();
            await auth.signOut();

            dispatch({ type: LOGOUT });
        } catch (error) {
            console.log("Error logging out", error.message);
        }
    };

    let authUnsubcribe = Function;

    const getCurrentUser = async () => {
        try {
            authUnsubcribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setUser(user.uid);
                }
            });
        } catch (error) {
            console.log("Error with user", error);
        }
    };




    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                signup,
                logout,
                setUser,
                login,
                getCurrentUser,
                createUser,
                authUnsubcribe,

            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
