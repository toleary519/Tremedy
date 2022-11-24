import React, { useState, useEffect } from "react";
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
  const [editInfo, setEditInfo] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [token, setToken] = useState(
    token
      ? token
      : {
          subscribed: false,
          rLength: 1,
          profile: false,
          substance: false,
          DOB: "",
          city: "",
          country: "",
          flags: true,
          timeSaved: false,
          timeHrs: null,
          timeMins: null,
          name: "",
          email: "",
        }
  );
  const [issue, setIssue] = useState({
    where: "",
    what: "",
    expecting: "",
    bugNotes: "",
  });

  const onTimeSelected = (event, value) => {
    setTime(value);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : {};
      setToken({ ...savedData });
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (token) => {
    try {
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem("storedUser", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = () => {
    const secondCheck = () => {
      Alert.alert(
        "Delete Everything?",
        `All records will be lost. There is no way to recover them.`,
        [
          {
            text: "Yes",
            onPress: () => AsyncStorage.clear(),
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
        title: `Ourtre Check-In.`,
        body: `Check-In with Ourtre, it takes 30 seconds.`,
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

  const cancelAlarm = () => {
    const secondAlarmAlert = () => {
      Alert.alert(
        "Delete Reminder",
        `You can set a new alarm whenever you want.`,
        {
          text: "Okay",
          onPress: async () => {
            await Notifications.cancelAllScheduledNotificationsAsync();
          },
        }
      );
    };

    Alert.alert("Turn Off Reminder?", [
      {
        text: "Yes",
        onPress: () => {
          secondAlarmAlert();
        },
      },
      {
        text: "Keep it.",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    getData();
    checkAvailability();
  }, []);

  const sendBugMail = async () => {
    const windowWidth = Dimensions.get("screen").width;
    const windowHeight = Dimensions.get("screen").height;

    const { uri } = await Print.printToFileAsync({
      html: `
      <html>
      <head>
      <style>
      .bg {
        display: flex;
        height: ${windowHeight};
        flex-direction: column;
        background-color: #1B2A41;
        font-family: roboto, arial, sans-serif;
      }
      .topBox {
        justify-content: flex-start;
        margin-left: ${windowWidth * 0.1};
      }
      .add {
        margin-right: ${windowWidth * 0.1};
        font-size: 18;
        font-weight: bold;
        color: #D7D9D7;
      }
      .title {
        padding-top: ${windowHeight * 0.05};
        font-size: 25;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ##3C5E90;
      }
      .subTitle {
        font-size: 20;
        font-weight: bold;
        color: #D7D9D7;
        margin-left: ${windowWidth * 0.1};
        bottom-border: 3px solid ##3C5E90;
      }
      .sub {
        margin-right: ${windowWidth * 0.1};
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: #D7D9D7;
      }
      .QAbox {
        padding-top: 3%;
        bottom-border: 1% solid #3C5E90
      }
      </style>
      </head>
      <div class="bg">
        <p class="title">Ourtre Team,</p>
        <p class="subTitle">I have found a bug in: ${issue.where}</p>
        <div class="topBox">
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
      subject: `OURTRE BUG FLAG : ${issue.where}`,
      body: "Thanks for letting us know! The pdf below will be sent to our development team.\n\n Thanks, \n Ourtre Bug Team",
      recipients: "t.oleary@me.com",
      attachments: [uri],
    });
  };

  const errorCheck = () => {
    if (
      !token.name.replace(/\s+/g, "") ||
      !token.email.replace(/\s+/g, "") ||
      !token.DOB.replace(/\s+/g, "") ||
      !token.city.replace(/\s+/g, "")
    ) {
      Alert.alert(
        "Entry Error",
        `Name, Email, City and DOB are required fields.`,
        [{ text: "Got It" }]
      );
      return;
    } else {
      setToken({ ...token, profile: true });
    }
  };

  const creditCardInformation = () => {
    // Sign Up.
  };

  const handleChange = () => {
    storeData(token);
    getData();
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
        {item.id === 7 ? billingRender(item) : null}
      </View>
    );
  };

  const infoRender = (item) => {
    return (
      <View>
        <View style={look.element}>
          <View style={{ width: "100%" }}>
            <Text style={[look.add]}>{item.dropdown}</Text>
            <View style={look.userInfoElement}>
              {!editInfo || token.profile ? (
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
                    {!token.city && !token.country ? null : (
                      <Text style={[look.add]}>
                        {token.city ? token.city : null}
                        {token.city && token.country ? ", " : ""}
                        {token.country ? token.country : null}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setEditInfo(true);
                      setToken({ ...token, profile: false });
                    }}
                  >
                    <Feather name="edit" style={look.icon} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View style={look.header}>
                    <Text style={look.add}>Name*</Text>
                    <Text style={look.sub}>Any of the following,</Text>
                    <TextInput
                      style={look.userInput}
                      onChangeText={(text) =>
                        setToken({ ...token, name: text })
                      }
                      value={token.name}
                      placeholder={"First, Last, Full or Nickname"}
                      keyboardType="default"
                    />
                  </View>
                  <View style={look.header}>
                    <Text style={look.add}>Email*</Text>
                    <TextInput
                      style={look.userInput}
                      onChangeText={(text) =>
                        setToken({ ...token, email: text })
                      }
                      value={token.email}
                      placeholder={"Email"}
                      keyboardType="default"
                    />
                  </View>
                  <View style={look.header}>
                    <Text style={look.add}>
                      City* and country where you live.
                    </Text>
                    <Text style={look.sub}>
                      Why? There are location elements in Ourtre. To protect
                      your privacy we do not collect GPS data.
                    </Text>
                    <TextInput
                      style={look.userInput}
                      onChangeText={(text) =>
                        setToken({ ...token, city: text })
                      }
                      value={token.city}
                      placeholder={"City"}
                      keyboardType="default"
                    />

                    <TextInput
                      style={look.userInput}
                      onChangeText={(text) =>
                        setToken({ ...token, country: text })
                      }
                      value={token.country}
                      placeholder={"Country"}
                      keyboardType="default"
                    />
                  </View>
                  <View style={look.header}>
                    <Text style={look.add}>Age, 18+*</Text>
                    <TextInput
                      style={look.userInput}
                      onChangeText={(text) => setToken({ ...token, DOB: text })}
                      value={token.DOB}
                      maxLength={2}
                      placeholder={"Age"}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => errorCheck()}>
                      <MaterialIcons
                        style={[
                          look.icon,
                          look.centerIcon,
                          { paddingBottom: "2%" },
                        ]}
                        name="add-circle"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
                placeholder={"Where?"}
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
                placeholder={"What"}
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
                multiline
                keyboardType="default"
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => sendBugMail()}>
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
                        console.log("false token: ", token);
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
                        console.log("true token: ", token);
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
  const billingRender = (item) => {
    return (
      <View>
        <View style={look.header}>
          <View style={look.userHeader}>
            <Text style={[look.add, { marginBottom: 10, width: "80%" }]}>
              {item.dropdown}
            </Text>
            <TouchableOpacity
              onPress={
                token.subscribed
                  ? () => setToken({ ...token, subscribed: false })
                  : () => setToken({ ...token, subscribed: true })
              }
            >
              {token.subscribed ? (
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
          {token.subscribed ? (
            <View style={[look.element, { marginBottom: 10 }]}>
              <Text style={look.sub}>{item.onText}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  let settingsOptions = [
    {
      id: 0,
      title: "My Profile",
      subtitle: "All about you",
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
        "Ourtre will send you a quiet notification to remind you to Check-In. Check-Ins can be done in roughly 30 seconds.",
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
      title: "Billing Information",
      subtitle: "Change cards or subsciption.",
      dropdown:
        "For testing purposes this is just a toggle but will be a credit card billing section.",
      onText:
        "And lets be honest. If you're testing it for me, we can work something out. Maybe.",
    },
  ];

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <KeyboardAwareScrollView extraHeight={175}>
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
                          handleChange();
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
