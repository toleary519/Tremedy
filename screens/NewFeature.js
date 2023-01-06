import React, { useState, useEffect, useContext } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Analytics } from "aws-amplify";
import { look } from "../assets/styles";
import { color } from "../assets/colors";
import { Context } from "../Context";

const NewFeature = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [token, setToken] = useContext(Context);
  const [feature, setFeature] = useState({
    name: "",
    whatsItDo: "",
    howsItWork: "",
    howsItLook: "",
    howsItHelp: "",
    notes: "",
  });

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }

    checkAvailability();
  }, []);

  const sendFeatureMail = async () => {
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
        margin-bottom: 1%;
        text-align: flex-start;
        align-items: center;
        opacity: 0.6;
        font-size: 15px;
        font-weight: bold;
        color: #D7D9D7;
      }
      .QAbox {
        padding-top: 4%;
        border-bottom: 2% solid #3C5E90
      }
      </style>
      </head>
      <div class="bg">
        <div class="title">Tremedy Team,</div>
        <div class="topBox">
          <div class="QAbox">
            <div class="sub">I think there should be a feature called: </div>
            <div class="add">${feature.name}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is what I think it should do:</div>
            <div class="add">${feature.whatsItDo}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This is how I think it should work:</div>
            <div class="add">${feature.howsItWork}</div>
          </div>
          <div class="QAbox">
            <div class="sub">This sort of thing is/would be helpful to me because:</div>
            <div class="add">${feature.howsItHelp}</div>
          </div>
          <div class="QAbox">
            <div class="sub"> In my mind this is how I think it should look:</div>
            <div class="add">${feature.howsItLook}</div>
          </div>
          <div class="QAbox">
            <div class="sub">Notes & Thoughts:</div>
            <div class="add">${feature.notes}</div>
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
      subject: `New Feature Team! : ${feature.name}`,
      body: `We're pumped for the input, the pdf below will be sent to our development team.\n 
      If your happy with it send it our way and if you like to add more cancel the draft and you will be taken back to the app to continue.\n\n 
      Thanks, \n 
      Tremedy Contact Team`,
      recipients: "contact@diffit.io",
      attachments: [uri],
    });
  };

  const errorCheck = () => {
    if (
      !feature.name.replace(/\s+/g, "") ||
      !feature.whatsItDo.replace(/\s+/g, "") ||
      !feature.howsItHelp.replace(/\s+/g, "")
    ) {
      Alert.alert(
        "Entry Error",
        `Name, what it does, and how it helps required.`,
        [{ text: "Got It" }]
      );
      return;
    } else {
      sendFeatureMail();
    }
  };

  useEffect(() => {
    Analytics.record({ name: "NewFeature Page Visit" });
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) => setFeature({ ...feature, name: text })}
              value={feature.name}
              placeholder={"What's this feature called? ..."}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, whatsItDo: text })
              }
              value={feature.whatsItDo}
              placeholder={"What does it do?"}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItWork: text })
              }
              value={feature.howsItWork}
              placeholder={"How does this tool work?"}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItHelp: text })
              }
              value={feature.howsItHelp}
              placeholder={"What makes it helpful to you?"}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItLook: text })
              }
              value={feature.howsItLook}
              placeholder={"What does it look like?"}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <TextInput
              style={look.userInput}
              onChangeText={(text) => setFeature({ ...feature, notes: text })}
              value={feature.notes}
              placeholder={"Anything else you'd like to add?"}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => errorCheck()}>
              <MaterialIcons
                style={[look.icon, look.centerIcon, { paddingBottom: "3%" }]}
                name="add-circle"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export { NewFeature };
