import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Using = () => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={{ paddingBottom: 30}}>
      <Text style={styles.add}>Letter From Yourself</Text>
      <Text style={styles.header}>Game Plan</Text>
      <Text style={styles.add}>You are going to call someone from this list.</Text>
      <TouchableOpacity onPress={() => navigation.navigate("SoberContacts")} delayPressIn={150}>
        <Text style={styles.contacts}>
          Your Sober Contacts
        </Text>
      </TouchableOpacity>
      <Text style={styles.add}>Tell them what happened.</Text>
      <Text style={styles.add}>How you were feeling when it happened.</Text>
      <Text style={styles.add}>Where you are now.</Text>
      <Text style={styles.add}>What your next step is.</Text>
      <Text style={styles.add}>Ask is they have time to unpack this with you.</Text>
      <Text style={styles.add}>Make a plan of managable action oriented steps.</Text>
      <Text style={styles.add}>Ask them to check in on you tomorrow.</Text>
    </ScrollView>
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
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  contacts: {
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
    color: "#FC9F5B",
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { Using };