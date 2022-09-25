import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Stoic = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.add}>Stoic Principles</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B2A41"
  },
  add: {
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { Stoic };