import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { look } from "../assets/styles";

const KneadInstruct = () => {
  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={[look.border, { marginBottom: "4%" }]}>
          <Text style={[look.add, { marginBottom: "2%" }]}>
            Pull your toes undeneath your feet in a slow rythmic motion. Attempt
            to pull the carpet or floor towards you holding for a moment with
            your toes clenched.
          </Text>
        </View>
        <Image
          style={{ height: "80%", width: "100%" }}
          source={require("../assets/towelCurl.gif")}
        />
      </View>
    </View>
  );
};


export { KneadInstruct };