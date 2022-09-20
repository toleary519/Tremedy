import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const UrgeMenu = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("PlanningMenu")} delayPressIn={150}>
      <Text style={styles.add}>
      I'm planning
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("NotesMenu")} delayPressIn={150}>
      <Text style={styles.add}>
      Experiences
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("OutsideMenu")} delayPressIn={150}>
      <Text style={styles.add}>
        I'm outside the store
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SoberContacts")} delayPressIn={150}>
      <Text style={styles.add}>
        Sober Contacts
      </Text>
    </TouchableOpacity>
    <TouchableOpacity delayPressIn={150}>
      <Text style={styles.add}>
        I'm already using
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 20,
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

export { UrgeMenu }