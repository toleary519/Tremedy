import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics } from "aws-amplify";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const BadTimes = () => {
  const [badStorage, setBadStorage] = useState(badStorage ? badStorage : []);
  const [token, setToken] = useContext(Context);
  const [note, setNote] = useState("");

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

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newNote = {
      id: orderId,
      title: "Bad Experiences",
      myThree: false,
      flag: flag,
      myBad: note,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...badStorage, newNote];

    setBadStorage(newList);
    setNote("");
    storeData(newList);
    getData();
  };

  const flagAlert = () => {
    const pressTrue = () => {
      let flag = true;
      handleAdd(flag);
    };

    const pressFalse = () => {
      let flag = false;
      handleAdd(flag);
    };

    Alert.alert(
      `Flag this to your "One Sheet?"`,
      `The One Sheet is in the Tool Box. Manage alerts in User Settings.`,
      [
        {
          text: "Yes",
          onPress: () => pressTrue(),
        },

        { text: "Nope", onPress: () => pressFalse() },
      ]
    );
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
    }
    if (token.flags) {
      flagAlert();
    } else {
      let flag = false;
      handleAdd(flag);
    }
  };

  const handleFlag = (i) => {
    let currentItem = sortedEntries[i];
    currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
    storeData(badStorage);
    getData();
  };

  // useEffect(() => {
  //   Analytics.record({ name: "BadTimes Page Visit" });
  // }, []);

  console.log("bad run");
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              “You are free to choose, but you are not free to alter the
              consequences of your decisions.” - Ezra Taft Benson
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              These are some lows. You are not these lows, and you don't have to
              be.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setNote(text)}
            value={note}
            placeholder={"New Note ..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />
          <View>
            <TouchableOpacity onPress={() => errorCheck()}>
              <MaterialIcons
                style={[look.icon, look.centerIcon]}
                name="add-circle"
              />
            </TouchableOpacity>
          </View>
          {sortedEntries.map((item, i) => (
            <View key={item.id} style={look.border}>
              <View style={look.elementHeader}>
                <TouchableOpacity onPress={() => handleDelete({ item })}>
                  <MaterialIcons
                    style={[look.fIcon, look.canIcon]}
                    name="delete-forever"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleFlag(i);
                  }}
                >
                  <SimpleLineIcons
                    style={item.flag ? [look.fIcon, look.selected] : look.fIcon}
                    name="flag"
                  />
                </TouchableOpacity>
              </View>
              <View style={look.element}>
                <Text style={look.add}>{item.myBad}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { BadTimes };
