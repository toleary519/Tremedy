import React, { useState, useEffect } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics } from "aws-amplify";
import { SimpleLineIcons } from "@expo/vector-icons";
import { look } from "../assets/styles";
import { color } from "../assets/colors";

const Journal = () => {
  const [jStorage, setJStorage] = useState(jStorage ? jStorage : []);
  const [entry, setEntry] = useState("");

  let sortedEntries = jStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("journalStorage");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setJStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (jStorage) => {
    try {
      const jsonValue = JSON.stringify(jStorage);
      await AsyncStorage.setItem("journalStorage", jsonValue);
    } catch (e) {
      console.log("1", e);
    }
  };

  const handleAdd = () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let newItem = {
      id: orderId,
      entry: entry,
      time: `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...jStorage, newItem];

    setJStorage(newList);
    setEntry("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of jStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setJStorage(jStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    jStorage.splice(index, 1);
    // save deletion of item
    storeData(jStorage);
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
      handleAdd();
    }
  };

  useEffect(() => {
    Analytics.record({ name: "Journal Page Visit" });
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView extraHeight={175}>
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              What are you thinking about? How was your day?
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Write longform entries here. Try to type stream-of-conciousness
              about what is going on in your world for 3 minutes. 3 minutes is
              nothing. Keep going if you are in a flow. There are no flags on
              this page and entries are timestamped when you're done.
            </Text>
          </View>

          <TextInput
            style={look.input}
            onChangeText={(text) => setEntry(text)}
            value={entry}
            placeholder={"type away ..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />
          <TouchableOpacity onPress={() => errorCheck()}>
            <MaterialIcons
              style={[look.icon, look.centerIcon]}
              name="add-circle"
            />
          </TouchableOpacity>
          <View>
            {sortedEntries.map((item, i) => (
              <View key={item.id} style={look.border}>
                <View style={look.elementHeader}>
                  <TouchableOpacity onPress={() => handleDelete({ item })}>
                    <MaterialIcons
                      style={[look.icon, look.canIcon]}
                      name="delete-forever"
                    />
                  </TouchableOpacity>
                  <Text style={look.date}>
                    {item.time} - {item.date}
                  </Text>
                </View>
                <View style={look.element}>
                  <Text style={look.add}>{item.entry}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { Journal };
