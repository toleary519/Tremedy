import React, { useState, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const GoodTimes = () => {
  const [goodStorage, setGoodStorage] = useState(
    goodStorage ? goodStorage : []
  );
  const [token, setToken] = useContext(Context);
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

    for (let obj of goodStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }

    setGoodStorage(goodStorage.filter((val) => val.id !== item.id));

    goodStorage.splice(index, 1);

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
    storeData(goodStorage);
    getData();
  };

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
            placeholder={"enter text here..."}
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
                <Text style={look.add}>{item.myGood}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { GoodTimes };
