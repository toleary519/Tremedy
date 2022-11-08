import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const UserSettings = () => {
  // const [storage, set] = useState(storage ? storage : []);
  // const [windowOpen, setWindowOpen] = useState(false);
  const [flags, setFlags] = useState(true);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [DOB, setDOB] = useState("");
  const [pin, setPin] = useState(null);
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");
  const [substance, setSubstance] = useState(false);
  const [subscribed, setSubscibed] = useState(false);
  const [reportLength, setReportLength] = useState(7);

  const deleteData = () => {
    const secondCheck = () => {
      Alert.alert(
        "Delete Everything?",
        `All records will be lost. There is no way to recover them.`,
        [
          {
            text: "Yes",
            onPress: () => AsyncStorage.clear(),
          },
          {
            text: "Save Them",
            onPress: () => {
              return;
            },
          },
        ]
      );
    };

    Alert.alert("Confirm Delete", `Are you sure?`, [
      {
        text: "Yes",
        onPress: () => secondCheck(),
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const bugReport = () => {
    // Report a bug with email.
  };
  const creditCardInformation = () => {
    // Sign Up.
  };

  const windowToggle = (i) => {
    for (let x of settingsOptions) {
      if (x.id === i) {
        x.window = true;
      }
    }
  };
  const closeWindow = (i) => {
    for (let x of settingsOptions) {
      if (x.id === i) {
        x.window = false;
      }
    }
  };

  let settingsOptions = [
    {
      id: 0,
      title: "My Info",
      subtitle: "All about you",
      func: [setFirst, setLast, setDOB, setEmail],
      dropdown:
        "Enter your information here for report sharing and profile recovery.",
      value: [first, last, DOB, email],
      window: false,
    },
    {
      id: 1,
      title: "Substance abuse & behavioural disorders.",
      subtitle:
        "If you are struggling with these issues there are additional tools here.",
      func: setSubstance,
      dropdown:
        "On the home page there will be a Lapse button for planning with unique workflows.",
      value: substance,
      window: false,
    },
    {
      id: 2,
      title: "My Pin",
      subtitle: "Create or reset your pin.",
      func: setPin,
      dropdown: "You can enter a pin here unique to this app.",
      value: pin,
      window: false,
    },
    {
      id: 3,
      title: "Manage Flags",
      subtitle: "Select when and how you would like to use flags.",
      func: setFlags,
      dropdown:
        "Turning flags off here will turn off the prompt. You can click the flag icon to add items to your report.",
      value: flags,
      window: false,
    },
    {
      id: 4,
      title: "Delete Data",
      subtitle: "Delete all data stored on your device.",
      funcTitle: "Delete",
      func: deleteData,
      dropdown: "Deleting data is final.",
      value: null,
      window: false,
    },
    {
      id: 5,
      title: "Report Length",
      subtitle: "How many weeks do you want in your report?",
      func: "",
      dropdown: !subscribed
        ? "Settings can be changed by members."
        : "Set a time frame between 7 and 30 days. It is recommended to choose the length of time between therapy sessions.",
      value: "",
      window: false,
    },
    {
      id: 6,
      title: "Found a bug?",
      subtitle: "Help us improve your experience.",
      func: bugReport,
      dropdown:
        "Explain as best you can the issue that you are having and we will address it as soon as possible.",
      value: null,
      window: false,
    },
    // {
    //   id: 7,
    //   title: "Billing Information",
    //   subtitle: "Change cards or subsciption.",
    //   func: creditCardInformation,
    //   dropdown:
    //     "Add or change card information to have access to all of Ourtre",
    //   value: subscribed,
    //   window: false,
    // },
  ];

  // let sortedEntries = storage.sort((a, b) => {
  //   return b.id - a.id;
  // });

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(string - storage);
  //     let savedData = jsonValue ? JSON.parse(jsonValue) : [];
  //     set(savedData);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const storeData = async (storage) => {
  //   try {
  //     const jsonValue = JSON.stringify(storage);
  //     await AsyncStorage.setItem(string - storage, jsonValue);
  //   } catch (e) {
  //     console.log("1", e);
  //   }
  // };

  // const handleAdd = (flag) => {
  //   let currentDate = new Date();
  //   let orderId = currentDate.getTime();

  //   let newItem = {
  //     id: orderId,
  //     entry: entry,
  //     flag: flag,
  //   };

  //   const newList = [...storage, newItem];

  //   set(newList);
  //   setEnt("");
  //   storeData(newList);
  //   {
  //     console.log("sorted: ", sortedEntries);
  //   }
  //   getData();
  // };

  // const handleDelete = ({ item }) => {
  //   let index = 0;
  //   // find the index of item to delete
  //   for (let obj of storage) {
  //     if (obj.id !== item.id) {
  //       index++;
  //     } else {
  //       break;
  //     }
  //   }
  //   // filter array for display
  //   set(storage.filter((val) => val.id !== item.id));
  //   // make permanent delete
  //   storage.splice(index, 1);
  //   // save deletion of item
  //   storeData(storage);
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  // const errorCheck = () => {
  //   if (!entry.replace(/\s+/g, "")) {
  //     Alert.alert("Entry Error", `Fill out all fields to submit.`, [
  //       { text: "Got It" },
  //     ]);
  //     return;
  //   } else {
  //     flagAlert();
  //   }
  // };

  // const handleFlag = (i) => {
  //   let currentItem = sortedEntries[i];
  //   currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
  //   storeData(storage);
  //   getData();
  // };

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <KeyboardAwareScrollView>
          {settingsOptions.map((item, i) => (
            <View key={i} style={look.border}>
              <TouchableOpacity onPress={() => (item.window = true)}>
                <View style={look.header}>
                  <Text style={look.add}>{item.title}</Text>
                  <Text style={look.sub}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
              <View>
                {item.window ? (
                  <View style={[look.element, { marginBottom: 20 }]}>
                    <View style={look.elementHeader}>
                      <TouchableOpacity onPress={() => (item.window = false)}>
                        <MaterialIcons
                          style={[look.icon, look.canIcon]}
                          name="delete-forever"
                        />
                      </TouchableOpacity>
                      <Text style={look.add}>{item.dropdown}</Text>
                    </View>
                    <TouchableOpacity onPress={item.func}>
                      <Text
                        style={item.value ? look.inRoutine : look.outRoutine}
                      >
                        {item.funcTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export { UserSettings };
