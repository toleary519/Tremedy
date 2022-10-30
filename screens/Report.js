import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Report = () => {
  let [showFull, setShowFull] = useState(true);
  let [showChecks, setShowChecks] = useState(false);
  let [showFlags, setShowFlags] = useState(false);
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );

  const getData = async () => {
    try {
      const copeValue = await AsyncStorage.getItem("storedCoping");
      const checkValue = await AsyncStorage.getItem("storedCheckin");
      const focusValue = await AsyncStorage.getItem("storedFocus");
      const piesValue = await AsyncStorage.getItem("storedPie");
      const goodValue = await AsyncStorage.getItem("storedGood");
      const badValue = await AsyncStorage.getItem("storedBad");
      const valueValue = await AsyncStorage.getItem("storedValues");
      const selfTalkValue = await AsyncStorage.getItem("storedSelfTalk");
      let copeData = copeValue ? JSON.parse(copeValue) : [];
      let checkData = checkValue ? JSON.parse(checkValue) : [];
      let focusData = focusValue ? JSON.parse(focusValue) : [];
      let piesData = piesValue ? JSON.parse(piesValue) : [];
      let goodData = goodValue ? JSON.parse(goodValue) : [];
      let badData = badValue ? JSON.parse(badValue) : [];
      let valueData = valueValue ? JSON.parse(valueValue) : [];
      let selfData = selfTalkValue ? JSON.parse(selfTalkValue) : [];
      setReportStorage([
        ...copeData,
        ...checkData,
        ...focusData,
        ...piesData,
        ...goodData,
        ...badData,
        ...selfData,
        ...valueData,
      ]);
      console.log("inside Report getData", reportStorage);
    } catch (e) {
      console.log(e);
    }
  };

  let currentDate = new Date().getTime();
  let weekAgo = currentDate - 7 * 24 * 60 * 60 * 1000;

  let fullReport = reportStorage
    .filter((x) => (x.id >= weekAgo && x.flag) || x.face)
    .sort((a, b) => {
      return b.id - a.id;
    });

  let fullChecks = fullReport
    .filter((x) => !x.flag && x.face)
    .sort((a, b) => {
      return b.id - a.id;
    });

  // you could add && x.flagged
  let fullFlags = fullReport
    .filter((x) => !x.face && x.flag)
    .sort((a, b) => {
      return b.id - a.id;
    });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.buttonNav}>
          <TouchableOpacity
            onPress={() => {
              setShowFull(true);
              setShowChecks(false);
              setShowFlags(false);
            }}
            delayPressIn={150}
          >
            <Text
              style={
                showFull
                  ? [styles.menuButton, styles.selectedButton]
                  : styles.menuButton
              }
            >
              Full Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFull(false);
              setShowChecks(true);
              setShowFlags(false);
            }}
            delayPressIn={150}
          >
            <Text
              style={
                showChecks
                  ? [styles.menuButton, styles.selectedButton]
                  : styles.menuButton
              }
            >
              Check-Ins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFull(false);
              setShowChecks(false);
              setShowFlags(true);
            }}
            delayPressIn={150}
          >
            <Text
              style={
                showFlags
                  ? [styles.menuButton, styles.selectedButton]
                  : styles.menuButton
              }
            >
              Flags
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} delayPressIn={150}>
            <Text style={styles.menuButton}>Share Your Week</Text>
          </TouchableOpacity>
        </View>
        {reportStorage ? (
          <View style={{ marginTop: 7 }}>
            {showFull
              ? fullReport.map((item) => (
                  <View style={styles.displayBlock}>
                    <View key={item.id} style={styles.pieContainer}>
                      <Text style={[styles.add, { fontSize: 15 }]}>
                        {item.date}
                      </Text>
                      <Text
                        style={[
                          styles.add,
                          { paddingRight: 10, paddingLeft: 10 },
                        ]}
                      >
                        {item.face ? item.face : null}
                        {item.feelOne ? (
                          <View style={styles.feelChoiceDisplayCase}>
                            <View style={styles.feelChoiceDisplay}>
                              <Text style={styles.display}>{item.feelOne}</Text>
                              <Text style={styles.display}>{item.feelTwo}</Text>
                              <Text style={styles.display}>
                                {item.feelThree}
                              </Text>
                            </View>
                          </View>
                        ) : null}
                      </Text>
                      <Text style={styles.add}>
                        {item.myCheckin ? item.myCheckin : null}
                        {item.myCoping ? item.myCoping : null}
                        {item.myFocus ? item.myFocus : null}
                        {item.myBad ? item.myBad : null}
                        {item.myGood ? item.myGood : null}
                        {item.myValue ? item.myValue : null}
                      </Text>
                      {item.physical ? (
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.add}>P: {item.physical}</Text>
                          <Text style={styles.add}>I: {item.insights}</Text>
                          <Text style={styles.add}>E: {item.emotions}</Text>
                          <Text style={styles.add}>S: {item.spiritual}</Text>
                        </View>
                      ) : null}
                      {item.initial ? (
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.add}>Initial Thought:</Text>
                          <Text style={styles.add}>{item.initial}</Text>
                          <Text style={styles.add}>Rational Thought:</Text>
                          <Text style={styles.add}>{item.rational}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ))
              : null}
            {showChecks
              ? fullChecks.map((item) => (
                  <View key={item.id} style={styles.pieContainer}>
                    <Text style={[styles.add, { fontSize: 15 }]}>
                      {item.date}
                    </Text>
                    <Text
                      style={[
                        styles.add,
                        { paddingRight: 10, paddingLeft: 10 },
                      ]}
                    >
                      {item.face ? item.face : null}
                    </Text>
                    <Text style={styles.add}>
                      {item.myCheckin ? item.myCheckin : null}
                    </Text>
                  </View>
                ))
              : null}
            {showFlags
              ? fullFlags.map((item) => (
                  <View key={item.id} style={styles.pieContainer}>
                    <Text style={[styles.add, { fontSize: 15 }]}>
                      {item.date}
                    </Text>
                    <Text style={styles.add}>
                      {item.myCheckin ? item.myCheckin : null}
                      {item.myCoping ? item.myCoping : null}
                      {item.myFocus ? item.myFocus : null}
                      {item.myBad ? item.myBad : null}
                      {item.myGood ? item.myGood : null}
                      {item.myValue ? item.myValue : null}
                    </Text>
                    {item.physical ? (
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.add}>P: {item.physical}</Text>
                        <Text style={styles.add}>I: {item.insights}</Text>
                        <Text style={styles.add}>E: {item.emotions}</Text>
                        <Text style={styles.add}>S: {item.spiritual}</Text>
                      </View>
                    ) : null}
                    {item.initial ? (
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.add}>- Initial Thought -</Text>
                        <Text style={styles.add}>{item.initial}</Text>
                        <Text style={styles.add}>- Rational Thought -</Text>
                        <Text style={styles.add}>{item.rational}</Text>
                      </View>
                    ) : null}
                  </View>
                ))
              : null}
          </View>
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
    flexDirection: "column",
  },
  add: {
    margin: 5,
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  buttonNav: {
    marginRight: 5,
    marginLeft: 5,
    width: "90%",
    left: "3%",
  },
  menuButton: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#D7D9D7",
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5,
    textAlign: "center",
    padding: 4,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  selectedButton: {
    overflow: "hidden",
    borderColor: "#F4743B",
    backgroundColor: "#D2EAEB",
    color: "#1B2A41",
  },
  displayBlock: {
    alignItems: "center",
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 7,
    width: "90%",
    // left: "5%",
    borderColor: "#D7D9D7",
  },
  feelChoiceDisplayCase: {
    // justifyContent: "center",
    // flexDirection: "row",
  },
  feelChoiceDisplay: {
    marginTop: 7,
    width: "90%",
    // justifyContent: "center",
    flexDirection: "row",
  },
  display: {
    paddingHorizontal: 3,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { Report };
