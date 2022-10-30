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
// import WheelPicker from "react-native-wheely";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
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
  let [temp, setTemp] = useState("");

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
      console.log("check: ", checkinStorage);
      console.log("report ", reportStorage);
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
    let saveFace = handleFace(face);

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
    // console.log("setOne : " + setOne);
    console.log("temp: ", temp);
    !feelOne ? setFeelOne(temp) : null;
    feelOne && !feelTwo ? setFeelTwo(temp) : null;
    feelOne && feelTwo ? setFeelThree(temp) : null;
    setTemp("");
  };

  const handleBack = () => {
    feelOne && !feelTwo && !feelThree
      ? () => {
          setFeelOne(null);
          // setTemp(setOne[0]);
        }
      : null;
    feelOne && feelTwo && !feelThree
      ? () => {
          setFeelTwo(null);
          // setTemp(setOne[0]);
        }
      : null;
    feelOne && feelTwo && feelThree
      ? () => {
          console.log("hit 3 - ", feelThree, temp);
          setFeelThree(null);
          // setTemp(setTwo[0]);
        }
      : null;
  };

  const setOne = Object.keys(feelingWheel[0]);
  const setTwo = feelOne ? Object.keys(feelingWheel[0][feelOne]) : null;
  const setThree = feelTwo ? [...feelingWheel[0][feelOne][feelTwo]] : null;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={250}>
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

          {/* -------------------------------------------------FEELWHEEL-------------------------- */}
          <View style={[styles.pieContainer, { borderWidth: 0 }]}>
            <View style={styles.feelChoiceDisplayCase}>
              {feelOne ? (
                <View style={{ flexDirection: "row" }}>
                  {feelOne ? (
                    <Text style={styles.display}>{feelOne}</Text>
                  ) : null}
                  {feelTwo ? (
                    <Text style={styles.display}>{feelTwo}</Text>
                  ) : null}
                  {feelThree ? (
                    <Text style={styles.display}>{feelThree}</Text>
                  ) : null}
                </View>
              ) : null}
            </View>
            <View style={styles.pickerBoxCase}>
              <View style={styles.pickerBox}>
                {!feelOne && !feelTwo && !feelThree ? (
                  <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={!temp ? setTemp(setOne[0]) : temp}
                    onValueChange={(x) => {
                      setTemp(x);
                    }}
                  >
                    {setOne.map((item) => (
                      <Picker.Item key={item} value={item} label={item} />
                    ))}
                  </Picker>
                ) : null}

                {feelOne && !feelTwo && !feelThree ? (
                  <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={!temp ? setTemp(setTwo[0]) : temp}
                    onValueChange={(x) => {
                      setTemp(x);
                    }}
                  >
                    {setTwo.map((item) => (
                      <Picker.Item key={item} value={item} label={item} />
                    ))}
                  </Picker>
                ) : null}
                {feelOne && feelTwo && !feelThree ? (
                  <Picker
                    itemStyle={styles.pickerItem}
                    selectedValue={!temp ? setTemp(setThree[0]) : temp}
                    onValueChange={(x) => {
                      setTemp(x);
                    }}
                  >
                    {setThree.map((item) => (
                      <Picker.Item key={item} value={item} label={item} />
                    ))}
                  </Picker>
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
                  {feelThree ? null : ( // <View style={[styles.nextButton, { marginLeft: "5%" }]} />
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
          <Text style={[styles.add, { paddingBottom: 0, fontSize: 18 }]}>
            Is there anything else you want to say about how you are feeling?
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
                <Text style={styles.face}>{item.face}</Text>
                <View style={styles.displayCase}>
                  <View style={styles.feelChoiceDisplay}>
                    <Text style={styles.display}>{item.feelOne}</Text>
                    <Text style={styles.display}>{item.feelTwo}</Text>
                    <Text style={styles.display}>{item.feelThree}</Text>
                  </View>
                  <Text style={styles.add}>
                    {item.face} {item.myCheckin}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete({ item })}>
                  <MaterialIcons style={styles.icon} name="delete-forever" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: "#1B2A41",
  },
  firstBox: {
    width: "90%",
    left: "5%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  add: {
    marginTop: 21,
    // width: "85%",
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
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    // width: "90%",
    textAlign: "center",
    borderColor: "#D7D9D7",
  },
  slider: {
    marginTop: 20,
    width: "80%",
    // left: "10%",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  face: {
    marginTop: 10,
    // width: "85%",
    // left: "10%",
    textAlign: "center",
    // justifyContent: "flex-end",
    fontSize: 40,
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 40,
    color: "#D7D9D7",
    // width: "85%",
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "90%",
    marginTop: 21,
    textAlign: "center",
    // justifyContent: "center",
    padding: 10,
    // left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  date: {
    marginTop: 5,
    // width: "85%",
    // left: "5%",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  feelChoiceDisplayCase: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  feelChoiceDisplay: {
    // marginTop: 7,
    // width: "90%",
    // justifyContent: "center",
    flexDirection: "row",
  },
  display: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  nextButton: {
    // width: "85%",
    fontSize: 40,
    color: "#D7D9D7",
    textAlign: "center",
    // borderWidth: 3,
    // borderColor: "blue",
  },
  pickerBox: {
    width: "90%",
  },
  pickerBoxCase: {
    // width: "90%",
    textAlign: "center",
    // justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 3,
    // borderColor: "gold",
  },

  buttonBox: {
    // width: "85%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderBox: {
    // flex: 1.5,
    // width: "95%",
    // left: "2.5%",
  },
  pickerItem: {
    height: 90,
    color: "#D7D9D7",
    fontSize: 40,
    backgroundColor: "#1B2A41",
  },
  picker: {
    height: 90,
    color: "#D7D9D7",
    fontSize: 40,
  },
});

export { CheckIn };
