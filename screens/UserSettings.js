import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Auth } from "aws-amplify";
import { Context } from "../Context";
import { Analytics } from "aws-amplify";
// enables alerts in the forground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const UserSettings = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [token, setToken] = useContext(Context);
  const [issue, setIssue] = useState({
    where: "",
    what: "",
    expecting: "",
    bugNotes: "",
  });

  const storeData = async (token) => {
    try {
      console.log("inside storeData");
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem("storedUser", jsonValue);
      console.log("this data has just been stored: ", token);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setToken(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  // This needs to work and we will be done VV
  const changingToken = () => {
    storeData(token);
    getData();
    console.log("changed run", token.substance, token.rLength);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
  };

  const allKeysGone = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    await AsyncStorage.multiRemove(keys);
    const keysTwo = await AsyncStorage.getAllKeys();
    console.log("keys two ------", keysTwo);
  };

  const deleteData = () => {
    const secondCheck = () => {
      Alert.alert(
        "Delete Everything?",
        `All records will be lost. There is no way to recover them.`,
        [
          {
            text: "Yes",
            onPress: () => allKeysGone(),
          },
          {
            text: "Save Them",
            onPress: () => {
              return;
            },
          },
        ]
      );
    };

    Alert.alert("Confirm Delete", `Are you sure?`, [
      {
        text: "Yes",
        onPress: () => secondCheck(),
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const selectedNewDate = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const timeForDisplay = time.toLocaleString("en-US");

  const triggerKillNotify = async () => {
    let alarmArr = selectedNewDate.split(":");
    let hours = parseInt(alarmArr[0], 10);
    let minutes = parseInt(alarmArr[1], 10);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Tremedy Check-In.`,
        body: `Check-In with Tremedy, it takes 30 seconds.`,
        data: { data: { X: `Hello from the data object` } },
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });

    if (token.timeSaved) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      setToken({ ...token, timeSaved: false, timeHrs: null, timeMins: null });
    } else {
      setToken({
        ...token,
        timeSaved: true,
        timeHrs: hours,
        timeMins: minutes,
      });
    }
  };

  // const cancelAlarm = () => {
  //   const secondAlarmAlert = () => {
  //     Alert.alert(
  //       "Delete Reminder",
  //       `You can set a new alarm whenever you want.`,
  //       {
  //         text: "Okay",
  //         onPress: async () => {
  //           await Notifications.cancelAllScheduledNotificationsAsync();
  //         },
  //       }
  //     );
  //   };

  //   Alert.alert("Turn Off Reminder?", [
  //     {
  //       text: "Yes",
  //       onPress: () => {
  //         secondAlarmAlert();
  //       },
  //     },
  //     {
  //       text: "Keep it.",
  //       onPress: () => {
  //         return;
  //       },
  //     },
  //   ]);
  // };

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    // getData();
    checkAvailability();
  }, []);

  const sendBugMail = async () => {
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
        bottom-border: 3px solid ##3C5E90;
      }
      .sub {
        margin-right: 5%;
        text-align: flex-start;
        margin-bottom: 1%;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: #D7D9D7;
      }
      .QAbox {
        padding-top: 4%;
        bottom-border: 2% solid #3C5E90
      }
      </style>
      </head>
      <div class="bg">
        <div class="title">Tremedy Team,</div>
        <div class="topBox">
          <div class="QAbox">
            <div class="sub">I found a bug in: </div>
            <div class="subTitle">${issue.where}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is what happened:</div>
            <div class="add">${issue.what}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is what I was expecting:</div>
            <div class="add">${issue.expecting}</div>
          </div>
          <div class="QAbox">
            <div class="sub">Additional notes or ideas:</div>
            <div class="add">${issue.bugNotes}</div>
          </div>
          <div class="QAbox">
            <div class="sub">Thanks, </div>
            <div class="add">${token.name}</div>
          </div>
        </div>
      </div>
      </container>
      </html>
      `,
    });

    MailComposer.composeAsync({
      subject: `Tremedy BUG FLAG : ${issue.where}`,
      body: "Thanks for letting us know! The pdf below will be sent to our development team.\n\n Thanks, \n Tremedy Bug Team",
      recipients: "contact@ourtre.com",
      attachments: [uri],
    });
  };

  const sendContactEmail = () => {
    MailComposer.composeAsync({
      subject: `Notice : Tremedy Team`,
      body: "The floor is yours.",
      recipients: "contact@ourtre.com",
      attachments: [],
    });
  };

  const emailErrorCheck = () => {
    if (!issue.where.replace(/\s+/g, "") || !issue.what.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Where, and What it is required.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      sendBugMail();
    }
  };

  const dropDownRender = (item) => {
    return (
      <View>
        {item.id === 0 ? infoRender(item) : null}
        {item.id === 1 ? substanceRender(item) : null}
        {item.id === 2 ? notifyRender(item) : null}
        {item.id === 3 ? flagRender(item) : null}
        {item.id === 4 ? deleteRender(item) : null}
        {item.id === 5 ? reportRender(item) : null}
        {item.id === 6 ? bugRender(item) : null}
        {item.id === 7 ? contactRender(item) : null}
        {/* {item.id === 7 ? billingRender(item) : null} */}
      </View>
    );
  };

  const contactRender = (item) => {
    return <View style={look.element}>{item.onText}</View>;
  };
  const infoRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={look.userInfoElement}>
            <View style={look.userHeader}>
              <View>
                <Text
                  style={[
                    look.add,
                    { borderTopWidth: 3, borderTopColor: "#3C5E90" },
                  ]}
                >
                  {token.name}
                </Text>
                <Text style={[look.add]}>{token.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const bugRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={{ width: "100%" }}>
            <Text style={[look.add]}>{item.dropdown}</Text>

            <View style={look.header}>
              <Text style={look.add}>Where did you find the bug?</Text>
              <TextInput
                style={look.userInput}
                onChangeText={(text) => setIssue({ ...issue, where: text })}
                value={issue.where}
                placeholder={"Where? ..."}
                placeholderTextColor={color.placeholderText}
                multiline
                keyboardType="default"
              />
            </View>
            <View style={look.header}>
              <Text style={look.add}>
                What happened when you were using it?
              </Text>
              <TextInput
                style={look.userInput}
                onChangeText={(text) => setIssue({ ...issue, what: text })}
                value={issue.what}
                placeholder={"What?"}
                placeholderTextColor={color.placeholderText}
                multiline
                keyboardType="default"
              />
            </View>
            <View style={look.header}>
              <Text style={look.add}>What was the behaviour you expected?</Text>
              <TextInput
                style={look.userInput}
                onChangeText={(text) => setIssue({ ...issue, expecting: text })}
                value={issue.expecting}
                placeholder={"What did you want to see?"}
                placeholderTextColor={color.placeholderText}
                multiline
                keyboardType="default"
              />
            </View>
            <View style={look.header}>
              <Text style={look.add}>
                Is there anything else you would like to say on this?
              </Text>
              <TextInput
                style={look.userInput}
                onChangeText={(text) => setIssue({ ...issue, bugNotes: text })}
                value={issue.bugNotes}
                placeholder={"optional notes"}
                placeholderTextColor={color.placeholderText}
                multiline
                keyboardType="default"
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => emailErrorCheck()}>
                <MaterialIcons
                  style={[look.icon, look.centerIcon, { paddingBottom: "3%" }]}
                  name="add-circle"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const substanceRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={look.userHeader}>
            <Text style={[look.add, { width: "80%" }]}>{item.dropdown}</Text>
            <TouchableOpacity
              onPress={
                token.substance
                  ? () => setToken({ ...token, substance: false })
                  : () => setToken({ ...token, substance: true })
              }
            >
              {token.substance ? (
                <MaterialIcons
                  name="toggle-on"
                  style={[look.toggleOn, { paddingTop: "2%" }]}
                />
              ) : (
                <MaterialIcons
                  name="toggle-off"
                  style={[look.toggleOff, { paddingTop: "2%" }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {token.substance ? (
            <View style={look.element}>
              <Text style={look.sub}>{item.onText}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const flagRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={look.userHeader}>
            <Text style={[look.add, { width: "80%" }]}>{item.dropdown}</Text>
            <TouchableOpacity
              onPress={
                token.flags
                  ? () => setToken({ ...token, flags: false })
                  : () => setToken({ ...token, flags: true })
              }
            >
              {token.flags ? (
                <MaterialIcons
                  name="toggle-on"
                  style={[look.toggleOn, { paddingTop: "2%" }]}
                />
              ) : (
                <MaterialIcons
                  name="toggle-off"
                  style={[look.toggleOff, { paddingTop: "2%" }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {token.flags && item.onText ? (
            <View style={look.element}>
              <Text style={look.sub}>{item.onText}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const notifyRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={look.userHeader}>
            <Text style={[look.add, { width: "80%" }]}>{item.dropdown}</Text>
            <TouchableOpacity
              onPress={
                token.notify
                  ? () => setToken({ ...token, notify: false })
                  : () => setToken({ ...token, notify: true })
              }
            >
              {token.notify ? (
                <MaterialIcons
                  name="toggle-on"
                  style={[look.toggleOn, { paddingTop: "2%" }]}
                />
              ) : (
                <MaterialIcons
                  name="toggle-off"
                  style={[look.toggleOff, { paddingTop: "2%" }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {token.notify && item.onText ? (
            <View>
              <View style={look.element}>
                <Text style={look.sub}>{item.onText}</Text>
              </View>
              <View style={look.element}>
                <Text style={look.add}>What time do you want to check in?</Text>
              </View>
              <View style={{ width: 300 }}>
                <View style={look.elementHeader}>
                  {token.timeSaved ? (
                    <Text style={look.inRoutine}>{timeForDisplay}</Text>
                  ) : (
                    <DateTimePicker
                      style={{ width: 200, height: 100 }}
                      value={time}
                      display="compact"
                      themeVariant="dark"
                      textColor={color.font}
                      onChange={onTimeSelected}
                      mode="time"
                    />
                  )}
                  {token.timeSaved ? (
                    <TouchableOpacity
                      onPress={() => {
                        triggerKillNotify();
                      }}
                    >
                      <Feather
                        name="check-circle"
                        style={[look.inRoutine, { fontSize: 25 }]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        triggerKillNotify();
                      }}
                    >
                      <Feather
                        name="plus"
                        style={[look.outRoutine, { fontSize: 25 }]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const deleteRender = (item) => {
    return (
      <View>
        <View style={look.userHeader}>
          <View>
            <Text style={[look.add]}>{item.dropdown}</Text>
            <Text style={[look.sub, { marginBottom: "5%" }]}>
              {item.onText}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteData()}>
            <MaterialCommunityIcons
              name="delete-alert-outline"
              style={[look.toggleOff, { fontSize: 40, opacity: 0.6 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const reportRender = (item) => {
    return (
      <View>
        <View style={look.calendarBox}>
          <TouchableOpacity
            disabled={token.subscribed ? false : true}
            onPress={() => setToken({ ...token, rLength: 1 })}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={
                token.rLength >= 1 ? look.selectedCalIcon : look.selectedCalIcon
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={token.subscribed ? false : true}
            onPress={() => setToken({ ...token, rLength: 2 })}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={
                token.rLength >= 2 ? look.selectedCalIcon : look.calendarIcon
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={token.subscribed ? false : true}
            onPress={() => setToken({ ...token, rLength: 3 })}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={
                token.rLength >= 3 ? look.selectedCalIcon : look.calendarIcon
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={token.subscribed ? false : true}
            onPress={() => setToken({ ...token, rLength: 4 })}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={
                token.rLength >= 4 ? look.selectedCalIcon : look.calendarIcon
              }
            />
          </TouchableOpacity>
        </View>
        <View style={[look.header, { marginBottom: "2%" }]}>
          <Text style={token.subscribed ? look.add : look.sub}>
            {item.dropdown}
          </Text>
        </View>

        <View>
          <Text style={[look.sub, { marginTop: 0, marginBottom: 10 }]}>
            {item.onText}
          </Text>
        </View>
      </View>
    );
  };
  // const billingRender = (item) => {
  //   return (
  //     <View>
  //       <View style={look.header}>
  //         <View style={look.userHeader}>
  //           <Text style={[look.add, { marginBottom: 10, width: "80%" }]}>
  //             {item.dropdown}
  //           </Text>
  //           <TouchableOpacity
  //             onPress={
  //               token.subscribed
  //                 ? () => setToken({ ...token, subscribed: false })
  //                 : () => setToken({ ...token, subscribed: true })
  //             }
  //           >
  //             {token.subscribed ? (
  //               <MaterialIcons
  //                 name="toggle-on"
  //                 style={[look.toggleOn, { paddingTop: "2%" }]}
  //               />
  //             ) : (
  //               <MaterialIcons
  //                 name="toggle-off"
  //                 style={[look.toggleOff, { paddingTop: "2%" }]}
  //               />
  //             )}
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       <View>
  //         {token.subscribed ? (
  //           <View style={[look.element, { marginBottom: 10 }]}>
  //             <Text style={look.sub}>{item.onText}</Text>
  //           </View>
  //         ) : null}
  //       </View>
  //     </View>
  //   );
  // };

  let settingsOptions = [
    {
      id: 0,
      title: "My Profile",
      subtitle: "Email and Name",
      dropdown:
        "Enter your information here for report sharing and profile recovery.",
    },
    {
      id: 1,
      title: "Substance & behavioural disorders.",
      subtitle:
        "If you are struggling with these issues there are additional tools here.",
      dropdown: "Need help? You're not alone.",

      onText: `You will now see an option called "We can be better" on the first menu. In it are some unique features and specialized tools to use as well as lists of meetings. Both online and in-person.`,
    },
    {
      id: 2,
      title: "My Notifications",
      subtitle: "How often do you want to check-in?",
      dropdown:
        "Tremedy will send you a quiet notification to remind you to Check-In. Check-Ins can be done in roughly 30 seconds.",
      onText:
        "You can check-in whenever you want in the tool box. Ideally, do a check-in once a day.",
    },
    {
      id: 3,
      title: "Manage Flags",
      subtitle: "Select when and how you would like to use flags.",
      dropdown:
        "Turning flags off here will turn off the prompt. You can still click the flag icon to add items to your report.",
    },
    {
      id: 4,
      title: "Delete Data",
      subtitle: "Delete all data stored on your device.",
      dropdown: "This action is final.",
      onText: "All entry data will be removed.",
    },
    {
      id: 5,
      title: "Report Length",
      subtitle: "How many weeks do you want in your report?",
      dropdown: !token.subscribed
        ? "Report settings can only be changed by members. The default is 1 week. To join, please see billing information below."
        : "Set a time frame between 1 and 4 weeks.",
      onText:
        "It is recommended to choose the length of time between therapy sessions, or an interval at which you choose to review. You don't want to overload your report. All of your entries will be readable on their respective pages.",
      notSubscribed:
        "There are still a number of tools you can use in the tool box!",
    },
    {
      id: 6,
      title: "Found a bug? Have an issue?",
      subtitle: "Help us improve your experience.",
      dropdown:
        "Explain as best you can the issue that you are having and what you hoped to see.",
      value: null,
    },
    {
      id: 7,
      title: "Contact Us",
      subtitle: "Tell us what's on your mind.",
      dropdown: "Send us an email.",
      onText: (
        <TouchableOpacity onPress={() => sendContactEmail()}>
          <Text style={[look.outRoutine, { color: color.inputText }]}>
            Send us an email.
          </Text>
        </TouchableOpacity>
      ),
    },
    // {
    //   id: 8,
    //   title: "Billing Information",
    //   subtitle: "Change cards or subsciption.",
    //   dropdown:
    //     "For testing purposes this is just a toggle but will be a credit card billing section.",
    //   onText:
    //     "And lets be honest. If you're testing it for me, we can work something out. Maybe.",
    // },
  ];

  useEffect(() => {
    Analytics.record({ name: "UserSettings Page Visit" });
  }, []);

  console.log("user run");
  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: "15%" }}
        >
          {settingsOptions.map((item, i) => (
            <View
              key={i}
              style={selectedOption === i ? [look.border] : look.border}
            >
              <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
                <View style={look.header}>
                  <View style={look.userHeader}>
                    <Text style={look.add}>{item.title}</Text>
                    {selectedOption === i ? (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedOption(null);
                          changingToken();
                        }}
                      >
                        <Feather
                          name="chevron-up"
                          style={[
                            look.outRoutine,
                            { fontSize: 30, opacity: 0.7 },
                          ]}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <Text style={look.sub}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
              {selectedOption === i ? dropDownRender(item) : null}
            </View>
          ))}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export { UserSettings };
