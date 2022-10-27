import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoodTimes = () => {
  const [goodStorage, setGoodStorage] = useState(
    goodStorage ? goodStorage : []
  );
  const [note, setNote] = useState("");

  let sortedEntries = goodStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedGood");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setGoodStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (goodStorage) => {
    try {
      const jsonValue = JSON.stringify(goodStorage);
      await AsyncStorage.setItem("storedGood", jsonValue);
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

    const newList = [...goodStorage, newNote];

    setGoodStorage(newList);
    setNote("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of goodStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setGoodStorage(goodStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    goodStorage.splice(index, 1);
    // save deletion of item
    storeData(goodStorage);
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
          “I'm defined by the vision of my future rather than my past. While
          doing so I am living ahead of my time.” - Unknown
        </Text>
        <Text style={styles.headerTwo}>
          Look at these highs! You know who you can be, and how.
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41",
  },
  memory: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 5,
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

export { GoodTimes };
