import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { look } from "../assets/styles";

const FirstMenu = ({ navigation }) => {
  const [token, setToken] = useState({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : {};
      setToken(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <View style={look.container}>
      <ScrollView>
        <View style={look.topBox}>
          <View style={look.border}>
            <View style={look.element}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PepTalk")}
                delayPressIn={150}
              >
                <Text style={look.fAdd}>Tool Box</Text>
                <Text style={look.fSub}>
                  All of the tools and your routine.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={look.border}>
            <View style={look.element}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SupportContacts")}
                delayPressIn={150}
              >
                <Text style={look.fAdd}>Support Contacts</Text>
                <Text style={look.fSub}>It's hard but simple. Call.</Text>
              </TouchableOpacity>
            </View>
          </View>
          {token.substance ? (
            <View style={look.border}>
              <View style={look.element}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UrgeMenu")}
                  delayPressIn={150}
                >
                  <Text style={look.fAdd}>We can be better.</Text>
                  <Text style={look.fSub}>What are we doing about it?</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={look.border}>
            <View style={look.element}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserSettings")}
                delayPressIn={150}
              >
                <Text style={look.fAdd}>User Settings</Text>
                <Text style={look.fSub}>Manage personal info, flags etc.</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={look.border}>
            <View style={look.element}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Emergency")}
                delayPressIn={150}
              >
                <Text style={look.fEmergency}>Emergency</Text>
                <Text style={look.fEsub}>If you need it, call now.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { FirstMenu };
