import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const OutsideMenu = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.summary}>Explain to the version of yourself when you were at SCHC this decision.</Text>
    <Text style={styles.summaryTwo}>Say it OUT LOUD how this is the right move.</Text>
    <TouchableOpacity onPress={() => navigation.navigate("SoberContacts")} delayPressIn={150}>
      <Text style={styles.add}>
        Sober Contacts
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("NotesMenu")} delayPressIn={150}>
      <Text style={styles.add}>Your Experiences</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summaryTwo: {
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
  },
});

export { OutsideMenu }