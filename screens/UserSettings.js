import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const UserSettings = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [flags, setFlags] = useState(true);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [DOB, setDOB] = useState("");
  const [pin, setPin] = useState(null);
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");
  const [substance, setSubstance] = useState(false);
  const [subscribed, setSubscibed] = useState(false);
  const [rLength, setRLength] = useState(1);

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

  const bugReport = () => {
    // Report a bug with email.
  };
  const creditCardInformation = () => {
    // Sign Up.
  };

  const dropDownRender = (item) => {
    return (
      <View>
        {item.id === 1 ? substanceRender(item) : null}
        {item.id === 3 ? flagRender(item) : null}
        {item.id === 4 ? deleteRender(item) : null}
        {item.id === 5 ? reportRender(item) : null}
        {item.id === 7 ? billingRender(item) : null}
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
                substance ? () => setSubstance(false) : () => setSubstance(true)
              }
            >
              {substance ? (
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
          {substance ? (
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
              onPress={flags ? () => setFlags(false) : () => setFlags(true)}
            >
              {flags ? (
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
          {flags && item.onText ? (
            <View style={look.element}>
              <Text style={look.sub}>{item.onText}</Text>
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
              style={[look.toggleOff, { fontSize: 50, opacity: 0.6 }]}
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
            disabled={subscribed ? false : true}
            onPress={() => setRLength(1)}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={rLength >= 1 ? look.selectedCalIcon : look.selectedCalIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={subscribed ? false : true}
            onPress={() => setRLength(2)}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={rLength >= 2 ? look.selectedCalIcon : look.calendarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={subscribed ? false : true}
            onPress={() => setRLength(3)}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={rLength >= 3 ? look.selectedCalIcon : look.calendarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={subscribed ? false : true}
            onPress={() => setRLength(4)}
          >
            <MaterialCommunityIcons
              name="calendar-week"
              style={rLength >= 4 ? look.selectedCalIcon : look.calendarIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[look.header, { marginBottom: "2%" }]}>
          <Text style={subscribed ? look.add : look.sub}>{item.dropdown}</Text>
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
                subscribed
                  ? () => setSubscibed(false)
                  : () => setSubscibed(true)
              }
            >
              {subscribed ? (
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
          {subscribed ? (
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
      title: "My Info",
      subtitle: "All about you",
      dropdown:
        "Enter your information here for report sharing and profile recovery.",
      value: [first, last, DOB, email],
      window: false,
    },
    {
      id: 1,
      title: "Substance & behavioural disorders.",
      subtitle:
        "If you are struggling with these issues there are additional tools here.",
      dropdown:
        "Substance & behavioural disorders are very common in today's world. You're not alone.",
      value: substance,
      onText: `You will now see an option called "Lapse" on the first menu. In it are some unique features and specialized tools to use as well as a directory of meetings.`,
      window: false,
    },
    {
      id: 2,
      title: "My Pin",
      subtitle: "Create or reset your pin.",
      dropdown: "You can enter a pin here unique to this app.",
      value: pin,
      window: false,
    },
    {
      id: 3,
      title: "Manage Flags",
      subtitle: "Select when and how you would like to use flags.",
      dropdown:
        "Turning flags off here will turn off the prompt. You can click the flag icon to add items to your report.",
      value: flags,
      window: false,
    },
    {
      id: 4,
      title: "Delete Data",
      subtitle: "Delete all data stored on your device.",
      dropdown: "This action is final.",
      onText: "All entry data will be removed.",
      window: false,
    },
    {
      id: 5,
      title: "Report Length",
      subtitle: "How many weeks do you want in your report?",
      dropdown: !subscribed
        ? "Report settings can only be changed by members. The default is 1 week. To join, please see billing information below."
        : "Set a time frame between 1 and 4 weeks.",
      onText:
        " It is recommended to choose the length of time between therapy sessions, or an interval at which you choose to review.",
      notSubscribed:
        "There are still a number of tools you can use in the tool box!",
      window: false,
    },
    {
      id: 6,
      title: "Found a bug?",
      subtitle: "Help us improve your experience.",
      dropdown:
        "Explain as best you can the issue that you are having and we will address it as soon as possible.",
      value: null,
      window: false,
    },
    {
      id: 7,
      title: "Billing Information",
      subtitle: "Change cards or subsciption.",
      dropdown:
        "For testing purposes this is just a toggle now but this will be a billing and credit card section.",
      onText:
        "And lets be honest. If you're testing it for me, we can work something out. Maybe.",
      value: subscribed,
      window: false,
    },
    // {
    //   id: 2,
    //   title: "My Pin",
    //   subtitle: "Create or reset your pin.",
    //   dropdown: "You can enter a pin here unique to this app.",
    //   value: pin,
    //   window: false,
    // },
  ];

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <KeyboardAwareScrollView>
          {settingsOptions.map((item, i) => (
            <View
              key={i}
              style={
                selectedOption === i
                  ? [
                      look.border,
                      {
                        backgroundColor: "#1D3461",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]
                  : look.border
              }
            >
              <TouchableOpacity onPress={() => setSelectedOption(item.id)}>
                <View style={look.header}>
                  <View style={look.userHeader}>
                    <Text style={look.add}>{item.title}</Text>
                    {selectedOption === i ? (
                      <TouchableOpacity onPress={() => setSelectedOption(null)}>
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
                {console.log(item)}
              </TouchableOpacity>
              {selectedOption === i ? dropDownRender(item) : null}
            </View>
          ))}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};;;;;;;

export { UserSettings };
