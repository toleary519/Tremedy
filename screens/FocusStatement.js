import React, { useState, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const FocusStatement = () => {
  const [focusStorage, setFocusStorage] = useState(
    focusStorage ? focusStorage : []
  );
  const [token, setToken] = useContext(Context);
  const [myFocus, setMyFocus] = useState("");

  let sortedEntries = focusStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedFocus");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setFocusStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (focusStorage) => {
    try {
      const jsonValue = JSON.stringify(focusStorage);
      await AsyncStorage.setItem("storedFocus", jsonValue);
    } catch (e) {
      console.log(e);
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

    let newFocus = {
      id: orderId,
      title: "Focus Statement",
      myThree: false,
      myFocus: myFocus,
      flag: flag,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...focusStorage, newFocus];

    setFocusStorage(newList);
    setMyFocus("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;

    for (let obj of focusStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }

    setFocusStorage(focusStorage.filter((val) => val.id !== item.id));

    focusStorage.splice(index, 1);

    storeData(focusStorage);
  };

  const errorCheck = () => {
    if (!myFocus.replace(/\s+/g, "")) {
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
    storeData(focusStorage);
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
              Think of your focus. Who you want to be and who you are.
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Enter it below. As you grow update it if you feel the need and
              when in doubt refer to it as a guiding principle.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setMyFocus(text)}
            value={myFocus}
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
                <Text style={look.add}>{item.myFocus}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { FocusStatement };
