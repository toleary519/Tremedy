import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { look } from "../assets/styles";
import { Auth } from "aws-amplify";
import { Context } from "../Context";

const FirstMenu = ({ navigation }) => {
  const [token, setToken] = useContext(Context);

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
      console.log("Sign out");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <View style={look.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "20%" }}
      >
        <View style={look.topBox}>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("PepTalk")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.fAdd}>Tool Box</Text>
                  <Text style={look.fSub}>
                    All of the tools and your routine.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SupportContacts")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.fAdd}>Support Contacts</Text>
                  <Text style={look.fSub}>It's hard but simple. Call.</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {token.substance ? (
            <View style={look.border}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UrgeMenu")}
                delayPressIn={150}
              >
                <View style={look.element}>
                  <View>
                    <Text style={look.fAdd}>We can be better.</Text>
                    <Text style={look.fSub}>What are we doing about it?</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserSettings")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.fAdd}>User Settings</Text>
                  <Text style={look.fSub}>
                    Manage personal info, flags etc.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Emergency")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.fEmergency}>Emergency</Text>
                  <Text style={look.fEsub}>If you need it, call now.</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tour")}
            delayPressIn={150}
          >
            {/* <View style={[look.element, { marginBottom: 0 }]}> */}
            <Text style={[look.fSub, { marginTop: 15 }]}>Application Tour</Text>
            {/* </View> */}
          </TouchableOpacity>

          <View style={look.element}>
            <TouchableOpacity onPress={() => signOut()} delayPressIn={150}>
              <View>
                <Text style={[look.fSub, { opacity: 0.5, marginTop: 0 }]}>
                  Sign out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { FirstMenu };
