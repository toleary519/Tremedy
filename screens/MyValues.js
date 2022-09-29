import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { A } from '@expo/html-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MyValues = () => {
   
  let fakeDB = []
  
  const [showDB, setShowDB] = useState(fakeDB)
  const [myValue, setMyValue] = useState() 
 
  const handleAdd = () => {
        
        let newValue = {
          id: myValue,
          myValue: myValue,
        };

        const newList = [...showDB, newValue]
        
        setShowDB(newList);
        setMyValue("");
    }

  const handleDelete = ({ item }, index) => {
          console.log("before: ", showDB)
          setShowDB(showDB.filter((val) => val.id !== item.id));
          showDB.splice(index, 1)
          console.log("after: ", showDB)
  }


  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.header}>
        Look through your core values and assess how this action would align with them.
      </Text>
      <Text style={styles.headerTwo}>
        If you are unsure, look through this list of values and take some time
        to choose a few that truly resonate with you.
      </Text>
      <A style={styles.link} href={`https://www.guilford.com/add/miller2/values.pdf`}>Core Values List</A>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setMyValue(text)}
        value={myValue}
        placeholder={"new value"} 
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
            <Text  style={styles.add}>{item.myValue}</Text>
            <TouchableOpacity onPress={() => handleDelete({ item })}>
              <MaterialIcons style={styles.deleteIcon} name="delete-forever"/>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </KeyboardAwareScrollView>
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
  link: {
    width: "95%",
    left: "2.5%",
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "#FC9F5B",
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

export { MyValues };