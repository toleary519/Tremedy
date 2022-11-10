import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const PlanningMenu = ({ navigation }) => (
  <View style={styles.container}>
    <Text
      style={styles.summary}
    >{`There isn't anything to plan. Talk to someone. Look back.\n Go Meet.`}</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("SupportContacts")}
      delayPressIn={150}
    >
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>Your Support Contacts</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("NotesMenu")}
      delayPressIn={150}
    >
      <Text style={styles.add}>Experiences</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate("Meetings")}
      delayPressIn={150}
    >
      {/* <Text onPress={onPress} style={styles.add}> */}
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
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { PlanningMenu }