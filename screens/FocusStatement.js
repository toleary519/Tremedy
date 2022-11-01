import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const FocusStatement = () => {
  const [focusStorage, setFocusStorage] = useState(
    focusStorage ? focusStorage : []
  );
  const [myFocus, setMyFocus] = useState("");

  let sortedEntries = focusStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedFocus");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setFocusStorage(savedData);
      console.log("get focus data", focusStorage);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (focusStorage) => {
    try {
      const jsonValue = JSON.stringify(focusStorage);
      await AsyncStorage.setItem("storedFocus", jsonValue);
      console.log("Store Focus:", focusStorage);
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

    let newFocus = {
      id: orderId,
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
    // find the index of item to delete
    for (let obj of focusStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setFocusStorage(focusStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    focusStorage.splice(index, 1);
    // save deletion of item
    storeData(focusStorage);
  };

  const errorCheck = () => {
    if (!myFocus.replace(/\s+/g, "")) {
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
    storeData(focusStorage);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView extraHeight={250}>
        <Text style={look.add}>
          Think of your focus. Who you want to be and who you are.
        </Text>
        <Text style={look.sub}>
          Enter it below. As you grow update it if you feel the need and when in
          doubt refer to it as a guiding principle.
        </Text>
        <TextInput
          style={look.add}
          onChangeText={(text) => setMyFocus(text)}
          value={myFocus}
          placeholder={"focus statement"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={look.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {sortedEntries.map((item, i) => (
            <View key={item.id} style={look.border}>
              <View style={look.element}>
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
              <View style={{ flexDirection: "row" }}>
                <Text style={look.add}>{item.myFocus}</Text>
                <TouchableOpacity onPress={() => handleDelete({ item })}>
                  <MaterialIcons style={look.icon} name="delete-forever" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#1B2A41",
  //   paddingBottom: 30,
  // },
  // pieContainer: {
  //   borderRadius: 10,
  //   borderWidth: 4,
  //   marginTop: 7,
  //   marginBottom: 7,
  //   width: "95%",
  //   left: "2.5%",
  //   borderColor: "#D7D9D7",
  // },
  // elementContainer: {
  //   flexDirection: "row",
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  // add: {
  //   marginTop: 5,
  //   width: "90%",
  //   left: "5%",
  //   textAlign: "flex-start",
  //   alignItems: "center",
  //   marginBottom: 5,
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // date: {
  //   marginTop: 5,
  //   width: "90%",
  //   left: "5%",
  //   textAlign: "center",
  //   justifyContent: "flex-end",
  //   padding: 10,
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // header: {
  //   paddingTop: 30,
  //   textAlign: "center",
  //   justifyContent: "flex-start",
  //   alignItems: "flex-start",
  //   padding: 10,
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // headerTwo: {
  //   // borderRadius: 10,
  //   // borderWidth: 4,
  //   paddingTop: 30,
  //   textAlign: "center",
  //   justifyContent: "flex-start",
  //   alignItems: "flex-start",
  //   padding: 10,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // icon: {
  //   paddingTop: 20,
  //   paddingBottom: 20,
  //   fontSize: 30,
  //   color: "#D7D9D7",
  //   textAlign: "center",
  // },
  // input: {
  //   borderRadius: 10,
  //   borderWidth: 4,
  //   borderColor: "#D7D9D7",
  //   width: "80%",
  //   marginTop: 21,
  //   textAlign: "center",
  //   justifyContent: "center",
  //   padding: 10,
  //   left: "10%",
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#2f8587",
  // },
  // deleteIcon: {
  //   paddingTop: 20,
  //   paddingBottom: 20,
  //   left: "45%",
  //   fontSize: 30,
  //   color: "#D7D9D7",
  // },
  // entryTop: {
  //   flexDirection: "row",
  // },
  // fIcon: {
  //   marginRight: 10,
  //   paddingTop: 20,
  //   paddingBottom: 20,
  //   fontSize: 30,
  //   color: "#D7D9D7",
  //   textAlign: "center",
  // },
  // selected: {
  //   color: "#D84C36",
  // },
});

export { FocusStatement };

