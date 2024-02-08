import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function FormButton(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.btn, props.formStyle]}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, props.titleStyle]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "#80C9FF",
    fontFamily: "Cabin-Bold",
    letterSpacing: 5,
    fontSize: 20,
  },
  btn: {
    width: 345,
    height: 55,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "#002C82",
    borderColor: "#80C9FF",
    borderWidth: 2,
  },
});
