import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View , TouchableOpacity } from "react-native";
import { A } from '@expo/html-elements';
import * as Location from 'expo-location';
import { look } from "../assets/styles";

const Meetings = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("location object: ****", location)

      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(address[0].city);
      // console.log("address object: ****", address[0].city);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={look.border}>
          <TouchableOpacity delayPressIn={150}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <A
                style={look.add}
                href={`https://meetings.smartrecovery.org/meetings/?location=${address}&coordinates=100`}
              >
                Smart
              </A>
              <Text style={look.sub}>
                A non religious approach to recovery.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity delayPressIn={150}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <A
                style={look.add}
                href={`https://recoverydharma.org/find-a-meeting/`}
              >
                Dharma
              </A>
              <Text style={look.sub}>A buhdist approach to recovery.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity delayPressIn={150}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <A
                style={look.add}
                href={`https://www.google.com/search?q=aa+meetings+${address}`}
              >
                AA
              </A>
              <Text style={look.sub}>The 12 step program.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity delayPressIn={150}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <A style={look.add} href={`https://www.theluckiestclub.com/`}>
                Luckiest Club
              </A>
              <Text style={look.sub}>
                A paid service with 5 online meetings a day.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { Meetings }