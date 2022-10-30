import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { handleFace, feelingWheel } from "./feelingwheelOptions";
import Slider from "@react-native-community/slider";
import WheelPicker from "react-native-wheely";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckIn = () => {
  let [checkinStorage, setCheckinStorage] = useState(
    checkinStorage ? checkinStorage : []
  );
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );
  let [face, setFace] = useState(4);
  let [checkin, setCheckin] = useState("");
  let [feelOne, setFeelOne] = useState(feelOne ? feelOne : "");
  let [feelTwo, setFeelTwo] = useState(feelTwo ? feelTwo : "");
  let [feelThree, setFeelThree] = useState(feelThree ? feelThree : "");
  let [temp, setTemp] = useState(0);

  let sortedEntries = checkinStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedCheckin");
      const savedReportJson = await AsyncStorage.getItem("reportArray");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      let savedReportData = savedReportJson ? JSON.parse(savedReportJson) : [];
      setCheckinStorage(savedData);
      setReportStorage(savedReportData);
      console.log("check:", checkinStorage);
      console.log("report", reportStorage);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (checkinStorage) => {
    try {
      const jsonValue = JSON.stringify(checkinStorage);
      await AsyncStorage.setItem("storedCheckin", jsonValue);
      await AsyncStorage.setItem("reportArray", jsonValue);
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
    let saveFace = handleFace();

    let newCheckin = {
      id: orderId,
      face: saveFace,
      feelOne: feelOne,
      feelTwo: feelTwo,
      feelThree: feelThree,
      myCheckin: checkin,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...checkinStorage, newCheckin];

    setCheckinStorage(newList);
    setReportStorage(newList);
    setCheckin("");
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
    let wordCount = checkin.split(/\S+/).length - 1;
    let wordsLeft = 3 - wordCount;

    if (!checkin.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    }
    if (wordCount < 3) {
      Alert.alert(
        "Entry Error",
        `${
          wordsLeft === 1
            ? `One more word. You can do it.`
            : `Two more words. You can do it`
        }`,
        [{ text: "Got It" }]
      );
      return;
    } else {
      handleAdd();
    }
  };

  const setFeeling = (temp) => {
    !feelOne ? setFeelOne(setOne[temp]) : null;
    feelOne && !feelTwo ? setFeelTwo(setTwo[temp]) : null;
    feelOne && feelTwo ? setFeelThree(setThree[temp]) : null;
    setTemp(0);
  };

  const handleBack = () => {
    feelOne && !feelTwo && !feelThree ? setFeelOne(0) : null;
    feelOne && feelTwo && !feelThree ? setFeelTwo(0) : null;
    feelOne && feelTwo && feelThree ? setFeelThree(0) : null;
    setTemp(0);
  };

  const setOne = !feelOne ? Object.keys(feelingWheel[0]) : null;
  const setTwo =
    feelOne && !feelTwo ? Object.keys(feelingWheel[0][feelOne]) : null;
  const setThree =
    feelOne && feelTwo ? [...feelingWheel[0][feelOne][feelTwo]] : null;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstBox}>
        <Text style={styles.add}>How are you feeling?</Text>
        <Text style={styles.face}>{handleFace(face)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={7}
          step={1}
          value={face ? face : 4}
          onValueChange={setFace}
          minimumTrackTintColor={"#D7D9D7"}
        />
      </View>

      {/* -------------------------------------------------FEELWHEEL-------------------------- */}

      <View style={styles.feelWheelContainer}>
        <View style={styles.feelChoiceDisplayCase}>
          <View style={styles.feelChoiceDisplay}>
            {!feelOne ? <Text style={styles.display}> </Text> : null}
            {feelOne ? <Text style={styles.display}>{feelOne}</Text> : null}
            {feelTwo ? <Text style={styles.display}>{feelTwo}</Text> : null}
            {feelThree ? <Text style={styles.display}>{feelThree}</Text> : null}
          </View>
        </View>
        <View style={styles.pickerBoxCase}>
          <View style={styles.pickerBox}>
            {!feelOne && !feelTwo && !feelThree ? (
              <WheelPicker
                visibleRest={1}
                itemStyle={styles.pickerItem}
                itemTextStyle={styles.picker}
                selectedIndex={temp}
                options={setOne}
                onChange={(x) => {
                  setTemp(x);
                }}
              />
            ) : null}

            {feelOne && !feelTwo && !feelThree ? (
              <WheelPicker
                visibleRest={1}
                itemStyle={styles.pickerItem}
                itemTextStyle={styles.picker}
                selectedIndex={temp}
                options={setTwo}
                onChange={(x) => {
                  setTemp(x);
                }}
              />
            ) : null}
            {feelOne && feelTwo && !feelThree ? (
              <WheelPicker
                itemStyle={styles.pickerItem}
                visibleRest={1}
                itemTextStyle={styles.picker}
                selectedIndex={temp}
                options={setThree}
                onChange={(x) => {
                  setTemp(x);
                }}
              />
            ) : null}
            <View style={styles.buttonBox}>
              {feelOne ? (
                <TouchableOpacity onPress={() => handleBack()}>
                  <FontAwesome
                    name="chevron-circle-left"
                    style={[styles.nextButton, { marginRight: "5%" }]}
                  />
                </TouchableOpacity>
              ) : null}
              {feelThree ? null : (
                <TouchableOpacity onPress={() => setFeeling(temp)}>
                  <FontAwesome
                    name="chevron-circle-right"
                    style={[styles.nextButton, { marginLeft: "5%" }]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
      <KeyboardAwareScrollView extraHeight={250}>
        <Text style={[styles.add, { paddingBottom: 0 }]}>
          Anything else you want to say about how you are feeling?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(t) => setCheckin(t)}
          value={checkin}
          placeholder={"enter text"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {sortedEntries.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.displayCase}>
                <View style={styles.feelChoiceDisplay}>
                  <Text style={styles.display}>{feelOne}</Text>
                  <Text style={styles.display}>{feelTwo}</Text>
                  <Text style={styles.display}>{feelThree}</Text>
                </View>
                <Text style={styles.add}>
                  {item.face} {item.myCheckin}
                </Text>
              </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 25,
    backgroundColor: "#1B2A41",
  },
  add: {
    marginTop: 21,
    width: "85%",
    left: "8%",
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "2.5%",
    borderColor: "#D7D9D7",
  },
  slider: {
    // borderWidth: 3,
    // borderColor: "red",
    marginTop: 20,
    width: "80%",
    left: "10%",
    fontSize: 25,
    fontWeight: "bold",
  },
  face: {
    // borderWidth: 3,
    // borderColor: "blue",
    marginTop: 10,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 60,
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "80%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  date: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    left: "45%",
    fontSize: 30,
    color: "#D7D9D7",
  },
  feelChoiceDisplayCase: {
    justifyContent: "center",
    flexDirection: "row",
  },
  feelChoiceDisplay: {
    marginTop: 7,
    width: "90%",
    justifyContent: "center",
    flexDirection: "row",
  },
  display: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  nextButton: {
    fontSize: 40,
    color: "#D7D9D7",
  },
  pickerBox: {
    width: "90%",
  },
  pickerBoxCase: {
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 3,
    // borderColor: "gold",
  },
  feelWheelContainer: {},
  buttonBox: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderBox: {
    flex: 1.5,
    width: "95%",
    left: "2.5%",
  },
  pickerItem: {
    backgroundColor: "#1B2A41",
  },
  picker: {
    height: 75,
    color: "#D7D9D7",
    fontSize: 40,
  },
  displayCase: {
    alignItems: "center",
  },
});

export { CheckIn };
