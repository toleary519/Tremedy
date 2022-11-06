import React, { useState, useEffect} from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { A } from "@expo/html-elements";

import * as Location from "expo-location";
import { look } from "../assets/styles";

const Emergency = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [address, setAddress] = useState();

  const makeCall = () => {
    // make a call to 911
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     // console.log("location object: ****", location)

  //     let address = await Location.reverseGeocodeAsync({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //     setAddress(address[0].city);
  //     // console.log("address object: ****", address[0].city);
  //   };)();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

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
            <TouchableOpacity onPress={() => crisis()} delayPressIn={150}>
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
            <TouchableOpacity onPress={() => hospitals()} delayPressIn={150}>
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
              <Text style={look.sub}>
                Pressing this button will start a call with 911
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};;;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 20,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  header: {
    paddingTop: 40,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    borderRadius: "3px",
    borderColor: "red",    
    justifyContent: "center",
    alignItems: "center",
    fontSize: "60", 
    padding: 40,
    color: "#1B2A41"
  }
});

export { Emergency }