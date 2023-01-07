import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


const One = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.add}>Name one thing you can taste.</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Five")}
      delayPressIn={150}
    >
      <MaterialIcons style={styles.icon} name="replay-5" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("PepTalk")}
      delayPressIn={150}
    >
      <Feather style={styles.icon} name="home" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    textAlign: "center",
    padding: 10,
    width: "90%",
    left: "5%",
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 40,
    fontSize: 50,
    left: "43%",
    color: "#D7D9D7"
  }

});

export { One }