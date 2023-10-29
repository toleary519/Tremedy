import React, { useState, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const Pies = () => {
  const [pieStorage, setPieStorage] = useState(pieStorage ? pieStorage : []);
  const [token, setToken] = useContext(Context);
  const [physical, setPhysical] = useState("");
  const [insights, setInsights] = useState("");
  const [emotions, setEmotions] = useState("");
  const [spiritual, setSpiritual] = useState("");

  let sortedEntries = pieStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedPie");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setPieStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };
  const storeData = async (focusStorage) => {
    try {
      const jsonValue = JSON.stringify(focusStorage);
      await AsyncStorage.setItem("storedPie", jsonValue);
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

    let newPie = {
      id: orderId,
      flag: flag,
      title: "PIES Check-In",
      myThree: false,
      physical: physical,
      insights: insights,
      emotions: emotions,
      spiritual: spiritual,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...pieStorage, newPie];

    setPieStorage(newList);
    setPhysical("");
    setInsights("");
    setEmotions("");
    setSpiritual("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    for (let obj of pieStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    setPieStorage(pieStorage.filter((val) => val.id !== item.id));
    pieStorage.splice(index, 1);
    storeData(pieStorage);
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
      `Flag this to your "One Sheet?"`,
      `The One Sheet is in the Tool Box. Manage alerts in User Settings.`,
      [
        {
          text: "Yes",
          onPress: () => pressTrue(),
        },

        { text: "Nope", onPress: () => pressFalse() },
      ]
    );
  };

  const errorCheck = () => {
    if (
      !physical.replace(/\s+/g, "") ||
      !insights.replace(/\s+/g, "") ||
      !emotions.replace(/\s+/g, "") ||
      !spiritual.replace(/\s+/g, "")
    ) {
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
    storeData(pieStorage);
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
            <Text style={[look.add, { fontSize: 20 }]}>
              How do you feel today?
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setPhysical(text)}
            value={physical}
            placeholder={"Physically ..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setInsights(text)}
            value={insights}
            placeholder={"Insights & Thoughts..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setEmotions(text)}
            placeholder={"Emotions & Feelings..."}
            placeholderTextColor={color.placeholderText}
            value={emotions}
            multiline
            keyboardType="default"
          />
          <TextInput
            style={look.input}
            onChangeText={(text) => setSpiritual(text)}
            placeholder={"Connection to Self, Others or Higher Power"}
            placeholderTextColor={color.placeholderText}
            value={spiritual}
            multiline
            keyboardType="default"
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                errorCheck();
              }}
            >
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
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Physically</Text>
                  <Text style={look.add}>{item.physical}</Text>
                </View>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Insights & Thoughts</Text>
                  <Text style={look.add}>{item.insights}</Text>
                </View>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Emotions & Feelings</Text>
                  <Text style={look.add}>{item.emotions}</Text>
                </View>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>
                    Spiritual connection to self, others or higher power
                  </Text>
                  <Text style={look.add}>{item.spiritual}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { Pies };
