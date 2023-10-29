import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { feelingWheel } from "../helpers/feelingwheelOptions";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Analytics } from "aws-amplify";
import { look } from "../assets/styles";
import { color } from "../assets/colors";

const CheckIn = () => {
  let [checkinStorage, setCheckinStorage] = useState(
    checkinStorage ? checkinStorage : []
  );

  let [phys, setPhys] = useState(1);
  let [mental, setMental] = useState(1);
  let [outlook, setOutlook] = useState(1);
  let [checkin, setCheckin] = useState("");
  let [feelOne, setFeelOne] = useState(feelOne ? feelOne : "");
  let [feelTwo, setFeelTwo] = useState(feelTwo ? feelTwo : "");
  let [feelThree, setFeelThree] = useState(feelThree ? feelThree : "");
  let [temp, setTemp] = useState("");

  const checkinReset = () => {
    setCheckin("");
    setPhys(1);
    setMental(1);
    setOutlook(1);
    setFeelOne("");
    setFeelTwo("");
    setFeelThree("");
    setTemp("");
  };

  let sortedEntries = checkinStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedCheckin");

      let savedData = jsonValue ? JSON.parse(jsonValue) : [];

      setCheckinStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (checkinStorage) => {
    try {
      const jsonValue = JSON.stringify(checkinStorage);
      await AsyncStorage.setItem("storedCheckin", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let newCheckin = {
      id: orderId,
      time: `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
      check: "check",
      title: "Check-In",
      myThree: false,
      phys: phys,
      mental: mental,
      outlook: outlook,
      feelOne: feelOne,
      feelTwo: feelTwo,
      feelThree: feelThree,
      myCheckin: checkin,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...checkinStorage, newCheckin];

    setCheckinStorage(newList);
    checkinReset();
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of checkinStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setCheckinStorage(checkinStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    checkinStorage.splice(index, 1);
    // save deletion of item
    storeData(checkinStorage);
  };

  const errorCheck = () => {
    if (
      !feelOne.replace(/\s+/g, "") ||
      !feelTwo.replace(/\s+/g, "") ||
      !feelThree.replace(/\s+/g, "")
    ) {
      Alert.alert(
        "Entry Error",
        `Three words, and all fields except notes required.`,
        [{ text: "Got It" }]
      );
      return;
    } else {
      handleAdd();
    }
  };

  const setFeeling = (temp) => {
    !feelOne ? setFeelOne(temp) : null;
    feelOne && !feelTwo ? setFeelTwo(temp) : null;
    feelOne && feelTwo ? setFeelThree(temp) : null;
    setTemp("");
  };

  const handleBack = () => {
    const backOne = () => {
      setFeelOne("");
      setTemp("");
    };
    const backTwo = () => {
      setFeelTwo("");
      setTemp("");
    };
    const backThree = () => {
      setFeelThree("");
      setTemp("");
    };

    feelOne && !feelTwo && !feelThree ? backOne() : null;
    feelOne && feelTwo && !feelThree ? backTwo() : null;
    feelOne && feelTwo && feelThree ? backThree() : null;
  };

  const setOne = feelingWheel;
  const setTwo = feelOne ? feelingWheel : null;
  const setThree = feelTwo ? feelingWheel : null;

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
          <View style={look.border}>
            <View style={look.header}>
              <Text style={[look.add, { fontSize: 24 }]}>
                How are you feeling?
              </Text>
              <Text style={look.sub}>10 being best.</Text>
            </View>
            <View style={[look.sliderBox, look.checkMarginTop]}>
              <View style={look.subHeader}>
                <Text style={look.sub}>Physically</Text>
              </View>
              <Slider
                style={look.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={phys}
                onValueChange={setPhys}
                minimumTrackTintColor={"green"}
              />
              <View>
                <Text style={look.add}>{phys}</Text>
              </View>
            </View>
          </View>
          <View style={look.border}>
            <View style={[look.sliderBox, look.checkMarginTop]}>
              <View style={look.subHeader}>
                <Text style={look.sub}>Emotionally</Text>
              </View>
              <Slider
                style={look.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={mental}
                onValueChange={setMental}
                minimumTrackTintColor={"green"}
              />
              <View>
                <Text style={look.add}>{mental}</Text>
              </View>
            </View>
          </View>
          <View style={look.border}>
            <View style={[look.sliderBox, look.checkMarginTop]}>
              <View style={look.subHeader}>
                <Text style={look.sub}>Outlook</Text>
                {/* <Text style={look.sub}></Text> */}
              </View>
              <Slider
                style={look.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={outlook}
                onValueChange={setOutlook}
                minimumTrackTintColor={"green"}
              />
              <View>
                <Text style={look.add}>{outlook}</Text>
              </View>
            </View>
          </View>

          {/* -------------------------------------------------FEELWHEEL-------------------------- */}

          <View style={[look.border]}>
            {feelOne ? (
              <View style={look.checkWordHeader}>
                {feelOne ? <Text style={look.add}>{feelOne}</Text> : null}
                {feelThree ? <Text style={look.add}>{feelThree}</Text> : null}
                {feelTwo ? <Text style={look.add}>{feelTwo}</Text> : null}
              </View>
            ) : (
              <View style={look.checkWordHeader}>
                <Text style={look.add}>Pick three words.</Text>
              </View>
            )}
          </View>

          {!feelOne && !feelTwo && !feelThree ? (
            <View style={{ marginTop: "3%" }}>
              <Picker
                itemStyle={look.picker}
                mode="dialog"
                style={{ fontSize: 20, height: 100, color: "#D7D9D7" }}
                selectedValue={!temp ? setTemp(setOne[0]) : temp}
                onValueChange={(x) => {
                  setTemp(x);
                }}
              >
                {setOne.map((item) => (
                  <Picker.Item key={item} value={item} label={item} />
                ))}
              </Picker>
            </View>
          ) : null}
          {feelOne && !feelTwo && !feelThree ? (
            <View style={{ marginTop: "3%" }}>
              <Picker
                itemStyle={look.picker}
                mode="dropdown"
                selectedValue={!temp ? setTemp(setTwo[0]) : temp}
                onValueChange={(x) => {
                  setTemp(x);
                }}
              >
                {setTwo.map((item) => (
                  <Picker.Item
                    key={item}
                    value={item}
                    label={item}
                    style={look.picker}
                  />
                ))}
              </Picker>
            </View>
          ) : null}
          {feelOne && feelTwo && !feelThree ? (
            <View style={{ marginTop: "3%" }}>
              <Picker
                itemStyle={look.picker}
                selectedValue={!temp ? setTemp(setThree[0]) : temp}
                onValueChange={(x) => {
                  setTemp(x);
                }}
              >
                {setThree.map((item) => (
                  <Picker.Item key={item} value={item} label={item} />
                ))}
              </Picker>
            </View>
          ) : null}
          <View style={look.checkBoxButton}>
            {feelOne ? (
              <TouchableOpacity onPress={() => handleBack()}>
                <FontAwesome
                  name="chevron-circle-left"
                  style={[look.pickerIcon, { marginRight: "5%" }]}
                />
              </TouchableOpacity>
            ) : null}
            {feelThree ? null : (
              <TouchableOpacity onPress={() => setFeeling(temp)}>
                <FontAwesome
                  name="chevron-circle-right"
                  style={[look.pickerIcon]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[look.header, { marginBottom: 5 }]}>
            <Text style={look.add}>
              Is there anything else you want to say about how you're feeling
              right now?
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(t) => setCheckin(t)}
            value={checkin}
            placeholder={"enter text here..."}
            placeholderTextColor={color.placeholderText}
            multiline
            keyboardType="default"
          />
          <TouchableOpacity style={look.border} onPress={() => errorCheck()}>
            <MaterialIcons
              style={[look.icon, look.centerIcon, { paddingBottom: 15 }]}
              name="add-circle"
            />
          </TouchableOpacity>
          <View>
            {sortedEntries.map((item) => (
              <View key={item.id} style={look.border}>
                <View style={look.elementHeader}>
                  <TouchableOpacity onPress={() => handleDelete({ item })}>
                    <MaterialIcons
                      style={[look.icon, look.canIcon]}
                      name="delete-forever"
                    />
                  </TouchableOpacity>
                  <Text style={look.sub}>
                    {item.time} - {item.date}
                  </Text>
                </View>
                <View style={look.elementHeader}>
                  <View>
                    <Text style={look.sub}>Physical : {item.phys}</Text>
                    <Text style={look.add}>{item.feelOne}</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={look.sub}>Emotional : {item.mental}</Text>
                    <Text style={look.add}>{item.feelTwo}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={look.sub}>Outlook : {item.outlook}</Text>
                    <Text style={look.add}>{item.feelThree}</Text>
                  </View>
                </View>
                <View style={look.element}>
                  {item.myCheckin ? (
                    <Text style={look.add}>{item.myCheckin}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { CheckIn };
