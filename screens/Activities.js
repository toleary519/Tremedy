import React, { useEffect, useState } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Analytics } from "aws-amplify";

const Activities = () => {
  const [activeStorage, setActiveStorage] = useState(
    activeStorage ? activeStorage : []
  );
  const [activity, setActivity] = useState("");

  let sortedEntries = activeStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedAct");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setActiveStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (activeStorage) => {
    try {
      const jsonValue = JSON.stringify(activeStorage);
      await AsyncStorage.setItem("storedAct", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    let currentDate = new Date();
    let orderId = currentDate.getTime();

    let newActivity = {
      id: orderId,
      activity: activity,
    };

    const newList = [...activeStorage, newActivity];

    setActiveStorage(newList);
    setActivity("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of activeStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setActiveStorage(activeStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    activeStorage.splice(index, 1);
    // save deletion of item
    storeData(activeStorage);
  };

  const errorCheck = () => {
    if (!activity.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      handleAdd();
    }
  };

  useEffect(() => {
    Analytics.record({ name: "Activities Page Visit" });
  }, []);

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
              Make a list below of activities you enjoy and could do at the drop
              of the hat.
            </Text>
          </View>
          <View style={look.subHeader}>
            <Text style={look.sub}>
              Or use it as a To-Do list. Something for unanticipated bordom.
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setActivity(text)}
            value={activity}
            placeholder={"new activity ..."}
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

          {sortedEntries.map((item) => (
            <View key={item.id} style={look.border}>
              <View style={look.elementHeader}>
                <TouchableOpacity onPress={() => handleDelete({ item })}>
                  <MaterialIcons
                    style={[look.icon, look.canIcon]}
                    name="delete-forever"
                  />
                </TouchableOpacity>
              </View>
              <View style={look.element}>
                <Text style={look.add}>{item.activity}</Text>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { Activities };
