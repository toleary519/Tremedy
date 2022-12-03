import React, { useContext, useState } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { StateContext } from "../Context";

const GoodTimes = () => {
  const { state } = useContext(StateContext);
  const [goodStorage, setGoodStorage] = useState(
    state.goodStorage ? state.goodStorage : []
  );
  const token = state.token ? state.token : [];
  const [note, setNote] = useState("");

  let sortedEntries = goodStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const storeData = async (goodStorage) => {
    try {
      const jsonValue = JSON.stringify(goodStorage);
      await AsyncStorage.setItem("storedGood", jsonValue);
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
      title: "Good Experiences",
      myThree: false,
      flag: flag,
      myGood: note,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...goodStorage, newNote];

    setGoodStorage(newList);
    setNote("");
    storeData(newList);
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
    setGoodStorage(sortedEntries);
    storeData(goodStorage);
  };
  console.log("good time ran");
  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              “I'm defined by the vision of my future rather than my past. While
              doing so I am living ahead of my time.” - Unknown
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Look at these highs! You know who you can be, and how.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setNote(text)}
            value={note}
            placeholder={"New note"}
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
                <Text style={look.add}>{item.myGood}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};;

export { GoodTimes };
