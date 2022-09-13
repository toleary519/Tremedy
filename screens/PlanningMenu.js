import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const PlanningMenu = ({ navigation }) => (
  <>
  <TouchableOpacity onPress={() => navigation.navigate("RiskAssessment")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
    Risk Assessment
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("ProCon")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Pros / Cons
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Your Sober Contacts
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Meetings")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      Meetings
    </Text>
  </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 140,
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 20,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
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

export { PlanningMenu }