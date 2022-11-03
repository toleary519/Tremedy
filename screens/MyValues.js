import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { A } from "@expo/html-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const MyValues = () => {
  const [storage, setStorage] = useState(storage ? storage : []);
  const [myValue, setMyValue] = useState("");

  let sortedEntries = storage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedValues");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setStorage(savedData);
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
    let orderId = currentDate.getTime();

    let newValue = {
      id: orderId,
      flag: flag,
      myValue: myValue,
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
    } else {
      flagAlert();
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
      <KeyboardAwareScrollView extraHeight={200}>
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