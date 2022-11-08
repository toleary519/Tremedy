import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const FirstMenu = ({ navigation }) => {
  const confirmDelete = () =>
    Alert.alert("Confirm Delete", `are you sure?`, [
      {
        text: "Yes",
        onPress: () => AsyncStorage.clear(),
      },
      { text: "Nope", onPress: () => console.log("closed") },
    ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.element}
          onPress={() => navigation.navigate("PepTalk")}
          delayPressIn={150}
        >
          <Text style={styles.add}>Tool Box</Text>
          <Text style={styles.sub}>All of the tools and your routine.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.element}
          onPress={() => navigation.navigate("SupportContacts")}
          delayPressIn={150}
        >
          <Text style={styles.add}>Support Contacts</Text>
          <Text style={styles.sub}>They want you to call. Call.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.element}
          onPress={() => navigation.navigate("UrgeMenu")}
          delayPressIn={150}
        >
          <Text style={styles.add}>Lapse</Text>
          <Text style={styles.sub}>It happened, its okay, what's next?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.element}
          onPress={() => navigation.navigate("UserSettings")}
          delayPressIn={150}
        >
          <Text style={styles.add}>User Settings</Text>
          <Text style={styles.sub}>Manage personal info, flags etc.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.element}
          onPress={() => navigation.navigate("Emergency")}
          delayPressIn={150}
        >
          <Text style={styles.emergency}>Emergency</Text>
          <Text style={styles.eSub}>If you need it, call now.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.element}
          onPress={() => confirmDelete()}
          delayPressIn={150}
        >
          <Text style={styles.emergency}>Delete Data</Text>
          <Text style={styles.eSub}>deletes everything</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
  },
  element: {
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#3C5E90",
    justifyContent: "flex-start",
    borderBottomColor: "#3C5E90",
    borderBottomWidth: 1,
    width: "90%",
    left: "5%",
  },
  add: {
    marginTop: 20,
    textAlign: "flex-start",
    marginBottom: 2,
    fontWeight: "bold",
    color: "#D7D9D7",
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  emergency: {
    marginTop: 20,
    textAlign: "flex-start",
    marginBottom: 2,
    fontWeight: "bold",
    color: "#D7D9D7",
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
  },
  sub: {
    marginTop: 5,
    // width: "90%",
    // left: "5%",
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  eSub: {
    marginTop: 5,
    // width: "90%",
    // left: "5%",
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.6,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export { FirstMenu }