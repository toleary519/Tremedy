import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pageOptions } from "./optionsList";

const PepTalkMenu = ({ navigation }) => {
  let [routineList, setRoutineList] = useState(routineList ? routineList : []);

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

  const verify = ({ item }) => {
    for (let x of routineList) {
      if (x.id === item.id) {
        return x.selected;
      }
    }
    return false;
  };

  const count = routineList.length ? routineList.length : 0;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {pageOptions.map((item, i) => (
          <View key={item.id} value={item} style={styles.element}>
            <View style={styles.spacer}></View>
            <View style={styles.left}>
              <TouchableOpacity
                onPress={() => navigation.navigate(item.pageName)}
                delayPressIn={150}
              >
                <Text style={styles.add}>{item.title}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.right}>
              {verify({ item }) ? (
                <TouchableOpacity
                  onPress={() => handleDelete({ item })}
                  delayPressIn={150}
                >
                  <Feather name="check-circle" style={styles.inRoutine} />
                </TouchableOpacity>
              ) : item.pageName === "Routine" ? (
                <Text style={styles.text}>{count}</Text>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAdd({ item })}
                  delayPressIn={150}
                >
                  <Feather name="plus" style={styles.outRoutine} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// used overflow: hidden below to prevent corners.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
  },
  element: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#F4743B",
    backgroundColor: "#D2EAEB",
    marginTop: 21,
    width: "90%",
    left: "1.5%",
  },
  add: {
    color: "#1B2A41",
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  inRoutine: {
    color: "green",
    fontSize: 20,
  },
  outRoutine: {
    color: "brown",
    fontSize: 20,
  },
  left: {
    flex: 8,
    alignItems: "center",
  },
  right: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  text: {
    color: "green",
    fontSize: 20,
  },
});

export { PepTalkMenu };
