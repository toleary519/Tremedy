import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BadTimes = () => {
  
  const [badStorage, setBadStorage] = useState(badStorage ? badStorage : [])
  const [note, setNote] = useState("")

  let sortedEntries = badStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedBad");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setBadStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (badStorage) => {
    try {
      const jsonValue = JSON.stringify(badStorage);
      await AsyncStorage.setItem("storedBad", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    let currentDate = new Date();
    let orderId = currentDate.getTime();

    let newNote = {
      id: orderId,
      message: note,
    };

    const newList = [...badStorage, newNote];

    setBadStorage(newList);
    setNote("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of badStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setBadStorage(badStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    badStorage.splice(index, 1);
    // save deletion of item
    storeData(badStorage);
  };

  const errorCheck = () => {
    if (!note.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      handleAdd();
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={200}>
        <Text style={styles.header}>
          “You are free to choose, but you are not free to alter the
          consequences of your decisions.” - Ezra Taft Benson
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
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        {sortedEntries.map((item) => (
          <View key={item.id} style={styles.memory}>
            <Text style={styles.add}>{item.message}</Text>
            <TouchableOpacity onPress={() => handleDelete({ item })}>
              <MaterialIcons style={styles.deleteIcon} name="delete-forever" />
            </TouchableOpacity>
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
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
    paddingBottom: 20,
    fontSize: 40,
    color: "#D7D9D7",
    textAlign: "center",
  },
  deleteIcon: {
    paddingTop: 10,
    paddingBottom: 20,
    left: "46%",
    fontSize: 30,
    color: "#D7D9D7",
  },
});

export { BadTimes }
