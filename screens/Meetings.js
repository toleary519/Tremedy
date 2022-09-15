import React from "react";
import { Text, StyleSheet, View , TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Meetings = ({ navigation }) => (
  <View style={styles.container}>
  <TouchableOpacity onPress={() => navigation.navigate("Smart")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
    SMART
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Dharma")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      DHARMA
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("Anon")} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      AA
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate()} delayPressIn={150}>
    {/* <Text onPress={onPress} style={styles.add}> */}
    <Text style={styles.add}>
      The Luckiest Club
    </Text>
  </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41"
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

export { Meetings }