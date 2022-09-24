import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const SelfTalk = () => {
  
  let fakeDB = []
  
  const [showDB, setShowDB] = useState(fakeDB)
  const [initial, setInitial] = useState()
  const [rational, setRational] = useState()
  // const [emotions, setEmotions] = useState()
  // const [spiritual, setSpiritual] = useState()

 
 
  const handleAdd = () => {
        
        let newPie = {
          id: showDB.length + 1,
          initial: initial,
          rational: rational,
        };

        
        const newList = [...showDB, newPie]
        
        setShowDB(newList);
        setInitial("");
        setRational("");
    }

    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}` 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        What is the thought that you are having? 
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setInitial(text)}
        value={initial}
        placeholder={"new entry"} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <Text style={styles.headerTwo}>
        Take a moment to evaluate this thought. Modfy the language, have you added
        negative distortions? Try to write a more resonably framed thought in the field below.
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setRational(text)} 
        value={rational}
        placeholder={"new entry"} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <Text style={styles.headerTwo}>
        Look at the two side by side below and consider the differences. Run the 
        excersize again if something new comes to mind.   
      </Text>
      <TouchableOpacity onPress={() => { 
        handleAdd();
        
        }}>
        <MaterialIcons style={styles.icon} name="add-circle" />
      </TouchableOpacity>
      <View>
        {showDB.map((item) => (
          <View key={item.id} style={styles.pieContainer}>
          <Text  style={styles.date}>{currentMonth}/{currentDay}/{currentYear}  {time}</Text>
          <Text  style={styles.add}> Initial Thought: {item.initial}</Text>
          <Text  style={styles.add}> Rational Thought: {item.rational}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#1B2A41",
    paddingBottom: 15
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "2.5%",
    borderColor: "#D7D9D7",
  },
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    marginTop: 5,
    width: "95%",
    left: "2.5%",
    textAlign: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  date: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  headerTwo: {
    // borderRadius: 10,
    // borderWidth: 4,
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "80%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
});

export { SelfTalk };