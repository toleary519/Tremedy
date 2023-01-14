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
    emailToken
      ? emailToken
      : {
          allowed: true,
          emailTime: 0,
          emailMonth: currentMonth,
          emailDay: currentDay,
        }
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

  //should change when status changes firing useEffect
  let emailSent = emailResult === "sent" ? 2 : 1;

  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
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
    if (
      myThree.length !== 0 &&
      myThree[0].myThat !== undefined &&
      myThree[0].myThat === "unlockemailcode"
    ) {
      Alert.alert(`Email Unlocked`, ` `, [
        {
          text: "Go Back",
          onPress: () => {
            testingReset();
          },
        },
      ]);
    } else {
      Alert.alert(
        `Email Limit`,
        `Users are able to send one email each week.\n\nYou can review on the next screen before sending.`,
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
    }
  };

  const emailErrorCheck = () => {
    if (myThree.length === 0) {
      Alert.alert(
        "Focused Report Empty",
        `Add entries for review with the "+" button.`,
        [{ text: "Got It" }]
      );
      return;
    }
    if (differenceTime < allowedTestTime) {
      Alert.alert(
        "Email Limit Exceeded",
        `Email will be active again six days from ${emailToken.emailMonth}/${emailToken.emailDay}`,
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
  let weekAgo = currentDate - dayCount * 24 * 60 * 60 * 1000;
  let allowedTestTime = 6 * 24 * 60 * 60 * 1000;
  let differenceTime = currentTime - emailToken.emailTime;
  // let allowedTestTime = 60000;

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
    const { uri } = await Print.printToFileAsync({
      html: `
      <style>

      .whole {
        margin: 1.25cm 5mm 5mm 5mm;
        justify-content: center;
        align-items: center;
      }
      .container {
        font-family:Futura, Helvetica, sans-serif;
        margin-right:3mm;
        margin-left:3mm;
      }
      :root{
        
        --highlight-color-one: #CBDBE1;
        --highlight-color-one-transparent: #1FC2DEB3;
        --highlight-color-two: #749FAE;
        --text-color: #303E48;
        --table-row-separator-color:#CEC3BA;
      }

      @page{
        /*
        This CSS highlights how page sizes and margin boxes are set.
        https://docraptor.com/documentation/article/1067959-size-dimensions-orientation
        Within the page margin boxes content from running elements is used instead of a 
        standard content string. The name which is passed in the element() function can
        be found in the CSS code below in a position property and is defined there by 
        the running() function.
        */
        size:USLetter;
        
        @top-left{
          content:element(header);
        }
        
        @bottom-left{
          content:element(footer);
        }
      }

      table{
        width:95%;
        border-collapse:collapse;
        margin-top:0.6cm;
        margin-left: 1%;
      }

      .scope{
        height:0;
        border:0;
        border-top:.25mm solid var(--highlight-color-one);
        margin:10mm 0 5mm 0;
      }
      
      /*
      The headers of the budget table get a blue background color and the text is transformed
      to uppercase.
      */
      table thead tr th{
        width:100%;
        background-color:var(--highlight-color-one);
        text-align:left;
        padding:2mm 2mm;
        text-transform:uppercase;
        font-family:Futura, Helvetica, sans-serif;
        font-size:9pt;
      }
      
      /*
      The first cell in each content row should consum 90% of the tables width.
      */
      table tbody tr td:first-of-type{
        width:100%;
      }
      
      /*
      All cells in the tables body have a padding of 6mm and a border on the bottom.
      */
      table tbody tr td{
        padding:6mm 6mm 0 6mm;
        font-size:10pt;
        font-family:Futura, Helvetica, sans-serif;
        border-bottom:0.125mm solid var(--table-row-separator-color);
      }
      
      /*
      The footer for all content pages is set as running element which gets added to
      the page margin boxes via the @page rule. 
      The text is smaller than standard and the items in the footer (HR element and text)
      are aligned.
      */
      footer{
        position:running(footer);
        font-size:8pt;
        font-family:Futura, Helvetica, sans-serif;
        text-transform:uppercase;
        color:var(--highlight-color-two);
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-right:9mm;
        margin-left:3mm;
      }
      
      /*
      The HR HTML element in the footer should have a width of 45% and a 0.5mm solid blue line.
      */
      footer hr{
        width:60%;
        height:0;
        border:0;
        border-top:.5mm solid var(--highlight-color-one);
        margin-top: 2mm;
      }
      
      /*
      The last link in the footer (the link to the website) needs to be bold.
      */
      footer a:last-of-type{
        font-weight:bold;
      }
      </style>
      <div class="whole">
        <h3 class="container">Focused Report for discussion from ${
          token.name
        }.</h3>
        <h4 class="container">Compiled via the Tremedy App on ${currentMonth}/${currentDay}/${currentYear}.</h4>
        ${emailEntries(myThree)}
      </div>
      <footer>
      <hr />
      <span style="margin-top: 1mm;"> The Tremedy App | contact@diffit.io | diffit.io
      </footer>
      `,
    });

    MailComposer.composeAsync({
      subject: `Focused Report from Tremedy:  ${token.name}`,
      body: `Find the PDF Focused Report from Tremedy attached below.\n
      We recommend sending the report to yourself so that you have the copy.\n
      You can choose to bring a printed copy with you to your sessions.\n
      With the Focused Reports try to choose three key and concise elements to discuss and examine. All of your information will still be available within the Tremedy App itself.
      
      Take care of yourself,
      The Tremedy Team`,
      recipients: token.email,
      attachments: uri,
    }).then((res) => setEmailResult(res.status));

    console.log("email result", emailResult);
  };

  console.log("email time: ", emailToken.emailTime);
  console.log("difference time : ", differenceTime);
  console.log("allowed test time : ", allowedTestTime);
  useEffect(() => {
    setEmailToken({
      ...emailToken,
      emailTime: currentTime,
      emailDay: currentDay,
      emailMonth: currentMonth,
    });
    storeData(emailToken);
  }, [emailSent]);

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
            {/* <TouchableOpacity onPress={() => testingReset()}>
              <Text style={look.reportButton}>Test Reset</Text>
            </TouchableOpacity> */}
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