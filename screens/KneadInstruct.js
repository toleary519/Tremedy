import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const KneadInstruct = () => (
  <View style={styles.container}>
  <Text style={styles.add}>Pull your toes undeneath your feet in a slow rythmic motion.
  Attempt to pull the carpet or floor towards you while breathing with intention.</Text>
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
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#D7D9D7",
  },

});

export { KneadInstruct };