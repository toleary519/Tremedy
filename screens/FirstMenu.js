import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const FirstMenu = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("UrgeMenu")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        Urge
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("PepTalk")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        Pep-Talk
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SoberContacts")} delayPressIn={150}>
      <Text style={styles.add}>
        Sober Contacts
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Emergency")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.emergency}>
        Emergency
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#1B2A41"
  },
  add: {
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },

  emergency: {
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "red",
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
    color: "#D7D9D7"
  }
});

export { FirstMenu }