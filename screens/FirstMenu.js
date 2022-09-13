import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const pepHandler = () => {

};

const FirstMenu = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("Emergency")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.emergency}>
        Emergency
      </Text>
    </TouchableOpacity>
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
    <TouchableOpacity onPress={() => navigation.navigate("UserSettings")} delayPressIn={150}>
      <FontAwesome5 name="user-cog" style={styles.icon}/>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2f8587",
  },

  emergency: {
    marginTop: 21,
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
    color: "#1B2A41"
  }
});

export { FirstMenu }