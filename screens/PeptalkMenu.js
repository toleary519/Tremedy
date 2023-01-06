import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pageOptions } from "../helpers/optionsList";
import * as MailComposer from "expo-mail-composer";
import { look } from "../assets/styles";

const PepTalkMenu = ({ navigation }) => {
  let [routineList, setRoutineList] = useState(routineList ? routineList : []);
  const [isAvailable, setIsAvailable] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("savedRoutine");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setRoutineList(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (routineList) => {
    try {
      const jsonValue = JSON.stringify(routineList);
      await AsyncStorage.setItem("savedRoutine", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = ({ item }) => {
    let newItem = {
      id: item.id,
      pageName: item.pageName,
      sub: item.sub,
      selected: true,
      title: item.title,
    };

    const newList = [...routineList, newItem];

    setRoutineList(newList);
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of routineList) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setRoutineList(routineList.filter((val) => val.id !== item.id));
    // make permanent delete
    routineList.splice(index, 1);
    // save deletion of item
    storeData(routineList);
  };

  const sendContactEmail = () => {
    MailComposer.composeAsync({
      subject: `Notice : Tremedy Team`,
      body: "The floor is yours.",
      recipients: "contact@diffit.io",
      attachments: [],
    });
  };

  const verify = ({ item }) => {
    for (let x of routineList) {
      if (x.id === item.id) {
        return x.selected;
      }
    }
    return false;
  };

  const count = routineList.length ? routineList.length : 0;

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability();
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "15%" }}
      >
        <View style={look.topBox}>
          {pageOptions.map((item, i) => (
            <View key={item.id} style={look.border}>
              <View value={item} style={look.element}>
                <View style={look.left}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.pageName)}
                    delayPressIn={150}
                  >
                    <Text style={look.add}>{item.title}</Text>
                    <Text style={look.sub}>{item.sub}</Text>
                  </TouchableOpacity>
                </View>
                <View style={look.right}>
                  {verify({ item }) ? (
                    <TouchableOpacity
                      onPress={() => handleDelete({ item })}
                      delayPressIn={150}
                    >
                      <Feather name="check-circle" style={look.inRoutine} />
                    </TouchableOpacity>
                  ) : item.pageName === "Routine" ? (
                    <Text style={look.text}>{count}</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleAdd({ item })}
                      delayPressIn={150}
                    >
                      <Feather name="plus" style={look.outRoutine} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
          <View style={look.border}>
            <View style={look.element}>
              <View style={look.left}>
                <TouchableOpacity
                  delayPressIn={150}
                  onPress={() => sendContactEmail()}
                >
                  <Text style={look.add}>Contact Us</Text>
                  <Text style={look.sub}>We're all ears.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// used overflow: hidden below to prevent corners.

const styles = StyleSheet.create({
  left: {
    flex: 8,
  },
  right: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "green",
    fontSize: 20,
    left: "10%",
  },
});

export { PepTalkMenu };
