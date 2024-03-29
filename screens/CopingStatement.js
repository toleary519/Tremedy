import React, { useState, useContext, useEffect } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Analytics } from "aws-amplify";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const CopingStatement = () => {
  const [copingStorage, setCopingStorage] = useState(
    copingStorage ? copingStorage : []
  );
  const [token, setToken] = useContext(Context);
  const [myCoping, setMyCoping] = useState("");

  let sortedEntries = copingStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedCoping");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setCopingStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (copingStorage) => {
    try {
      const jsonValue = JSON.stringify(copingStorage);
      await AsyncStorage.setItem("storedCoping", jsonValue);
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

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newCoping = {
      id: orderId,
      title: "Coping Statement",
      myThree: false,
      myCoping: myCoping,
      flag: flag,
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
    for (let obj of copingStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }

    setCopingStorage(copingStorage.filter((val) => val.id !== item.id));

    copingStorage.splice(index, 1);

    storeData(copingStorage);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const errorCheck = () => {
    if (!myCoping.replace(/\s+/g, "")) {
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
    storeData(copingStorage);
    getData();
  };

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              Think of a coping statement that is concise and impactful. A
              rational nudge from yourself to help you stay on course.
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Enter it below. As you grow update it if you feel the need and
              when tempted or in doubt refer back to it.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setMyCoping(text)}
            value={myCoping}
            placeholder={"enter text here..."}
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
                <Text style={look.add}>{item.myCoping}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { CopingStatement };
