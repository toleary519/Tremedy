import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Pies = () => {
  
  let fakeDB = []
  
  const [showDB, setShowDB] = useState(fakeDB)
  const [physical, setPhysical] = useState("")
  const [insights, setInsights] = useState("")
  const [emotions, setEmotions] = useState("")
  const [spiritual, setSpiritual] = useState("")
  const [placeholder, setPlaceholder] = useState("new entry")
  
  const handleAdd = () => {
        
        let newPie = {
          id: showDB.length + 1,
          physical: physical,
          insights: insights,
          emotions: emotions,
          spiritual: spiritual
        };
        
        const newList = [...showDB, newPie]
        
        setShowDB(newList);
        setPhysical("");
        setInsights("");
        setEmotions("");
        setSpiritual("");
        setPlaceholder("new entry");
    }

    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        How do you feel today? 
      </Text>
      <Text style={styles.headerTwo}>
        Physical Body 
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setPhysical(text)} 
        placeholder={placeholder} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <Text style={styles.headerTwo}>
        Insights or Thoughts
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setInsights(text)} 
        placeholder={placeholder} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <Text style={styles.headerTwo}>
        Emotions or Feelings  
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setEmotions(text)} 
        placeholder={placeholder} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <Text style={styles.headerTwo}>
        Spiritual : Connection to Self, Others or Higher Power
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setSpiritual(text)} 
        placeholder={placeholder} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <TouchableOpacity onPress={() => handleAdd()}>
        <MaterialIcons style={styles.icon} name="add-circle" />
      </TouchableOpacity>
      <View>
        {showDB.map((item) => (
          <View key={item.id} style={styles.pieContainer}>
          <Text  style={styles.date}>{currentMonth}/{currentDay}/{currentYear}</Text>
          <Text  style={styles.add}> P: {item.physical}</Text>
          <Text  style={styles.add}> I: {item.insights}</Text>
          <Text  style={styles.add}> E: {item.emotions}</Text>
          <Text  style={styles.add}> S: {item.spiritual}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#1B2A41"
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
  },
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "flex-start",
    justifyContent: "flex-end",
    padding: 10,
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

export { Pies };