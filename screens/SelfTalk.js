import React, { useState, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const SelfTalk = () => {
  const [selfTalk, setSelfTalk] = useState(selfTalk ? selfTalk : []);
  const [token, setToken] = useContext(Context);
  const [initial, setInitial] = useState("");
  const [rational, setRational] = useState("");

  let sortedEntries = selfTalk.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedSelfTalk");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setSelfTalk(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (selfTalk) => {
    try {
      const jsonValue = JSON.stringify(selfTalk);
      await AsyncStorage.setItem("storedSelfTalk", jsonValue);
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

    let newSelfTalk = {
      id: orderId,
      flag: flag,
      title: "+ Self-Talk",
      myThree: false,
      initial: initial,
      rational: rational,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...selfTalk, newSelfTalk];

    setSelfTalk(newList);
    setInitial("");
    setRational("");
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

  const handleDelete = ({ item }) => {
    let index = 0;
    for (let obj of selfTalk) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    setSelfTalk(selfTalk.filter((val) => val.id !== item.id));
    selfTalk.splice(index, 1);
    storeData(selfTalk);
  };

  const errorCheck = () => {
    if (!initial.replace(/\s+/g, "") || !rational.replace(/\s+/g, "")) {
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
    storeData(selfTalk);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "15%" }}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>
              What is the thought that you are having?
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(text) => setInitial(text)}
            value={initial}
            placeholder={"enter initial thought here..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />

          <View style={look.header}>
            <Text style={look.add}>
              Take a moment to evaluate this thought. Modify the language. Have
              you added negative distortions? Try to write a more reasonably
              framed thought in the field below.
            </Text>
          </View>
          <View>
            <TextInput
              style={look.input}
              onChangeText={(text) => setRational(text)}
              value={rational}
              placeholder={"enter reframed thought..."}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>
              Look at the two side by side and consider the differences. Run the
              exercise again if something new comes to mind.
            </Text>
          </View>

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
                  <Text style={look.sub}>Initial Thought:</Text>
                  <Text style={look.add}>{item.initial}</Text>
                </View>
              </View>
              <View style={look.element}>
                <View>
                  <Text style={look.sub}>Rational Thought:</Text>
                  <Text style={look.add}>{item.rational}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { SelfTalk };
