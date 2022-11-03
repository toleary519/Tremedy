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
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pageOptions } from "./optionsList";
import { look } from "../assets/styles";

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
    <View style={look.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={look.topBox}>
          {pageOptions.map((item, i) => (
            <View key={item.id} style={look.border}>
              <View value={item} style={look.element}>
                <View style={styles.left}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.pageName)}
                    delayPressIn={150}
                  >
                    <Text style={look.add}>{item.title}</Text>
                    <Text style={look.sub}>{item.sub}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.right}>
                  {verify({ item }) ? (
                    <TouchableOpacity
                      onPress={() => handleDelete({ item })}
                      delayPressIn={150}
                    >
                      <Feather name="check-circle" style={look.inRoutine} />
                    </TouchableOpacity>
                  ) : item.pageName === "Routine" ? (
                    <Text style={styles.text}>{count}</Text>
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
