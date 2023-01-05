import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
import { A } from "@expo/html-elements";
import * as Location from "expo-location";
import { look } from "../assets/styles";
import { Analytics } from "aws-amplify";

const Meetings = ({ navigation }) => {
  // token should come in so that we can get the city.

  const [address, setAddress] = useState();

  let smart = () => {
    Linking.openURL(
      `https://meetings.smartrecovery.org/meetings/?location=${address}&coordinates=100`
    );
  };

  let dharma = () => {
    Linking.openURL(`https://recoverydharma.org/find-a-meeting/`);
  };

  let anon = () => {
    Linking.openURL(`https://www.google.com/search?q=aa+meetings+${address}`);
  };

  let lucky = () => {
    Linking.openURL(`https://www.theluckiestclub.com/`);
  };

  useEffect(() => {
    Analytics.record({ name: "Meetings Page Visit" });
  }, []);

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={look.border}>
          <TouchableOpacity delayPressIn={150} onPress={() => smart()}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <Text style={look.add}>Smart</Text>
              <Text style={look.sub}>
                A non religious approach to recovery.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity onPress={() => dharma()} delayPressIn={150}>
            <View
              style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}
            >
              <Text style={look.add}>Dharma</Text>
              <Text style={look.sub}>A buhdist approach to recovery.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity onPress={() => anon()} delayPressIn={150}>
            <View style={{ paddingBottom: "2%", paddingTop: "2%" }}>
              <Text style={look.add}>AA</Text>
              <Text style={look.sub}>The 12 step program.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity onPress={() => lucky()} delayPressIn={150}>
            <View style={{ paddingBottom: "2%", paddingTop: "2%" }}>
              <Text style={look.add}>The Luckiest Club</Text>
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

export { Meetings };
