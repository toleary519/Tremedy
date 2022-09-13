import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const UrgeMenu = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("PlanningMenu")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
      I'm planning
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("OutsideMenu")} delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        I'm outside the store
      </Text>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
        I'm already using
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  add: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
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

export { UrgeMenu }