import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const PepTalkMenu = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("NotesMenu")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
      Your Experiences
      </Text>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        Your "Go-Tos"
      </Text>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        Quotes
      </Text>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        + Self-Talk
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Breathe")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        Breathe
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Five")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        5-4-3-2-1
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },

  // icon: {
  //   borderRadius: "3px",
  //   borderColor: "red",    
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "60", 
  //   padding: 60,
  //   color: "#1B2A41"
  // }
});

export { PepTalkMenu }