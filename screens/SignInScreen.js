import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import CustomInput from "../assets/authPages/components/CustomInput";
import CustomButton from "../assets/authPages/components/CustomButton";
import {
  FacebookSocialButton,
  AmazonSocialButton,
  AppleSocialButton,
  GoogleSocialButton,
  TwitterSocialButton,
} from "react-native-social-buttons";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { look } from "../assets/styles";

const SignInScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.email, data.password);
    } catch (e) {
      Alert.alert("Something went wrong.", e.message);
    }
    setLoading(false);
  };

  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  };

  const onSignInGoogle = () => {
    console.warn("onSignInGoogle");
  };

  const onSignInApple = () => {
    console.warn("onSignInApple");
  };
  const onSignInAmazon = () => {
    console.warn("onSignInAmazon");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={look.topBox}>
          <CustomInput
            name="email"
            capital={false}
            placeholder="Email Address"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            capital={false}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be minimum 6 characters long",
              },
            }}
          />

          <CustomButton
            text={loading ? "Loading" : "Sign In"}
            border={loading ? false : true}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />
          <View style={{ alignItems: "center", flex: 1 }}>
            <GoogleSocialButton
              buttonViewStyle={look.socials}
              onPress={() => authAlert()}
            />

            <AppleSocialButton
              buttonViewStyle={look.socials}
              onPress={() => authAlert()}
            />

            <FacebookSocialButton
              buttonViewStyle={look.socials}
              onPress={() => authAlert()}
            />
          </View>

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export { SignInScreen };
