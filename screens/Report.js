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

  let threeAlert = () => {
    Alert.alert(
      `Focus Report Full`,
      `You can remove selected items to add others.`,
      [
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            return;
          },
        },
      ]
    );
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
      <style>
      .bg {
        box-sizing: border-box;
        font-family: roboto, arial, sans-serif;
      }
      .topBox {
        box-sizing: border-box;
        flex-direction: column;
        margin-left: 5%;
        margin-right: 5%;
      }
      .add {
        margin-right: 5%;
        font-size: 14;
        font-weight: bold;
        color: #161c20;
      }
      .title {
        padding-top: 5%;
        font-size: 16;
        font-weight: bold;
        color: #161c20;
      }
      .subTitle {
        font-size: 14;
        opacity: 0.7;
        font-weight: bold;
        color: #161c20;
        padding-bottom: 5px;  
        border-bottom: 3px solid #3C5E90
      }
      .sub {
        margin-right: 5%;
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 12px;
        font-weight: bold;
        color: #161c20;
      }
      .QAbox {
        display: block;
        border-bottom: 3px solid #3C5E90
      }
      .statBox {
        display: flex;
        flex-direction: row;
        border-bottom: 3px solid #3C5E90
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .column {
        display: flex;
        padding: 0;
        flex-direction: column;
      }
      </style>

      <container class="bg">
        <head style="height: 5%;">
          <p class="title">Focused Report from ${token.name} and Ourtre</p>
          <p class="subTitle">Compiled on ${currentMonth}/${currentDay}.</p>
        </head>
        <body class="topBox">
          ${emailEntries(myThree)}
        </body>

      </container>

      `,
    });

    MailComposer.composeAsync({
      subject: `Focused Report from Ourtre: ${token.name}`,
      body: `Find the PDF Focused Report from Ourtre attached below.\n
      It is your decision who you would like to share this with.\n
      We recommend sending the report to yourself so that you have a copy for future use.\n
      You can also choose to bring a printed copy with you to your sessions.\n
      
      With this document we hope you have chosen three key and concise elements to discuss and examine. All of your information will still be available within the Ourtre app.
      
      Take care of yourself,
      The Ourtre Team`,
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
                Only Check-Ins
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
                Only Flagged Entries
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
              <Text style={look.reportButton}>Email Focused Report</Text>
            </TouchableOpacity>
          </View>
          <View>
            {reportStorage ? (
              <View>
                {showFull
                  ? fullReport.map((item, i) => (
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
                          <TouchableOpacity
                            onPress={
                              myThree.length < 3
                                ? () => handleAdd({ item })
                                : () => threeAlert()
                            }
                          >
                            <Feather name="plus" style={look.outRoutine} />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : null}
                {showChecks
                  ? fullChecks.map((item, i) => (
                      <View key={i}>
                        {CheckVal(item)}
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
                {showFlags
                  ? fullFlags.map((item, i) => (
                      <View key={i}>
                        <View style={look.myThreeButton}>
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
                            <TouchableOpacity
                              onPress={() => handleAdd({ item })}
                            >
                              <Feather name="plus" style={look.outRoutine} />
                            </TouchableOpacity>
                          )}
                        </View>
                        {Entries(item)}
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
