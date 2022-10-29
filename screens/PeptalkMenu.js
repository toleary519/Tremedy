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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PepTalkMenu = ({ navigation }) => {
  let [routineList, setRoutineList] = useState(
    routineList ? routineList : pageOptions
  );

  let pageOptions = [
    {
      id: 0,
      selected: true,
      pageName: "PercievedThreatMenu",
      title: "Elevated State",
    },
    { id: 1, selected: false, pageName: "Report", title: "My Past Week" },
    {
      id: 2,
      selected: false,
      pageName: "FocusStatement",
      title: "My Focus Statement",
    },
    {
      id: 3,
      selected: false,
      pageName: "CopingStatement",
      title: "My Coping Statement",
    },
    { id: 4, selected: false, pageName: "MyValues", title: "My Values" },
    { id: 5, selected: false, pageName: "CheckIn", title: "Quick Check-In" },
    { id: 6, selected: false, pageName: "SelfTalk", title: "+ Self-Talk" },
    { id: 7, selected: false, pageName: "Pies", title: "PIES Check-In" },
    { id: 8, selected: false, pageName: "Five", title: "5-4-3-2-1" },
    { id: 9, selected: false, pageName: "NotesMenu", title: "Experiences" },
    {
      id: 10,
      selected: false,
      pageName: "SoberContacts",
      title: "Support Contacts",
    },
    { id: 11, selected: false, pageName: "ProCon", title: "Pros & Cons" },
    { id: 12, selected: false, pageName: "Activities", title: "Activities" },
    { id: 13, selected: false, pageName: "Routine", title: "My Routine" },
  ];

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

  // const handleAdd = (selection, i, routineList) => {
  //   let currentDate = new Date();
  //   let currentDay = currentDate.getDate();
  //   let currentMonth = currentDate.getMonth() + 1;
  //   let currentYear = currentDate.getFullYear();
  //   let orderId = currentDate.getTime();

  //   let newItem = {
  //     id: pageOptions[i].id,
  //     pageName: pageOptions[i].pageName,
  //     selection: selection,
  //   };

  //   const newList = [...routineList, newItem];

  //   setRoutineList(newList);
  //   storeData(newList);
  //   getData();
  // };

  const handleSelection = (i) => {
    let currentItem = pageOptions.filter((x) => x.id === i);

    routineList.contains();

    currentItem.selection
      ? (currentItem.selection = false)
      : (currentItem.selection = true);

    for (let routineItem of routineList) {
      if (routineItem.id === i) {
        routineItem = currentItem;
      }
    }

    storeData(routineList);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {pageOptions.map((item, i) => (
          <View key={item.id} style={styles.element}>
            <TouchableOpacity
              onPress={() => navigation.navigate(item.pageName)}
              delayPressIn={150}
            >
              <Text style={styles.add}>{item.title}</Text>
            </TouchableOpacity>

            {item.selection ? (
              <TouchableOpacity
                onPress={() => handleSelection(i)}
                delayPressIn={150}
              >
                <Text style={styles.inRoutine}> - from Routine</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleSelection(pageOptions, i)}
                delayPressIn={150}
              >
                <Text style={styles.outRoutine}> + to Routine</Text>
              </TouchableOpacity>
            )}
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
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#F4743B",
    backgroundColor: "#D2EAEB",
    marginTop: 21,
    width: "90%",
    left: "5%",
  },
  add: {
    color: "#1B2A41",
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
    textAlign: "flex-start",
  },
  routineButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F4743B",
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
    width: "90%",
  },
  right: {
    right: "65%",
    width: "15%",
  },
});

export { PepTalkMenu };
