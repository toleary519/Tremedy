import React, { useState } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { look } from "../assets/styles";

const Craving = () => {
  const [cravingStorage, setCravingStorage] = useState(
    cravingStorage ? cravingStorage : []
  );
  const [craving, setCraving] = useState(
    craving
      ? craving
      : {
          trigger: "",
          severity: "",
          whereWho: "",
          action: "",
        }
  );
  const [token, setToken] = useState(token ? token : {});

  let sortedEntries = cravingStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedCraving");
      const jsonTokValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
      setCravingStorage(savedData);
      setToken(savedTokData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (cravingStorage) => {
    try {
      const jsonValue = JSON.stringify(cravingStorage);
      await AsyncStorage.setItem("storedCraving", jsonValue);
    } catch (e) {
      console.log("1", e);
    }
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
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let newItem = {
      id: orderId,
      time: `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
      title: "Craving",
      myThree: false,
      trigger: craving.trigger,
      severity: craving.severity,
      whereWho: craving.whereWho,
      action: craving.action,
      flag: flag,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...cravingStorage, newItem];

    setCravingStorage(newList);
    setCraving("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of cravingStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setCravingStorage(cravingStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    cravingStorage.splice(index, 1);
    // save deletion of item
    storeData(cravingStorage);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const errorCheck = () => {
    if (
      !craving.trigger.replace(/\s+/g, "") ||
      !craving.severity.replace(/\s+/g, "") ||
      !craving.whereWho.replace(/\s+/g, "") ||
      !craving.action.replace(/\s+/g, "")
    ) {
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
    storeData(cravingStorage);
    getData();
  };
  console.log("craving run");
  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>Fill out the fields below.</Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Identify patterns in situations or times of day.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setCraving({ ...craving, trigger: text })}
            value={craving.trigger}
            placeholder={"trigger..."}
            multiline
            keyboardType="default"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setCraving({ ...craving, severity: text })}
            value={craving.severity}
            placeholder={"severity, 1-10"}
            maxLength={2}
            multiline
            keyboardType="number-pad"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setCraving({ ...craving, whereWho: text })}
            value={craving.whereWho}
            placeholder={"who with, where?"}
            multiline
            keyboardType="default"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setCraving({ ...craving, action: text })}
            value={craving.action}
            placeholder={"what did you do?"}
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
                  <Text style={look.sub}>Severity: {item.severity}</Text>
                  <Text style={look.sub}>{item.time}</Text>
                  <Text style={look.sub}>{item.date}</Text>
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
                <View>
                  <View style={look.element}>
                    <View>
                      <Text style={look.sub}>Trigger</Text>
                      <Text style={look.add}>{item.trigger}</Text>
                    </View>
                  </View>
                  <View style={look.element}>
                    <View>
                      <Text style={look.sub}>Who / Where</Text>
                      <Text style={look.add}>{item.whereWho}</Text>
                    </View>
                  </View>
                  <View style={look.element}>
                    <View>
                      <Text style={look.sub}>Action</Text>
                      <Text style={look.add}>{item.action}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { Craving };
