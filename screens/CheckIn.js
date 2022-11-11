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
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const CheckIn = () => {
  let [checkinStorage, setCheckinStorage] = useState(
    checkinStorage ? checkinStorage : []
  );
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );
  // let [face, setFace] = useState(4);
  let [phys, setPhys] = useState(1);
  let [mental, setMental] = useState(1);
  let [outlook, setOutlook] = useState(1);
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

    let newCheckin = {
      id: orderId,
      check: "check",
      title: "Check-In",
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
    setReportStorage(newList);
    setCheckin("");
    storeData(newList);
    getData();
    console.log("in handle add: ", newCheckin);
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

  // const errorCheck = () => {
  //   let wordCount = checkin.split(/\S+/).length - 1;
  //   let wordsLeft = 3 - wordCount;

  //   if (!checkin.replace(/\s+/g, "")) {
  //     Alert.alert("Entry Error", `Fill out all fields to submit.`, [
  //       { text: "Got It" },
  //     ]);
  //     return;
  //   }
  //   // if (wordCount < 3) {
  //   //   Alert.alert(
  //   //     "Entry Error",
  //   //     `${
  //   //       wordsLeft === 1
  //   //         ? `One more word. You can do it.`
  //   //         : `Two more words. You can do it`
  //   //     }`,
  //   //     [{ text: "Got It" }]
  //   //   );
  //   //   return;
  //   // } else {
  //     handleAdd();
  //   }
  // };

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

  const setOne = Object.keys(feelingWheel[0]);
  const setTwo = feelOne ? Object.keys(feelingWheel[0][feelOne]) : null;
  const setThree = feelTwo ? [...feelingWheel[0][feelOne][feelTwo]] : null;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView extraHeight={250}>
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

          <View style={look.checkWordHeader}>
            {feelOne ? (
              <View style={look.header}>
                {feelOne ? <Text style={look.add}>{feelOne}</Text> : null}
                {feelTwo ? <Text style={look.add}>{feelTwo}</Text> : null}
                {feelThree ? <Text style={look.add}>{feelThree}</Text> : null}
              </View>
            ) : (
              <Text style={look.add}>Pick three words.</Text>
            )}
          </View>

          <View style={look.picker}>
            {!feelOne && !feelTwo && !feelThree ? (
              <Picker
                itemStyle={{ fontSize: 20, height: 50, color: "#D7D9D7" }}
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
          </View>
          <View style={look.picker}>
            {feelOne && !feelTwo && !feelThree ? (
              <Picker
                itemStyle={{ fontSize: 20, height: 50, color: "#D7D9D7" }}
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
            ) : null}
          </View>
          <View style={look.picker}>
            {feelOne && feelTwo && !feelThree ? (
              <Picker
                itemStyle={{ fontSize: 20, height: 50, color: "#D7D9D7" }}
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
          </View>
          <View style={look.checkBoxButton}>
            {feelOne ? (
              <TouchableOpacity onPress={() => handleBack()}>
                <FontAwesome
                  name="chevron-circle-left"
                  style={[look.icon, { marginRight: "5%" }]}
                />
              </TouchableOpacity>
            ) : null}
            {feelThree ? null : (
              <TouchableOpacity onPress={() => setFeeling(temp)}>
                <FontAwesome name="chevron-circle-right" style={[look.icon]} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[look.header, { marginBottom: 5 }]}>
            <Text style={look.add}>
              Is there anything else you want to say about how you are feeling?
            </Text>
          </View>
          <TextInput
            style={look.input}
            onChangeText={(t) => setCheckin(t)}
            value={checkin}
            placeholder={"..."}
            multiline
            keyboardType="default"
          />
          <TouchableOpacity style={look.border} onPress={() => handleAdd()}>
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
                  <Text style={look.sub}>{item.date}</Text>
                </View>
                <View style={look.elementHeader}>
                  <Text style={look.sub}>Physical : {phys}</Text>
                  <Text style={look.sub}>Emotional : {mental}</Text>
                  <Text style={look.sub}>Outlook : {outlook}</Text>
                </View>
                <View style={look.elementHeader}>
                  <Text style={look.add}>{item.feelOne}</Text>
                  <Text style={look.add}>{item.feelTwo}</Text>
                  <Text style={look.add}>{item.feelThree}</Text>
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

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 10,
  //   paddingBottom: 25,
  //   backgroundColor: "#1B2A41",
  // },
  // firstBox: {
  //   width: "90%",
  //   left: "5%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   textAlign: "center",
  // },
  // add: {
  //   marginTop: 21,
  //   textAlign: "center",
  //   padding: 10,
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // pieContainer: {
  //   borderRadius: 10,
  //   borderWidth: 4,
  //   marginTop: 7,
  //   marginBottom: 7,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   textAlign: "center",
  //   borderColor: "#D7D9D7",
  // },
  // slider: {
  //   marginTop: 20,
  //   width: "80%",
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // face: {
  //   marginTop: 10,
  //   textAlign: "center",
  //   fontSize: 40,
  // },
  // icon: {
  //   paddingTop: 20,
  //   paddingBottom: 20,
  //   fontSize: 40,
  //   color: "#D7D9D7",
  //   textAlign: "center",
  // },
  // input: {
  //   borderRadius: 10,
  //   borderWidth: 4,
  //   borderColor: "#D7D9D7",
  //   width: "90%",
  //   marginTop: 21,
  //   textAlign: "center",
  //   padding: 10,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#2f8587",
  // },
  // date: {
  //   marginTop: 5,
  //   textAlign: "center",
  //   padding: 10,
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // feelChoiceDisplayCase: {
  //   marginTop: 10,
  //   justifyContent: "center",
  //   flexDirection: "row",
  // },
  // feelChoiceDisplay: {
  //   flexDirection: "row",
  // },
  // display: {
  //   padding: 10,
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },
  // nextButton: {
  //   fontSize: 40,
  //   color: "#D7D9D7",
  //   textAlign: "center",
  // },
  // pickerBox: {
  //   width: "90%",
  // },
  // pickerBoxCase: {
  //   textAlign: "center",
  //   flexDirection: "row",
  // },
  // buttonBox: {
  //   marginTop: 20,
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  // pickerItem: {
  //   height: 90,
  //   color: "#D7D9D7",
  //   fontSize: 40,
  //   backgroundColor: "#1B2A41",
  // },
  // picker: {
  //   height: 90,
  //   color: "#D7D9D7",
  //   fontSize: 40,
  // },
});

export { CheckIn };
