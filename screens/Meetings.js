import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Meetings = ({ navigation }) => (
  <>
  <TouchableOpacity onPress={() => navigation.navigate()} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
    SMART
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate()} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      DHARMA
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate()} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      AA
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate()} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      The Luckiest Club
    </Text>
  </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  add: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
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

export { Meetings }