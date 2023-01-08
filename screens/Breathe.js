import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Analytics } from "aws-amplify";

const Breathe = () => {
  useEffect(() => {
    Analytics.record({ name: "Breathe Page Visit" });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ height: "80%", width: "100%" }}
        source={require("../assets/breathAnimation.gif")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
  },
});

export { Breathe };
