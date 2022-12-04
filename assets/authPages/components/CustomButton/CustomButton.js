import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { color } from "../../../colors";
import { look } from "../../../styles";

const CustomButton = ({ onPress, text, border, type = "PRIMARY", fgColor }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          fgColor ? look.border : look.element,
          { marginTop: "4%" },
          fgColor ? { paddingBottom: "2%" } : { justifyContent: "center" },
        ]}
      >
        <Text
          style={[
            look.fAdd,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
            border
              ? {
                  textDecorationLine: "underline",
                  textDecorationColor: color.border,
                }
              : {},
          ]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 10,

    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    ...look.sub,
    opacity: 0.6,
    color: color.font,
  },
});

export default CustomButton;
