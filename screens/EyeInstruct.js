import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const EyeInstruct = () => (
  <View style={styles.container}>
  <Text style={styles.add}>Pick a point in front of you and focus your eyes on it. 
  Without moving anything but your eyes look as far left as you can. 
  HOLD for 10 seconds and return to the centre. Repeat looking to the the right. 
  Complete the full cycle 3-4 times.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B2A41"
  },
  add: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },

  // icon: {
  //   borderRadius: "3px",
  //   borderColor: "red",    
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "60", 
  //   padding: 60,
  //   color: "#1B2A41"
  // }
});

export { EyeInstruct };