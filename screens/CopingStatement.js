import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert, TextInput, TouchableOpacity} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { A } from '@expo/html-elements';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CopingStatement = () => {
    
  const [copingStorage, setCopingStorage] = useState(copingStorage ? copingStorage : [])
  const [myCoping, setMyCoping] = useState("") 

  let sortedEntries = copingStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedcoping");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setCopingStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (copingStorage) => {
    try {
      const jsonValue = JSON.stringify(copingStorage);
      await AsyncStorage.setItem("storedcoping", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newCoping = {
      id: orderId,
      myCoping: myCoping,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...copingStorage, newCoping];

    setCopingStorage(newList);
    setMyCoping("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of copingStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setCopingStorage(copingStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    copingStorage.splice(index, 1);
    // save deletion of item
    storeData(copingStorage);
  };

    React.useEffect(() => {
    getData()
    }, []);
    
    const errorCheck = () => {
      if (!myCoping.replace(/\s+/g, "")) {
        Alert.alert("Entry Error", `Fill out all fields to submit.`, [
          { text: "Got It" },
        ]);
        return;
      } else {
        handleAdd();
      }
    };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={175}>
        <Text style={styles.header}>
          Think of a coping statement that in concise and impactful. A rational
          nudge from yourself to help you stay on course.
        </Text>
        <Text style={styles.headerTwo}>
          Enter it below. As you grow update it if you feel the need and when
          tempted or in doubt refer back to it.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMyCoping(text)}
          value={myCoping}
          placeholder={"coping statement"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {sortedEntries.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.add}>{item.myCoping}</Text>
              <TouchableOpacity onPress={() => handleDelete({ item })}>
                <MaterialIcons
                  style={styles.deleteIcon}
                  name="delete-forever"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
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

