import React, { useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../config/constants";


const AppInput = ({ iconName, e = null, focus = false, onTouchStart, style, ...otherProps }) => {
    const inputRef = useRef()
    return (
        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
            <View style={styles.container}>
                {iconName && (
                    <MaterialCommunityIcons
                        style={styles.icon}
                        size={24}
                        color={COLORS.primary}
                        name={iconName}
                    />
                )}
                <TextInput
                    ref={inputRef}
                    autoFocus={focus}
                    onTouchStart={onTouchStart}
                    autoCapitalize={e}
                    placeholderTextColor={COLORS.lightGray}
                    style={[styles.input, style]}
                    {...otherProps}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        marginVertical: 12,
        padding: 8,
        borderRadius: 25,
        alignItems: "center",
        backgroundColor: COLORS.tile,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        color: "black",
        fontSize: 20,
        paddingHorizontal: 10,

        height: "100%",
    },
});

export default AppInput;
