import React from "react";
import { Text, Image, View } from "react-native";
import { look } from "../assets/styles";

const EyeInstruct = () => (
  <View style={look.container}>
    <View style={look.topBox}>
      <View style={[look.border, { marginBottom: "4%", marginTop: "8%" }]}>
        <Text style={[look.add, { marginBottom: "4%" }]}>
          Pick a point and keeping your head still, follow it with your eyes.
        </Text>
      </View>
      <Image
        style={{ height: "60%", width: "100%" }}
        source={require("../assets/LEM.gif")}
      />
    </View>
  </View>
);

export { EyeInstruct };