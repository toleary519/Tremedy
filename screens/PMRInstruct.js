import React from "react";
import { Image, StyleSheet, View } from "react-native";

const PMRInstruct = () => {

  return (
    <View style={styles.container}>
        <Image style={{ height: '80%', width: '100%' }} source={require("../assets/PMR.png")}/>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFE"
  },
  add: {
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { PMRInstruct };