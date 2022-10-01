import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const JustOne = ({ navigation }) => (
  <View style={styles.container}>
  <Text style={styles.header}>Are you kidding me?</Text>
  <Text style={styles.header}>LOOK AT THESE!</Text>
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
    paddingTop: 50,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  header: {
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#FC9F5B",
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
});

export { JustOne };