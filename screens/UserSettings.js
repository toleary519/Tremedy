import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { openContactForm } from "react-native-contacts";

const UserSettings = () => {
  const [storage, set] = useState(storage ? storage : []);
  const [flags, setFlags] = useState(true);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");
  const [reportLength, setReportLength] = useState(7);

  const settingsOptions = [
    {
      title: "My Info",
      subtitle: "All about you",
    },
    {
      title: "My Pin",
      subtitle: "Create or reset your pin.",
    },
    {
      title: "Manage Flags",
      subtitle: "Select which flags you want to be prompted to mark.",
    },
    {
      title: "Delete Data",
      subtitle: "Delete all data stored on your device.",
    },
    {
      title: "Report Length",
      subtitle: "How many weeks do you want to review at once?",
    },
    {
      title: "Billing Information",
      subtitle: "Change cards or subsciption.",
    },
  ];

  let sortedEntries = storage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(string - storage);
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      set(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (storage) => {
    try {
      const jsonValue = JSON.stringify(storage);
      await AsyncStorage.setItem(string - storage, jsonValue);
    } catch (e) {
      console.log("1", e);
    }
  };

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let orderId = currentDate.getTime();

    let newItem = {
      id: orderId,
      entry: entry,
      flag: flag,
    };

    const newList = [...storage, newItem];

    set(newList);
    setEnt("");
    storeData(newList);
    {
      console.log("sorted: ", sortedEntries);
    }
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of storage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    set(storage.filter((val) => val.id !== item.id));
    // make permanent delete
    storage.splice(index, 1);
    // save deletion of item
    storeData(storage);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const errorCheck = () => {
    if (!entry.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      flagAlert();
    }
  };

  const handleFlag = (i) => {
    let currentItem = sortedEntries[i];
    currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
    storeData(storage);
    getData();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{ marginTop: 20 }} />
        {settingsOptions.map((item, i) => (
          <TouchableOpacity key={i}>
            <Text style={styles.add}>{item.title}</Text>
            <Text style={styles.sub}>{item.subtitle}</Text>
            <View
              style={{
                borderBottomColor: "#3C5E90",
                borderBottomWidth: 3,
                width: "90%",
                left: "5%",
              }}
            />
          </TouchableOpacity>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41",
    paddingBottom: 30,
  },
  add: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "flex-start",
    alignItems: "center",
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  sub: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.6,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: "white",
    color: "#D7D9D7",
  },
});

export { UserSettings };
