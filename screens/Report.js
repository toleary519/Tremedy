import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { look } from "../assets/styles";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { CheckVal, Entries } from "../helpers/reportFunctions";
import { emailEntries } from "../helpers/htmlEmails";

const Report = () => {
  let [showFull, setShowFull] = useState(true);
  let [showChecks, setShowChecks] = useState(false);
  let [showFlags, setShowFlags] = useState(false);
  const [token, setToken] = useState(token ? token : {});
  const [myThree, setMyThree] = useState([]);
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
      const cravingValue = await AsyncStorage.getItem("storedCraving");
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
      let craveData = cravingValue ? JSON.parse(cravingValue) : [];
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
        ...craveData,
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = ({ item }) => {
    let newList = [...myThree, { ...item, myThree: true }];
    setMyThree(newList);
  };

  const handleRemove = ({ item }) => {
    setMyThree(myThree.filter((x) => x.id !== item.id));
  };

  const verify = ({ item }) => {
    for (let x of myThree) {
      if (x.id === item.id) {
        return x.myThree;
      }
    }
    return false;
  };
  // const threeCheck = (i) => {
  //     for (let entry of myThree) {
  //       if (entry.index === i) {
  //         return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  console.log("myThree : ", myThree);

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
      <style>
      .bg {
        display: flex;
        justify-content: flex-start;
        height: 100%;
        width: 100%;
        flex-direction: column;
        background-color: #1B2A41;
        font-family: roboto, arial, sans-serif;
      }
      .topBox {
        justify-content: flex-start;
        margin-left: 5%;
      }
      .add {
        margin-right: 5%;
        font-size: 18;
        font-weight: bold;
        color: #D7D9D7;
      }
      .title {
        padding-top: 10%;
        font-size: 25;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: 5%;
        bottom-border: 3px solid #3C5E90;
      }
      .subTitle {
        padding-top: 10%;
        font-size: 20;
        opacity: 0.7;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: 5%;
        
      }
      .sub {
        margin-right: 5%;
        margin-bottom: 1%;
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: #D7D9D7;
      }
      .QAbox {
        width: 75%;
        height: 20%;
        padding-top: 4%;
        border-bottom: 3px solid #3C5E90
      }
      .statBox {
        display: flex;
        flex-direction: row;
        padding-top: 4%;
        border-bottom: 3px solid #3C5E90
      }
      .row {
        display: flex;
        flex-direction: row;
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      </style>
      </head>
      <div class="bg">
        <div class="title">"My Three" from ${token.name}</div>
        <div class="subTitle">Compiled on ${currentMonth}/${currentDay}.</div>
        <div class="topBox">
          <div class="statBox">
            <div class="add">STSTSTTSTSTSTS</div>
            <div class="add">STATSTSTSTTSSTSTS</div>
          </div>
          <div class="column">
          ${emailEntries(myThree)}
          </div>
        </div>
      </div>
      </container>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "15%" }}
      >
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
                      <View key={i}>
                        {Entries(item)}
                        {verify({ item }) ? (
                          <TouchableOpacity
                            onPress={() => handleRemove({ item })}
                          >
                            <Feather
                              name="check-circle"
                              style={look.inRoutine}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={() => handleAdd({ item })}>
                            <Feather name="plus" style={look.outRoutine} />
                          </TouchableOpacity>
                        )}
                      </View>
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
