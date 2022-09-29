import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const PepTalkMenu = ({ navigation }) => (
  <View style={styles.container}>
  <ScrollView contentContainerStyle={{ paddingBottom: 30}} >
    <TouchableOpacity onPress={() => navigation.navigate("FocusStatement")} delayPressIn={150}>
      <Text style={styles.add}>
      My Focus Statement
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("PercievedThreatMenu")} delayPressIn={150}>
      <Text style={styles.add}>
      I'm In a State of Percieved Threat
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Pies")} delayPressIn={150}>
      <Text style={styles.add}>
      PIES Check-In
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SelfTalk")} delayPressIn={150}>
      <Text style={styles.add}>
        + Self-Talk
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Stoic")} delayPressIn={150}>
      <Text style={styles.add}>
        Stoic Questions
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("MyValues")} delayPressIn={150}>
      <Text style={styles.add}>
        My Values
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Breathe")} delayPressIn={150}>
      <Text style={styles.add}>
        Breathe
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("NotesMenu")} delayPressIn={150}>
      <Text style={styles.add}>
      Your Experiences
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SoberContacts")} delayPressIn={150}>
      <Text style={styles.add}>
        Sober Contacts
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Activities")} delayPressIn={150}>
      <Text style={styles.add}>
        Activities
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Five")} delayPressIn={150}>
      <Text style={styles.add}>
        5-4-3-2-1
      </Text>
    </TouchableOpacity>
  </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { PepTalkMenu }