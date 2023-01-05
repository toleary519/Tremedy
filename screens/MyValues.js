import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import coreV from "../assets/coreV.jpeg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics } from "aws-amplify";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const MyValues = () => {
  const [valueStorage, setValueStorage] = useState(
    valueStorage ? valueStorage : []
  );
  const [token, setToken] = useContext(Context);
  const [myValue, setMyValue] = useState("");
  const [imageWindow, setImageWindow] = useState(false);

  let sortedEntries = valueStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedValues");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setValueStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (valueStorage) => {
    try {
      const jsonValue = JSON.stringify(valueStorage);
      await AsyncStorage.setItem("storedValues", jsonValue);
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

    let newValue = {
      id: orderId,
      title: "Values List",
      flag: flag,
      myValue: myValue,
      myThree: false,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...valueStorage, newValue];

    setValueStorage(newList);
    setMyValue("");
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
    for (let obj of valueStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setValueStorage(valueStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    valueStorage.splice(index, 1);
    // save deletion of item
    storeData(valueStorage);
  };

  const errorCheck = () => {
    if (!myValue.replace(/\s+/g, "")) {
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
    storeData(valueStorage);
    getData();
  };

  useEffect(() => {
    Analytics.record({ name: "Values Page Visit" });
  }, []);

  console.log("value run");
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
              Look through your core values and assess how this action would
              align with them.
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              If you are unsure, look through this list of values and take some
              time to choose a few that truly resonate with you.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setImageWindow(!imageWindow ? true : false)}
          >
            <FontAwesome
              style={[
                look.icon,
                look.centerIcon,
                { paddingBottom: "4%", fontSize: 25, opacity: 0.7 },
              ]}
              name="question-circle"
            />
            {imageWindow ? (
              <View style={[look.imageBox]}>
                <Image style={look.image} source={coreV} />
              </View>
            ) : null}
          </TouchableOpacity>

          <TextInput
            style={look.input}
            onChangeText={(text) => setMyValue(text)}
            value={myValue}
            placeholder={"New value ..."}
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
                <Text style={look.add}>{item.myValue}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { MyValues };
