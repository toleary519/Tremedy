import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const PercievedThreatMenu = ({ navigation }) => {
  const [eyeDone, setEyeDone] = useState(false);
  const [breatheDone, setBreatheDone] = useState(false);
  const [kneadDone, setKneadDone] = useState(false);
  const [anklesDone, setAnklesDone] = useState(false);
  const [PMRDone, setPMRDone] = useState(false);

  const handleREDO = () => {
    setEyeDone(false);
    setBreatheDone(false);
    setKneadDone(false);
    setAnklesDone(false);
    setPMRDone(false);
  }

  return (
  <View style={styles.container}>
    <Text style={styles.summary}> Complete these exercises, pressing
     the buttons on the right to mark them as you make your way through. </Text>
    <View style={styles.exercise}>
      <TouchableOpacity onPress={() => navigation.navigate("Breathe")} delayPressIn={150}>
        <Text style={styles.breathe}>
          Breathe
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setBreatheDone(true)}>
        <MaterialCommunityIcons style={ breatheDone ? styles.breatheIconDone : styles.breatheIcon} name="gesture-tap-button"/>
      </TouchableOpacity>
    </View>    
    <View style={styles.exercise}>
      <TouchableOpacity onPress={() => navigation.navigate("ProgressiveMuscle")} delayPressIn={150}>
        <Text style={styles.add}>
          {`Progressive \n Muscle \n Relaxation`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PMRInstruct")} delayPressIn={150}>
        <FontAwesome style={styles.icon} name="question-circle" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPMRDone(true)}>
        <MaterialCommunityIcons style={ PMRDone ? styles.iconDone : styles.icon} name="gesture-tap-button"/>
      </TouchableOpacity>
    </View>    
    <View style={styles.exercise}>
      <Text style={styles.add}>
        Eye Exercise
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("EyeInstruct")} delayPressIn={150}>
        <FontAwesome style={styles.icon} name="question-circle" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setEyeDone(true)}>
        <MaterialCommunityIcons style={ eyeDone ? styles.iconDone : styles.icon} name="gesture-tap-button"/>
      </TouchableOpacity>
    </View>
    <View style={styles.exercise}>
      <Text style={styles.add}>
        Knead Feet
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("KneadInstruct")} delayPressIn={150}>
        <FontAwesome style={styles.icon} name="question-circle" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setKneadDone(true)}>
        <MaterialCommunityIcons style={ kneadDone ? styles.iconDone : styles.icon} name="gesture-tap-button"/>
      </TouchableOpacity>
    </View>
    <View style={styles.exercise}>
      <Text style={styles.add}>
        Ankle Rock
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("AnkleInstruct")} delayPressIn={150}>
        <FontAwesome style={styles.icon} name="question-circle" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAnklesDone(true)}>
        <MaterialCommunityIcons style={ anklesDone ? styles.iconDone : styles.icon} name="gesture-tap-button"/>
      </TouchableOpacity>
    </View>
      <TouchableOpacity onPress={() => handleREDO()}>
        <AntDesign style={styles.icon} name="retweet"/>
      </TouchableOpacity>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B2A41",
  },
  exercise: {
    flexDirection: "row",
    // width: "90%",
    justifyContent: "flex-start",
  },
  add: {
    marginTop: 21,
    // textAlign: "center",
    padding: 1,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
    fontSize: 20,
    width: "90%",
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  breathe: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#D7D9D7",
    marginTop: 21,
    // textAlign: "center",
    // justifyContent: "flex-end",
    padding: 10,
    marginRight: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  instruction: {
    marginTop: 5,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 13,
    color: "#D7D9D7",
  },
  breatheIcon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 28,
    color: "#D7D9D7",
  },
  iconDone: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 13,
    color: "green",
  },
  breatheIconDone: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 28,
    color: "green",
  },
});

export { PercievedThreatMenu }