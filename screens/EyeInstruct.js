import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1B2A41"
//   },
//   add: {
//     textAlign: "center",
//     justifyContent: "flex-end",
//     padding: 15,
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#D7D9D7",
//   },

  // style={{ height: '80%', width: '100%' }}
  // icon: {
  //   borderRadius: "3px",
  //   borderColor: "red",    
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "60", 
  //   padding: 60,
  //   color: "#1B2A41"
  // }
// });

export { EyeInstruct };