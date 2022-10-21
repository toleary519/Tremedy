import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";

const CheckIn = () => {
  let [face, setFace] = useState(4);

  const handleFace = () => {
    if (face === 1) {
      return "😔";
    }
    if (face === 2) {
      return "😞";
    }
    if (face === 3) {
      return "🙁";
    }
    if (face === 4) {
      return "😐";
    }
    if (face === 5) {
      return "🙂";
    }
    if (face === 6) {
      return "😀";
    }
    if (face === 7) {
      return "😁";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.add}>How are you feeling?</Text>
      <Text style={styles.face}>{handleFace()}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={7}
        step={1}
        onValueChange={setFace}
        minimumTrackTintColor={"#D7D9D7"}
      />
      <Text style={[styles.add, { paddingBottom: 0 }]}>
        If you were going to describe how you feel right now in three words,
        what would they be?
      </Text>
      <Text style={[styles.add, { fontSize: 12, marginTop: 0 }]}>
        (you can write more if you want)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#1B2A41",
  },
  add: {
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  slider: {
    marginTop: 30,
    width: "80%",
    left: "10%",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  face: {
    marginTop: 40,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 70,
  },
});

export { CheckIn };
