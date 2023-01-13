import React, { useEffect } from "react";
import { Text, Image, View } from "react-native";
import { look } from "../assets/styles";
import { Analytics } from "aws-amplify";

const KneadInstruct = () => {
  // useEffect(() => {
  //    Analytics.record({ name: "Knead Page Visit" });
  // }, []);
  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={[look.border, { marginBottom: "4%" }]}>
          <Text style={[look.add, { marginBottom: "2%" }]}>
            Pull your toes underneath your feet in a slow rhythmic motion.
            Attempt to pull the carpet or floor towards you holding for a moment
            with your toes clenched.
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
