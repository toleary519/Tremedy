import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const RiskAssessment = () => (
  <View style={styles.container}>
  <Text style={styles.add}>Find an way to do cost benefit analysis</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 20,
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

export { RiskAssessment };