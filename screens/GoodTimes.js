import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";


const GoodTimes = () => {
  
  let fakeDB = [{id: 1, message: "made partner"},{id: 2, message: "kids birthday"},
  {id:3, message: "dinner with family"},{id: 4, message: "saved 1000s"}]
  
  const [showDB, setShowDB] = useState(fakeDB)
  const [note, setNote] = useState("")
  
  const handleAdd = () => {
        
        let newNote = {
          id: showDB.length + 1,
          message: note
        };
        
        const newList = [...showDB, newNote]
        
        setShowDB(newList);
        setNote("");
      }

  return (
    <ScrollView>
      <Text style={styles.header}>
      “I'm defined by the vision of my future rather than my past.
       While doing so I am living ahead of my time.” - Unknown
      </Text>
      <Text style={styles.headerTwo}>
        Look at these highs! You know who you can be, and how.
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setNote(text)} 
        placeholder={"New Note"} 
        multiline
        keyboardType="default"  
      />
      <Button onPress={() => handleAdd()} title="add"> Add Note </Button>
      <View>
        {showDB.map((item) => (
          <Text key={item.id} style={styles.add}>{item.message}</Text>
        ))}
      </View>
    </ScrollView>
  )
}
  

const styles = StyleSheet.create({
  add: {
    borderRadius: 10,
    borderWidth: 4,
    width: "60%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    left: "20%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
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
  header: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 110,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  headerTwo: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#2f8587",
  },
  icon: {
    borderRadius: "3px",
    borderColor: "red",    
    justifyContent: "center",
    alignItems: "center",
    fontSize: "60", 
    padding: 40,
    color: "#1B2A41"
  }
});

export { GoodTimes }
