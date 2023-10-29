import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../assets/authPages/components/CustomInput";
import CustomButton from "../assets/authPages/components/CustomButton";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { look } from "../assets/styles";

const ConfirmEmailScreen = ({ navigation }) => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });

  const username = watch("username");

  const onConfirmPressed = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Something went wrong.", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", "Code was resent to your email");
    } catch (e) {
      Alert.alert("Something went wrong.", e.message);
    }
  };

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={look.topBox}>
          <Text style={look.add}>Confirm your email</Text>
          <Text style={look.sub}>
            If you do not recieve the email verification code please check your
            junk folder or resend.
          </Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Email Address"
            rules={{
              required: "Email is required",
            }}
          />

          <CustomInput
            name="code"
            control={control}
            placeholder="Enter your confirmation code"
            rules={{
              required: "Confirmation code is required",
            }}
          />

          <CustomButton
            text="Confirm"
            border={true}
            onPress={handleSubmit(onConfirmPressed)}
          />

          <CustomButton
            text="Resend code"
            onPress={onResendPress}
            type="SECONDARY"
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

export { ConfirmEmailScreen };
