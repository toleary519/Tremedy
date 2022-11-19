import React from "react";
import { Text, Image, View } from "react-native";
import { look } from "../assets/styles";

const AnkleInstruct = () => {
  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={[look.border, { marginBottom: "4%" }]}>
          <Text style={[look.add, { marginBottom: "2%" }]}>
            Stand with your feet 3-4 inches apart and gently rock right and left
            onto the sides of your feet.
          </Text>
        </View>
        {/* <Image
          style={{ height: "80%", width: "100%" }}
          source={require("../assets/Toe_Curls.gif")}
        /> */}
      </View>
    </View>
  );
};

export { AnkleInstruct };