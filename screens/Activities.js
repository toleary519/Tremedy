import React from "react";
import { Text, StyleSheet, View } from "react-native";


const Activities = () => (
  <View style={styles.container}>
  <Text style={styles.add}>Activities List</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { Activities };