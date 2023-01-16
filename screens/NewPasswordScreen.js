import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../assets/authPages/components/CustomInput";
import CustomButton from "../assets/authPages/components/CustomButton";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { look } from "../assets/styles";

const NewPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmitPressed = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={look.topBox}>
          <Text style={look.add}>Reset your password</Text>

          <CustomInput
            placeholder="Email Address"
            name="username"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            placeholder="Code"
            name="code"
            control={control}
            rules={{ required: "Code is required" }}
          />

          <CustomInput
            placeholder="Enter your new password"
            name="password"
            control={control}
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            }}
          />

          <CustomButton
            text="Submit"
            border={true}
            onPress={handleSubmit(onSubmitPressed)}
          />

          <CustomButton
            text="Back to Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export { NewPasswordScreen };