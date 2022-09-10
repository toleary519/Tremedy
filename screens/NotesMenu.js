import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const NotesMenu = ({}) => (
  <>
  
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.summary}>
    Read or record some moments of life that shone because you were sober and some of the worst things that happened when you were not.  
    </Text>
    <Text style={styles.summary}>
    Reflect on them. 
    </Text>
  
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.good}>
      The good times
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.bad}>
      The bad times
    </Text>
  </TouchableOpacity>
  
  </>
);

const styles = StyleSheet.create({
  good: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#09A129",
  },

  bad: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#A4031F",
  },

  summary: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#2f8587",
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