import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <TouchableOpacity
        onPress={() => navigation.navigate("PepTalk")}
        delayPressIn={150}
      >
        <Text style={styles.add}>Tool Box</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SoberContacts")}
        delayPressIn={150}
      >
        <Text style={styles.add}>Sober Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UrgeMenu")}
        delayPressIn={150}
      >
        <Text style={styles.add}>Lapse</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Emergency")}
        delayPressIn={150}
      >
        <Text style={styles.emergency}>Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete()} delayPressIn={150}>
        <Text style={styles.emergency}>Delete Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#1B2A41"
  },
  add: {
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    textAlign: "center",
    justifyContent: "flex-end",
    width: "80%",
    left: "10%",
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
    width: "80%",
    left: "10%",
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