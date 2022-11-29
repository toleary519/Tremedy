import React, { useState, useEffect, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { StateContext } from "../Context";

const SelfTalk = () => {
  const [selfTalk, setSelfTalk] = useContext(StateContext);
  const [token, setToken] = useContext(StateContext);
  const [initial, setInitial] = useState("");
  const [rational, setRational] = useState("");

  let sortedEntries = selfTalk.sort((a, b) => {
    return b.id - a.id;
  });

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("storedSelfTalk");
  //     const jsonTokValue = await AsyncStorage.getItem("storedUser");
  //     let savedData = jsonValue ? JSON.parse(jsonValue) : [];
  //     let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
  //     setSelfTalk(savedData);
  //     setToken(savedTokData);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const storeData = async (selfTalk) => {
    try {
      const jsonValue = JSON.stringify(selfTalk);
      await AsyncStorage.setItem("storedSelfTalk", jsonValue);
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

    let newSelfTalk = {
      id: orderId,
      flag: flag,
      title: "+ Self-Talk",
      myThree: false,
      initial: initial,
      rational: rational,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...selfTalk, newSelfTalk];

    setSelfTalk(newList);
    setInitial("");
    setRational("");
    storeData(newList);
    // getData();
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
      `Manage your flags in User Settings.`,
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
    for (let obj of selfTalk) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setSelfTalk(selfTalk.filter((val) => val.id !== item.id));
    // make permanent delete
    selfTalk.splice(index, 1);
    // save deletion of item
    storeData(selfTalk);
  };

  const errorCheck = () => {
    if (!initial.replace(/\s+/g, "") || !rational.replace(/\s+/g, "")) {
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
    setSelfTalk(sortedEntries);
    storeData(selfTalk);
    // getData();
  };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "15%" }}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              What is the thought that you are having?
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setInitial(text)}
            value={initial}
            placeholder={"new entry"}
            multiline
            keyboardType="default"
          />

          <View style={look.header}>
            <Text style={look.add}>
              Take a moment to evaluate this thought. Modify the language, have
              you added negative distortions? Try to write a more resonably
              framed thought in the field below.
            </Text>
          </View>
          <View>
            <TextInput
              style={look.input}
              onChangeText={(text) => setRational(text)}
              value={rational}
              placeholder={"new entry"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>
              Look at the two side by side below and consider the differences.
              Run the exercize again if something new comes to mind.
            </Text>
          </View>

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
                    style={item.flag ? [look.fIcon, look.selected] : look.fIcon}
                    name="flag"
                  />
                </TouchableOpacity>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Initial Thought:</Text>
                  <Text style={look.add}>{item.initial}</Text>
                </View>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Rational Thought:</Text>
                  <Text style={look.add}>{item.rational}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};;

export { SelfTalk };
