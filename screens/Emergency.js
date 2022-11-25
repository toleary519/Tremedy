import React, { useState, useEffect} from "react";
import { Text, Alert, View, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const Emergency = ({ navigation }) => {
  const [token, setToken] = useState(token ? token : {});

  const makeCall = () => {
    // make a call to 911
  };

  const getData = async () => {
    try {
      const jsonTokValue = await AsyncStorage.getItem("storedUser");
      let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
      setToken(savedTokData);
    } catch (e) {
      console.log(e);
    }
  };

  const emergCheck = () => {
    Alert.alert(
      "User Profile Not Found",
      `These services require profile information.`,
      [
        {
          text: "Create Profile",
          onPress: () => navigation.navigate("UserSettings"),
        },
        {
          text: "Close",
          onPress: () => {
            return;
          },
        },
      ]
    );
  };

  useEffect(() => {
    getData();
  }, []);

  let crisis = () => {
    Linking.openURL(`https://www.google.com/search?q=crisis+line+my+area`);
  };

  let hospitals = () => {
    Linking.openURL(`https://www.google.com/search?q=hospitals+near+me`);
  };

  return (
    <View style={look.container}>
      <View style={[look.topBox, { marginTop: "5%" }]}>
        <View style={look.border}>
          <View style={look.element}>
            <TouchableOpacity
              onPress={token.profile ? () => crisis() : () => emergCheck()}
              delayPressIn={150}
            >
              <Text style={look.add}>Crisis Lines</Text>
              <Text style={look.sub}>
                Give them a call. There are people available 24/7. You deserve
                help.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={look.border}>
          <View style={look.element}>
            <TouchableOpacity
              onPress={token.profile ? () => hospitals() : () => emergCheck()}
              delayPressIn={150}
            >
              <Text style={look.add}>Hospitals + Clinics</Text>
              <Text style={look.sub}>
                A list of the hospitals, clinics and medical resources near you.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={look.border}>
          <View style={[look.element]}>
            <TouchableOpacity onPress={() => makeCall()} delayPressIn={150}>
              <View style={{ flexDirection: "row" }}>
                <Text style={look.add}>For a medical emergency</Text>
                <Text style={[look.add, { color: "red" }]}> call 911</Text>
              </View>
              <Text style={[look.add, { color: "red" }]}>
                DISABLED FOR TESTING VERSION
              </Text>
              <Text style={look.sub}>
                Pressing this button will start a call with 911
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { Emergency }