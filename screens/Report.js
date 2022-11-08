import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { CheckVal, Entries } from "./reportFunctions";

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
      // console.log("copeValue in get data: ", copeData);
      let checkData = checkValue ? JSON.parse(checkValue) : [];
      let focusData = focusValue ? JSON.parse(focusValue) : [];
      let piesData = piesValue ? JSON.parse(piesValue) : [];
      let goodData = goodValue ? JSON.parse(goodValue) : [];
      let badData = badValue ? JSON.parse(badValue) : [];
      let valueData = valueValue ? JSON.parse(valueValue) : [];
      let selfData = selfTalkValue ? JSON.parse(selfTalkValue) : [];
      console.log("selfTalkValue in get data: ", selfData);
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

  // let rando = Math.random().toString(36).slice(2);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <ScrollView>
        <View style={look.topBox}>
          <View style={look.header}>
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
                    ? [look.reportButton, look.reportSelected]
                    : look.reportButton
                }
              >
                Full Report
              </Text>
            </TouchableOpacity>
          </View>
          <View style={look.header}>
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
                    ? [look.reportButton, look.reportSelected]
                    : look.reportButton
                }
              >
                Check-Ins
              </Text>
            </TouchableOpacity>
          </View>
          <View style={look.header}>
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
                    ? [look.reportButton, look.reportSelected]
                    : look.reportButton
                }
              >
                Flags
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[look.header, look.border]}>
            <TouchableOpacity
              style={{ marginBottom: "5%" }}
              onPress={() => {}}
              delayPressIn={150}
            >
              <Text style={look.reportButton}>Share Your Week</Text>
            </TouchableOpacity>
          </View>
          <View>
            {reportStorage ? (
              <View>
                {showFull
                  ? fullReport.map((item, i) => (
                      <View key={i}>
                        {Entries(item)}
                        {console.log("in full : ", i)}
                      </View>
                    ))
                  : null}
                {showChecks
                  ? fullChecks.map((item, i) => (
                      <View key={i}>{CheckVal(item)}</View>
                    ))
                  : null}
                {showFlags
                  ? fullFlags.map((item, i) => (
                      <View key={i}>{Entries(item)}</View>
                    ))
                  : null}
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { Report };
