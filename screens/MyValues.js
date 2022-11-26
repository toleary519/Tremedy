import React, { useState, useEffect } from "react";
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
import { look } from "../assets/styles";

const MyValues = () => {
  const [storage, setStorage] = useState(storage ? storage : []);
  const [token, setToken] = useState(token ? token : {});
  const [myValue, setMyValue] = useState("");
  const [imageWindow, setImageWindow] = useState(false);

  let sortedEntries = storage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedValues");
      const jsonTokValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
      setStorage(savedData);
      setToken(savedTokData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (storage) => {
    try {
      const jsonValue = JSON.stringify(storage);
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

    const newList = [...storage, newValue];

    setStorage(newList);
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
    for (let obj of storage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setStorage(storage.filter((val) => val.id !== item.id));
    // make permanent delete
    storage.splice(index, 1);
    // save deletion of item
    storeData(storage);
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
    storeData(storage);
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
            placeholder={"New value"}
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

// {/* <View style={look.container}>
//   {/* {keyboardandscrolling} */}
//   <View style={look.topBox}>
//     <View style={look.header}>
//       <View style={look.subHeader}>
//         {/* input */}
//         {/* center */}
//         {/* map */}
//         <View style={look.element}>
//           <View style={look.elementHeader}>
//         </View>
//       </View>
//     </View>
//   </View>
// </View> */}
