import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const BadTimes = () => {
  
  let fakeDB = [{id: 1, message: "crashed my car"}]
  
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

  const handleDelete = ({ item }, index) => {
      console.log("before: ", showDB)
      setShowDB(showDB.filter((val) => val.id !== item.id));
      showDB.splice(index, 1)
      console.log("after: ", showDB)
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 30}} >
      <Text style={styles.header}>
      “You are free to choose, but you are not free to alter
       the consequences of your decisions.” - Ezra Taft Benson
      </Text>
      <Text style={styles.headerTwo}>
        These are some lows. You are NOT these lows, and you don't have to be.
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setNote(text)} 
        value={note}
        placeholder={"New Note"} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <TouchableOpacity onPress={() => handleAdd()}>
        <MaterialIcons style={styles.icon} name="add-circle" />
      </TouchableOpacity>
        {showDB.map((item) => (
          <View key={item.id} style={styles.memory}>
            <Text style={styles.add}>{item.message}</Text>
            <TouchableOpacity onPress={() => handleDelete({ item })}>
              <MaterialIcons style={styles.deleteIcon} name="delete-forever"/>
            </TouchableOpacity>
          </View>
        ))}
    </KeyboardAwareScrollView>
    </View>
  )
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#1B2A41"
  },
  memory: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "2.5%",
    borderColor: "#D7D9D7",
  },
  add: {
    width: "90%",
    left: "5%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "90%",
    left: "5%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  header: {
    paddingTop: 40,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  headerTwo: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 20,
    fontSize: 40,
    color: "#D7D9D7",
    textAlign: "center",
  },
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    left: "45%",
    fontSize: 30,
    color: "#D7D9D7",
  },
});

export { BadTimes }
