import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const NotesMenu = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.summary}>
    Read or record some moments of life that shone because you were sober and some of the worst things that happened when you were not.  
    </Text>
    <Text style={styles.summary}>
    Reflect on them. 
    </Text>
  
  <TouchableOpacity onPress={() => navigation.navigate("GoodTimes")} delayPressIn={150}>
    <Text style={styles.good}>
      The good times
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("BadTimes")} delayPressIn={150}>
    <Text style={styles.bad}>
      The bad times
    </Text>
  </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor:"#1B2A41"
  },
  good: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#59DA59",
  },

  bad: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D84C36",
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

export { NotesMenu }