import React from 'react';
import { View, Image, StyleSheet } from "react-native";

const Breathe = () => {

    return (
      <View style={styles.container}>
        <Image style={{ height: '80%', width: '100%' }} source={require("../assets/breathAnimation.gif")}/>
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
  },
});

export { Breathe }