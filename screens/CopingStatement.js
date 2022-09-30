import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { A } from '@expo/html-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CopingStatement = () => {
    
  const [copingStorage, setCopingStorage] = useState(copingStorage ? copingStorage : [])
  const [mycoping, setMycoping] = useState() 

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('storedcoping')
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setCopingStorage(savedData);
    } catch(e) {
      console.log(e)
    }
  }

  const storeData = async (copingStorage) => {
    try {
      const jsonValue = JSON.stringify(copingStorage)
      await AsyncStorage.setItem('storedcoping', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

    const handleAdd = () => {
        
      let newcoping = {
        id: mycoping,
        mycoping: mycoping,
      };

      const newList = [...copingStorage, newcoping]
      
      setCopingStorage(newList);
      setMycoping("");
      storeData(newList);
      getData();
    }  

    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`

    const handleDelete = ({ item }) => {
      let index = 0
      // find the index of item to delete
      for (let obj of copingStorage) {
        if (obj.id !== item.id) {
          index++;
        }
        else {
          break;
        }
      }
      // filter array for display 
      setCopingStorage(copingStorage.filter((val) => val.id !== item.id));
      // make permanent delete
      copingStorage.splice(index, 1)
      // save deletion of item
      storeData(copingStorage);
    }

    React.useEffect(() => {
    getData()
    }, []);


  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.header}>
        Think of a coping statement that in concise and impactful. A rational nudge from yourself to help you stay on course.
      </Text>
      <Text style={styles.headerTwo}>
        Enter it below. As you grow update it if you feel the need and when tempted or in doubt refer back to it.
      </Text>
      <TextInput 
        style={styles.input} 
        onChangeText={(text) => setMycoping(text)}
        value={mycoping}
        placeholder={"coping statement"} 
        multiline
        keyboardType="default"
        color="#D7D9D7"
        placeholderTextColor={"#F1F7EE"}    
      />
      <TouchableOpacity onPress={() => handleAdd()}>
        <MaterialIcons style={styles.icon} name="add-circle" />
      </TouchableOpacity>
      <View>
        {copingStorage.map((item) => (
          <View key={item.id} style={styles.pieContainer}>
            <Text style={styles.date}>{currentMonth}/{currentDay}/{currentYear}  {time}</Text>
            <Text style={styles.add}>{item.mycoping}</Text>
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
    paddingBottom: 30
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
    width: "90%",
    left: "5%",
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
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    left: "45%",
    fontSize: 30,
    color: "#D7D9D7",
  },
});

export { CopingStatement };
