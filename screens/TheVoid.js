import React, { useState } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SimpleLineIcons } from "@expo/vector-icons";

const TheVoid = () => {
  const [voidLetter, setVoidLetter] = useState(voidLetter ? voidLetter : "");
  const [entry, setEnt] = useState("");

  const flagAlert = () => {
    const pressTrue = () => {
      let flag = true;
      handleAdd(flag);
    };

    const pressFalse = () => {
      let flag = false;
      handleAdd(flag);
    };

    Alert.alert(`It's off into the void!`, `Manage flags in User Settings.`, [
      {
        text: "Yes",
        onPress: () => pressTrue(),
      },

      { text: "Nope", onPress: () => pressFalse() },
    ]);
  };

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newItem = {
      id: orderId,
      entry: entry,
      flag: flag,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...voidLetter, newItem];

    setVoidLetter(newList);
    setEnt("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of voidLetter) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setVoidLetter(voidLetter.filter((val) => val.id !== item.id));
    // make permanent delete
    voidLetter.splice(index, 1);
    // save deletion of item
    storeData(voidLetter);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const errorCheck = () => {
    if (!entry.replace(/\s+/g, "")) {
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
    storeData(voidLetter);
    getData();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={175}>
        <Text style={styles.header}>
          Need to get something off your chest? Want to rant and rave?
        </Text>
        <Text style={styles.headerTwo}>Type it out and fire it off!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEnt(text)}
          value={entry}
          placeholder={"coping statement"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {sortedEntries.map((item, i) => (
            <View key={item.id} style={styles.pieContainer}>
              <View style={styles.entryTop}>
                <Text style={styles.date}>{item.date}</Text>

                <TouchableOpacity
                  onPress={() => {
                    handleFlag(i);
                  }}
                >
                  <SimpleLineIcons
                    style={
                      item.flag ? [styles.fIcon, styles.selected] : styles.fIcon
                    }
                    name="flag"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.add}>{item.entry}</Text>
              <TouchableOpacity onPress={() => handleDelete({ item })}>
                <MaterialIcons
                  style={styles.deleteIcon}
                  name="delete-forever"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { TheVoid };
