import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'; 

const Four = ({ navigation }) => (
  <View style={styles.container}>
  <Text style={styles.add}>Name four things that you can touch.</Text>
  <TouchableOpacity onPress={() => navigation.navigate("Three")} delayPressIn={150}>
      <Entypo style={styles.icon} name="arrow-with-circle-right" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    textAlign: "center",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 40,
    fontSize: 50,
    color: "#D7D9D7"
  }

});

export { Four }