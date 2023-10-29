import React, { useState, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const That = () => {
  const [thatStorage, setThatStorage] = useState(
    thatStorage ? thatStorage : []
  );
  const [token, setToken] = useContext(Context);
  const [that, setThat] = useState("");

  let sortedEntries = thatStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedThat");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setThatStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (thatStorage) => {
    try {
      const jsonValue = JSON.stringify(thatStorage);
      await AsyncStorage.setItem("storedThat", jsonValue);
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

    let newthat = {
      id: orderId,
      title: "that!",
      myThree: false,
      flag: flag,
      myThat: that,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...thatStorage, newthat];

    setThatStorage(newList);
    setThat("");
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
    for (let obj of thatStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    setThatStorage(thatStorage.filter((val) => val.id !== item.id));
    thatStorage.splice(index, 1);
    storeData(thatStorage);
  };

  const errorCheck = () => {
    if (!that.replace(/\s+/g, "")) {
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
    storeData(thatStorage);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "15%" }}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              What is it? Write it down. Little or big.
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              What just came up? What were you doing? Why do you think you feel
              like this. Add any and all details.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setThat(text)}
            value={that}
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
                <Text style={look.add}>{item.myThat}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { That };
