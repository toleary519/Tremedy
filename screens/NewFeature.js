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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { look } from "../assets/styles";

const NewFeature = () => {
  const [XY, setST] = useState(XY ? XY : []);
  const [entry, setEnt] = useState("");

  let sortedEntries = XY.sort((a, b) => {
    return b.id - a.id;
  });

  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem(stringStorage);
  //       let savedData = jsonValue ? JSON.parse(jsonValue) : [];
  //       setST(savedData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const storeData = async (XY) => {
  //     try {
  //       const jsonValue = JSON.stringify(XY);
  //       await AsyncStorage.setItem(stringStorage, jsonValue);
  //     } catch (e) {
  //       console.log("1", e);
  //     }
  //   };

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
      `Flag this in "My Past Week?"`,
      `Manage flags in User Settings.`,
      [
        {
          text: "Yes",
          onPress: () => pressTrue(),
        },

        { text: "Nope", onPress: () => pressFalse() },
      ]
    );
  };

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newItem = {
      id: orderId,
      entry: entry,
      flag: flag,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...XY, newItem];

    setST(newList);
    setEnt("");
    // storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of XY) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setST(XY.filter((val) => val.id !== item.id));
    // make permanent delete
    XY.splice(index, 1);
    // save deletion of item
    // storeData(XY);
  };

  //   React.useEffect(() => {
  //     getData();
  //   }, []);

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
    // storeData(XY);
    // getData();
  };

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView extraHeight={175}>
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>Header</Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>Sub Header</Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setEnt(text)}
            value={entry}
            placeholder={"what do you want to see?"}
            multiline
            keyboardType="default"
            color="#D7D9D7"
            placeholderTextColor={"#F1F7EE"}
          />
          <View style={look.drawBox}>{/* draw feature */}</View>
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
                  <Text style={look.date}>{item.date}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleFlag(i);
                    }}
                  >
                    <SimpleLineIcons
                      style={
                        item.flag ? [look.fIcon, look.selected] : look.fIcon
                      }
                      name="flag"
                    />
                  </TouchableOpacity>
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

export { NewFeature };
