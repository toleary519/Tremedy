import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput";
import {
  FacebookSocialButton,
  AmazonSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
  TwitterSocialButton,
} from "react-native-social-buttons";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { look } from "../../../styles";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    const { name, email, password } = data;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, name },
      });

      navigation.navigate("ConfirmEmail", { email });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  let authAlert = () => {
    Alert.alert(
      `3rd Party Pending`,
      `These sign-ins are being verified by their respective companies. For testing purposes enter your information above.`,
      [
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            return;
          },
        },
      ]
    );
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={look.topBox}>
          <Text style={look.add}>Create an account</Text>

          <CustomInput
            name="name"
            control={control}
            capital={true}
            placeholder="Name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Name should be max 24 characters long",
              },
            }}
          />
          <CustomInput
            name="email"
            control={control}
            capital={false}
            placeholder="Email"
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInput
            name="password"
            control={control}
            capital={false}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            capital={false}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
          />

          <CustomButton
            border={true}
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />

          <Text style={styles.text}>
            By registering, you confirm that you accept our{" "}
            <Text style={styles.link}>
              {/* <Text style={styles.link} onPress={onTermsOfUsePressed}> */}
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text style={styles.link}>
              {/* <Text style={styles.link} onPress={onPrivacyPressed}> */}
              Privacy Policy
            </Text>
          </Text>

          <View style={{ alignItems: "center", flex: 1 }}>
            <GoogleSocialButton
              style={{ alignSelf: "strech" }}
              onPress={() => authAlert()}
            />

            <AppleSocialButton onPress={() => authAlert()} />
            <FacebookSocialButton onPress={() => authAlert()} />
          </View>

          <CustomButton
            text="Have an account? Sign in"
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

export default SignUpScreen;
