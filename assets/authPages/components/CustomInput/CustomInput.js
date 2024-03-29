import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { look } from "../../../styles";
import { color } from "../../../colors";

const CustomInput = ({
  control,
  name,
  capital,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize={capital ? true : false}
              autoCorrect={false}
              spellCheck={false}
              placeholder={placeholder}
              placeholderTextColor={color.placeholderText}
              style={look.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "white",
  //   width: "100%",
  //   borderColor: "#e8e8e8",
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   marginVertical: 5,
  // },
  // input: look.input,
});

export default CustomInput;
