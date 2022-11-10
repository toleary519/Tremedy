import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const OutsideMenu = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.summary}>
      Explain to the version of yourself when you were at SCHC this decision.
    </Text>
    <Text style={styles.summaryTwo}>
      Say it OUT LOUD how this is the right move.
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("SupportContacts")}
      delayPressIn={150}
    >
      <Text style={styles.add}>Support Contacts</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("NotesMenu")}
      delayPressIn={150}
    >
      <Text style={styles.add}>Your Experiences</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Meetings")}
      delayPressIn={150}
    >
      <Text style={styles.add}>Meetings</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 20,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    borderColor: "#D7D9D7",
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summaryTwo: {
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
});

export { OutsideMenu }