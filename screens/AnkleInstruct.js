import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const AnkleInstruct = () => (
  <View style={styles.container}>
  <Text style={styles.add}>Stand with your feet 3-4 inches apart and gently rock right
   and left onto the sides of your feet.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B2A41"
  },
  add: {
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 15,
    fontSize: 35,
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

export { AnkleInstruct };