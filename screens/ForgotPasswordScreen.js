import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "../assets/authPages/components/CustomInput";
import CustomButton from "../assets/authPages/components/CustomButton";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { look } from "../assets/styles";

const ForgotPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSendPressed = async (data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate("NewPassword");
    } catch (e) {
      Alert.alert("Something went wrong.", e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={look.topBox}>
          <Text style={look.add}>
            An email will be sent to reset your password
          </Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Email Address"
            rules={{
              required: "Email is required",
            }}
          />

          <CustomButton
            text="Send"
            border={true}
            onPress={handleSubmit(onSendPressed)}
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

export { ForgotPasswordScreen };
