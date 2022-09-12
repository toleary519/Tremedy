import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const FirstMenu = ({}) => (
  <>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.emergency}>
      Emergency
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Urge
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setPep(true)} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Pep-Talk
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    <FontAwesome5 name="user-cog" style={styles.icon}/>
  </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  add: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2f8587",
  },

  emergency: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
  },

  icon: {
    borderRadius: "3px",
    borderColor: "red",    
    justifyContent: "center",
    alignItems: "center",
    fontSize: "60", 
    padding: 60,
    color: "#1B2A41"
  }
});

export { FirstMenu }