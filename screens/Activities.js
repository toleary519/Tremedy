import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { A } from '@expo/html-elements';

const Activities = () => {
   
  let fakeDB = []
  
  const [showDB, setShowDB] = useState(fakeDB)
  const [activity, setActivity] = useState() 
 
  const handleAdd = () => {
        
        let newActivity = {
          id: activity,
          activity: activity,
        };

        const newList = [...showDB, newActivity]
        
        setShowDB(newList);
        setActivity("");
    }

  const handleDelete = ({ item }, index) => {
          console.log("before: ", showDB)
          setShowDB(showDB.filter((val) => val.id !== item.id));
          showDB.splice(index, 1)
          console.log("after: ", showDB)
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        Make a list below of activities you enjoy and could do at the drop of the hat.
      </Text>
      <Text style={styles.headerTwo}>
        Or use it as a To-Do list. Something for unanticipated bordom.
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setActivity(text)}
        value={activity}
        placeholder={"new activity"} 
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
            <Text  style={styles.add}>{item.activity}</Text>
            <TouchableOpacity onPress={() => handleDelete({ item })}>
              <MaterialIcons style={styles.deleteIcon} name="delete-forever"/>
            </TouchableOpacity>
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
    // flexDirection: "row",
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "5%",
    borderColor: "#D7D9D7",
    flexDirection: "row",
    justifyContent: "center",
  },
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    width: "95%",
    left: "2.5%",
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
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
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    right: "50%",
    fontSize: 30,
    color: "#D7D9D7",
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

export { Activities };