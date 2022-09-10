import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const PepTalkMenu = ({}) => (
  <>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
    Your Experiences
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Your "Go-Tos"
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Quotes
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Other People
    </Text>
  </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  add: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2f8587",
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

export { PepTalkMenu }