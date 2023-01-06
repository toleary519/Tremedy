import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { look } from "../assets/styles";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { CheckVal, Entries } from "../helpers/reportFunctions";
import { emailEntries } from "../helpers/htmlEmails";
import { Context } from "../Context";
import { Analytics } from "aws-amplify";
import { MailComposerStatus } from "expo-mail-composer";

const Report = () => {
  let [showFull, setShowFull] = useState(true);
  let [showChecks, setShowChecks] = useState(false);
  let [showFlags, setShowFlags] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [token, setToken] = useContext(Context);
  const [myThree, setMyThree] = useState([]);
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );
  const [allowed, setAllowed] = useState(null);
  const [emailToken, setEmailToken] = useState(
    emailToken ? emailToken : { allowed: true, emailTime: 0 }
  );
  const [emailResult, setEmailResult] = useState("x");

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
      const thatValue = await AsyncStorage.getItem("storedThat");
      const cravingValue = await AsyncStorage.getItem("storedCraving");
      const emailAllowed = await AsyncStorage.getItem("emailAllowed");
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
      let emailData = emailAllowed ? JSON.parse(emailAllowed) : true;
      setEmailToken({ emailData });
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
  let count = myThree.length;

  const handleRemove = ({ item }) => {
    setMyThree(myThree.filter((x) => x.id !== item.id));
  };

  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentTime = currentDate.getTime();

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
      `To be concise the report limit is three entries.\n\nYou can remove selected items to add others.`,
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

  let limitAlert = () => {
    Alert.alert(
      `Email Limit`,
      `You can send one email each week.\n\nChoose topics wisely.\n\nYour Tremedy emails are not deactivated until sent.`,
      [
        {
          text: "OK",
          style: "cancel",
          onPress: () => {
            emailErrorCheck();
          },
        },
        {
          text: "Go Back",
          onPress: () => {
            return;
          },
        },
      ]
    );
  };

  const emailErrorCheck = () => {
    emailResult === "sent"
      ? setEmailToken({ ...emailToken, allowed: false })
      : null;
    console.log("error check email token : ", emailToken);

    if (myThree.length === 0) {
      Alert.alert(
        "Focused Report Empty",
        `Add entries for review with the "+" button.`,
        [{ text: "Got It" }]
      );
      return;
    }
    if (!emailToken.allowed || emailResult === "sent") {
      Alert.alert(
        "Email Limit Exceeded",
        `Email will be active again six days from ${currentMonth}/${currentDay}`,
        [{ text: "Got It" }]
      );
      return;
    } else {
      sendReportMail();
    }
  };

  const testingReset = () => {
    setEmailToken({ allowed: true, emailTime: 0 });
    setEmailResult("x");
  };

  const storeData = async (emailToken) => {
    try {
      const jsonValue = JSON.stringify(emailToken);
      await AsyncStorage.setItem("emailAllowed", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  let dayCount = token.rLength ? token.rLength * 7 : 7;
  // let currentDate = new Date().getTime();
  let weekAgo = currentDate - dayCount * 24 * 60 * 60 * 1000;
  let allowedTestTime = 6 * 24 * 60 * 60 * 1000;

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
    // let currentDate = new Date();
    // let currentDay = currentDate.getDate();
    // let currentMonth = currentDate.getMonth() + 1;
    // let currentTime = currentDate.getTime();

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
      We recommend sending the report to yourself so that you have a copy for future use.\n
      You can also choose to bring a printed copy with you to your sessions.\n
      
      With the Focused Reports try to choose three key and concise elements to discuss and examine. All of your information will still be available within the Ourtre app.
      
      Take care of yourself,
      The Ourtre Team`,
      recipients: token.email,
      attachments: uri,
    }).then((res) => setEmailResult(res.status));

    setEmailToken({ ...emailToken, emailTime: currentTime });
    console.log("time sent in email", emailToken.emailTime);
  };

  useEffect(() => {
    if (currentTime - emailToken.emailTime > allowedTestTime) {
      setEmailToken({ ...emailToken, allowed: true });
      storeData(emailToken);
    }
  }, []);

  useEffect(() => {
    storeData(emailToken);
  }, [emailToken.allowed]);

  // useEffect(() => {
  //   Analytics.record({ name: "Report Page Visit" });
  // }, []);

  console.log("report run");

  React.useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    getData();
    checkAvailability();
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
                limitAlert();
              }}
              delayPressIn={150}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={look.reportButton}>Email Focused Report</Text>
                {count > 0 ? (
                  <Text style={[look.inRoutine, look.focusReportCount]}>
                    {count}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => testingReset()}>
              <Text style={look.reportButton}>Test Reset</Text>
            </TouchableOpacity>
          </View>
          <View>
            {reportStorage ? (
              <View>
                {showFull
                  ? fullReport.map((item, i) => (
                      <View key={i}>
                        <View style={look.myThreeButton}>
                          {verify({ item }) ? (
                            <TouchableOpacity
                              onPress={() => handleRemove({ item })}
                            >
                              <Feather name="check" style={look.inRoutine} />
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
                        {Entries(item)}
                      </View>
                    ))
                  : null}
                {showChecks
                  ? fullChecks.map((item, i) => (
                      <View key={i}>
                        <View style={look.myThreeButton}>
                          {verify({ item }) ? (
                            <TouchableOpacity
                              onPress={() => handleRemove({ item })}
                            >
                              <Feather name="check" style={look.inRoutine} />
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
                        {CheckVal(item)}
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
                              <Feather name="check" style={look.inRoutine} />
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

// import React, { useState } from 'react';
// import { Text, View, StyleSheet, Alert, Button } from 'react-native';
// import Constants from 'expo-constants';
// import * as FileSystem from 'expo-file-system';
// import * as MailComposer from 'expo-mail-composer';


 
// export default function App() {
 
// const [stxt, setStxt] = useState("123");

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{stxt}</Text>
//       <Text style={styles.paragraph}>{data}</Text>
//       <Button title="Send" onPress={btnclicked}/>
//     </View>
//   );
// }

// let data = "outside app() const text";

// const btnclicked = () => {
//   FileSystem.downloadAsync('https://filesamples.com/samples/ebook/mobi/sample1.mobi',FileSystem.documentDirectory + 'test.mobi')
//   .then(({ uri }) => {MailComposer.composeAsync({recipients:["test@gmail.com"], attachments:[uri]}); })
//   .then(({ res }) => {console.log(res)} )
//   .catch(error => {console.error(error);});
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });