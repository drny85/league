// @ts-nocheck
import React from "react";

import { useFormikContext } from "formik";
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import AppInput from "./AppInput";
import AppErrorMessage from "./AppErrorMessage";


const AppFormField = ({ name, autoFocus, style, onPress, ...otherProps }) => {

    const {
        errors,
        touched,
        values,
        setFieldTouched,
        handleChange,
        setFieldValue,
    } = useFormikContext();


    return (

        <>
            <AppInput
                autoFocus={autoFocus}
                onTouchStart={onPress}
                style={style}
                onBlur={() => setFieldTouched(values[name])}
                onChangeText={handleChange(name)}
                {...otherProps}
            />
            <AppErrorMessage error={errors[name]} visible={touched[name]} />
        </>

    );
};

export default AppFormField;
