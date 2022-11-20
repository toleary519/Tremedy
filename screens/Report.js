import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { CheckVal, Entries } from "./reportFunctions";
import { checkEmail, emailEntries, emailStyle } from "./htmlEmails";

const Report = () => {
  let [showFull, setShowFull] = useState(true);
  let [showChecks, setShowChecks] = useState(false);
  let [showFlags, setShowFlags] = useState(false);
  const [token, setToken] = useState(token ? token : {});
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );
  const getData = async () => {
    try {
      const jsonTokValue = await AsyncStorage.getItem("storedUser");
      const copeValue = await AsyncStorage.getItem("storedCoping");
      const checkValue = await AsyncStorage.getItem("storedCheckin");
      const focusValue = await AsyncStorage.getItem("storedFocus");
      const piesValue = await AsyncStorage.getItem("storedPie");
      const goodValue = await AsyncStorage.getItem("storedGood");
      const badValue = await AsyncStorage.getItem("storedBad");
      const valueValue = await AsyncStorage.getItem("storedValues");
      const selfTalkValue = await AsyncStorage.getItem("storedSelfTalk");
      const thatValue = await AsyncStorage.getItem("storedThat");
      let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
      let copeData = copeValue ? JSON.parse(copeValue) : [];
      let checkData = checkValue ? JSON.parse(checkValue) : [];
      let focusData = focusValue ? JSON.parse(focusValue) : [];
      let piesData = piesValue ? JSON.parse(piesValue) : [];
      let goodData = goodValue ? JSON.parse(goodValue) : [];
      let badData = badValue ? JSON.parse(badValue) : [];
      let valueData = valueValue ? JSON.parse(valueValue) : [];
      let selfData = selfTalkValue ? JSON.parse(selfTalkValue) : [];
      let thatData = thatValue ? JSON.parse(thatValue) : [];
      setToken(savedTokData);
      setReportStorage([
        ...copeData,
        ...checkData,
        ...focusData,
        ...piesData,
        ...goodData,
        ...badData,
        ...selfData,
        ...valueData,
        ...thatData,
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  let dayCount = token.rLength ? token.rLength * 7 : 7;
  let currentDate = new Date().getTime();
  let weekAgo = currentDate - dayCount * 24 * 60 * 60 * 1000;

  let fullReport = reportStorage
    .filter((x) => (x.id >= weekAgo && x.flag) || x.check)
    .sort((a, b) => {
      return b.id - a.id;
    });
  let fullChecks = fullReport
    .filter((x) => !x.flag && x.check)
    .sort((a, b) => {
      return b.id - a.id;
    });

  // you could add && x.flagged
  let fullFlags = fullReport
    .filter((x) => !x.check && x.flag)
    .sort((a, b) => {
      return b.id - a.id;
    });

  const sendReportMail = async () => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    const { uri } = await Print.printToFileAsync({
      html: `
      <html>
      <head>
      ${emailStyle()}
      </head>
      <div class="reportBg">
      ${
        showFull
          ? fullReport.map((item, i) => `<div>${emailEntries(item, i)}</div>`)
          : null
      }
      </div>
      </html>
      `,
    });

    MailComposer.composeAsync({
      subject: `Ourtre Report : ${token.name}`,
      body: `Find the PDF of your Ourtre report attached below.\n
      This report contains entries from *oldDate* to ${currentMonth}/${currentDay}. 
      \n
      Please select who you send your report to carefully. If you would like to shorten your report into a more concise document please review your flags and see if you have double counted things you would like to review with your therapist.\n
      We recommend trying to keep your report to one or two pages as to have a direct focus in your sessions.\n 
      Thanks,
      Ourtre Team`,
      recipients: "t.oleary@me.com",
      attachments: uri,
    });
  };

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
              onPress={() => {
                sendReportMail();
              }}
              delayPressIn={150}
            >
              <Text style={look.reportButton}>Email Report</Text>
            </TouchableOpacity>
          </View>
          <View>
            {reportStorage ? (
              <View>
                {showFull
                  ? fullReport.map((item, i) => (
                      <View key={i}>
                        {item.check ? CheckVal(item) : Entries(item)}
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
