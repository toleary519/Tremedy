import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FirstMenu } from "./screens/FirstMenu";
import { Emergency } from "./screens/Emergency";
import { PepTalkMenu } from "./screens/PeptalkMenu";
import { UrgeMenu } from "./screens/UrgeMenu";
import { PlanningMenu } from "./screens/PlanningMenu";
import { NotesMenu } from "./screens/NotesMenu";
import { SupportContacts } from "./screens/SupportContacts";
import { BadTimes } from "./screens/BadTimes";
import { ProCon } from "./screens/ProConPage";
import { GoodTimes } from "./screens/GoodTimes";
import { OutsideMenu } from "./screens/OutsideMenu";
import { Meetings } from "./screens/Meetings";
import { Breathe } from "./screens/Breathe";
import { Five } from "./screens/Five";
import { Four } from "./screens/Four";
import { Three } from "./screens/Three";
import { Two } from "./screens/Two";
import { One } from "./screens/One";
import { PercievedThreatMenu } from "./screens/PercievedThreatMenu";
import { EyeInstruct } from "./screens/EyeInstruct";
import { KneadInstruct } from "./screens/KneadInstruct";
import { AnkleInstruct } from "./screens/AnkleInstruct";
import { Activities } from "./screens/Activities";
import { Pies } from "./screens/Pies";
import { SelfTalk } from "./screens/SelfTalk";
import { MyValues } from "./screens/MyValues";
import { Using } from "./screens/Using";
import { PMRInstruct } from "./screens/PMRInstruct";
import { FocusStatement } from "./screens/FocusStatement";
import { CopingStatement } from "./screens/CopingStatement";
import { CheckIn } from "./screens/CheckIn";
import { JustOne } from "./screens/JustOne";
import { Report } from "./screens/Report";
import { Routine } from "./screens/Routine";
import { UserSettings } from "./screens/UserSettings";
import { Scream } from "./screens/Scream";
import { NewFeature } from "./screens/NewFeature";
import { That } from "./screens/That";
import { Craving } from "./screens/Craving";
import { color } from "./assets/colors";
import { Context } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsmobile from "./src/aws-exports";
Amplify.configure(awsmobile);
import SignInScreen from "./assets/authPages/screens/SignInScreen";
import SignUpScreen from "./assets/authPages/screens/SignUpScreen";
import ConfirmEmailScreen from "./assets/authPages/screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./assets/authPages/screens/ForgotPasswordScreen";
import NewPasswordScreen from "./assets/authPages/screens/NewPasswordScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(
    token
      ? token
      : {
          name: "",
          email: "",
          subscribed: true,
          profile: true,
          substance: false,
          flags: true,
          rLength: 1,
          timeSaved: false,
          timeHrs: null,
          timeMins: null,
          city: "",
          country: "",
        }
  );

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const jsonValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : {};
      console.log("saved data", savedData);
      setToken({ savedData });
      console.log("token after set", token);
      setUser(authUser);
      setToken({
        ...token,
        email: authUser.attributes.email,
        name: authUser.attributes.name,
      });
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Context.Provider value={[token, setToken]}>
      <SafeAreaView style={{ flex: 0, backgroundColor: color.bg }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: color.bg,
                },
                headerTintColor: color.font,
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 20,
                },
              }}
            >
              {user ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={FirstMenu}
                    options={{ title: "Tremedy" }}
                  />
                  <Stack.Screen
                    name="PepTalk"
                    component={PepTalkMenu}
                    options={{ title: "Tool Box" }}
                  />
                  <Stack.Screen
                    name="NotesMenu"
                    component={NotesMenu}
                    options={{ title: "Experiences" }}
                  />
                  <Stack.Screen
                    name="GoodTimes"
                    component={GoodTimes}
                    options={{ title: "The Good" }}
                  />
                  <Stack.Screen
                    name="BadTimes"
                    component={BadTimes}
                    options={{ title: "The Bad" }}
                  />
                  <Stack.Screen
                    name="Emergency"
                    component={Emergency}
                    options={{ title: "Emergency" }}
                  />
                  <Stack.Screen
                    name="UrgeMenu"
                    component={UrgeMenu}
                    options={{ title: "It's Okay" }}
                  />
                  <Stack.Screen
                    name="PlanningMenu"
                    component={PlanningMenu}
                    options={{ title: "I'm Planning" }}
                  />
                  <Stack.Screen
                    name="Meetings"
                    component={Meetings}
                    options={{ title: "Find A Meeting" }}
                  />
                  <Stack.Screen
                    name="SupportContacts"
                    component={SupportContacts}
                    options={{ title: "Support Contacts" }}
                  />
                  <Stack.Screen
                    name="OutsideMenu"
                    component={OutsideMenu}
                    options={{ title: "Don't Do It" }}
                  />
                  <Stack.Screen
                    name="Breathe"
                    component={Breathe}
                    options={{ title: "Breathe" }}
                  />
                  <Stack.Screen
                    name="PercievedThreatMenu"
                    component={PercievedThreatMenu}
                    options={{ title: "Elevated State" }}
                  />
                  <Stack.Screen
                    name="EyeInstruct"
                    component={EyeInstruct}
                    options={{ title: "Eye Exercise" }}
                  />
                  <Stack.Screen
                    name="KneadInstruct"
                    component={KneadInstruct}
                    options={{ title: "Toes Curls" }}
                  />
                  <Stack.Screen
                    name="Activities"
                    component={Activities}
                    options={{ title: "Activities" }}
                  />
                  <Stack.Screen
                    name="Pies"
                    component={Pies}
                    options={{ title: "PIES Check-In" }}
                  />
                  <Stack.Screen
                    name="AnkleInstruct"
                    component={AnkleInstruct}
                    options={{ title: "Ankle Exercise" }}
                  />
                  <Stack.Screen
                    name="SelfTalk"
                    component={SelfTalk}
                    options={{ title: "Thought Challenging" }}
                  />
                  <Stack.Screen
                    name="UserSettings"
                    component={UserSettings}
                    options={{ title: "User Settings" }}
                  />
                  <Stack.Screen
                    name="MyValues"
                    component={MyValues}
                    options={{ title: "My Values" }}
                  />
                  <Stack.Screen
                    name="PMRInstruct"
                    component={PMRInstruct}
                    options={{ title: "PMR" }}
                  />
                  <Stack.Screen
                    name="Using"
                    component={Using}
                    options={{ title: "We Can Do This" }}
                  />
                  <Stack.Screen
                    name="FocusStatement"
                    component={FocusStatement}
                    options={{ title: "Focus Statement" }}
                  />
                  <Stack.Screen
                    name="CopingStatement"
                    component={CopingStatement}
                    options={{ title: "Coping Statement" }}
                  />
                  <Stack.Screen
                    name="CheckIn"
                    component={CheckIn}
                    options={{ title: "Check-In" }}
                  />
                  <Stack.Screen
                    name="JustOne"
                    component={JustOne}
                    options={{ title: "Bullshit" }}
                  />
                  <Stack.Screen
                    name="Report"
                    component={Report}
                    options={{ title: "The One Sheet" }}
                  />
                  <Stack.Screen
                    name="Routine"
                    component={Routine}
                    options={{ title: "My Routine" }}
                  />
                  <Stack.Screen
                    name="One"
                    component={One}
                    options={{ title: "One" }}
                  />
                  <Stack.Screen
                    name="Two"
                    component={Two}
                    options={{ title: "Two" }}
                  />
                  <Stack.Screen
                    name="Three"
                    component={Three}
                    options={{ title: "Three" }}
                  />
                  <Stack.Screen
                    name="Five"
                    component={Five}
                    options={{ title: "Five" }}
                  />
                  <Stack.Screen
                    name="Four"
                    component={Four}
                    options={{ title: "Four" }}
                  />
                  <Stack.Screen
                    name="ProCon"
                    component={ProCon}
                    options={{ title: "PROs & CONs" }}
                  />
                  <Stack.Screen
                    name="Scream"
                    component={Scream}
                    options={{ title: "Scream" }}
                  />
                  <Stack.Screen
                    name="NewFeature"
                    component={NewFeature}
                    options={{ title: "What should we build?" }}
                  />
                  <Stack.Screen
                    name="That"
                    component={That}
                    options={{ title: "Quick Thought" }}
                  />
                  <Stack.Screen
                    name="Craving"
                    component={Craving}
                    options={{ title: "Craving Log" }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ title: "Tremedy Sign In" }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ title: "Sign Up for Tremedy" }}
                  />
                  <Stack.Screen
                    name="ConfirmEmail"
                    component={ConfirmEmailScreen}
                    options={{ title: "Confirm Email" }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ title: "Forgot My Password" }}
                  />
                  <Stack.Screen
                    name="NewPassword"
                    component={NewPasswordScreen}
                    options={{ title: "New Password" }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    backgroundColor: "#1B2A41",
  },
});

export default App;
