import React, { useState, useEffect } from "react";
import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";
import { emailStyle, featureEmail } from "../helpers/htmlEmails";

// width: ${windowWidth};

const NewFeature = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [token, setToken] = useState({});
  const [feature, setFeature] = useState({
    name: "",
    whatsItDo: "",
    howsItWork: "",
    howsItLook: "",
    howsItHelp: "",
    notes: "",
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : {};
      setToken(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [token]);

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
      ${emailStyle()}
      </head>
      <div class="bg">
      ${featureEmail(feature, token)}
      </div>
      </html>
      `,
    });

    MailComposer.composeAsync({
      subject: `New Feature Team! : ${feature.name}`,
      body: `We're pumped for the input, the pdf below will be sent to our development team.\n 
      If your happy with it send it our way and if you like to add more cancel the draft and you will be taken back to the app to continue.\n\n 
      Thanks, \n 
      Ourtre Contact Team`,
      recipients: "t.oleary@me.com",
      attachments: [uri],
    });
  };

  const flagAlert = () => {
    const pressTrue = () => {
      let flag = true;
      handleAdd(flag);
    };

    const pressFalse = () => {
      let flag = false;
      handleAdd(flag);
    };

    Alert.alert(
      `Flag this in "My Past Week?"`,
      `Manage flags in User Settings.`,
      [
        {
          text: "Yes",
          onPress: () => pressTrue(),
        },

        { text: "Nope", onPress: () => pressFalse() },
      ]
    );
  };

  const errorCheck = () => {
    if (!feature.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      flagAlert();
    }
  };

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={200}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={look.add}>What would you call it?</Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) => setFeature({ ...feature, name: text })}
              value={feature.name}
              placeholder={"What's it called?"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>What does it do?</Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, whatsItDo: text })
              }
              value={feature.whatsItDo}
              placeholder={"What does it do?"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>In your mind how does it work?</Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItWork: text })
              }
              value={feature.howsItWork}
              placeholder={"How's it work?"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>
              How do you find this type of thing helpful?
            </Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItHelp: text })
              }
              value={feature.howsItHelp}
              placeholder={"What makes it helpful to you?"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>How do you think it should look?</Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) =>
                setFeature({ ...feature, howsItLook: text })
              }
              value={feature.howsItLook}
              placeholder={"What does it look like?"}
              multiline
              keyboardType="default"
            />
          </View>
          <View style={look.header}>
            <Text style={look.add}>
              Is there anything else you'd like to add?
            </Text>
            <TextInput
              style={look.userInput}
              onChangeText={(text) => setFeature({ ...feature, notes: text })}
              value={feature.notes}
              placeholder={"Notes"}
              multiline
              keyboardType="default"
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => sendFeatureMail()}>
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
};;;

export { NewFeature };


// `Ourtre Team,
// \n\n My idea is called: ${feature.name}\n\n This is what it does: ${
//   feature.whatsItDo
// } \n\n How it works: ${feature.howsItWork} \n\n  How I find it helpful: ${
//   feature.howsItHelp
// } \n\n How I think it should look: ${feature.howsItLook} \n\n${
//   feature.notes ? `Notes: ${feature.notes}` : "No further notes."
// }`,

  // const featureEmail = () => {
    //   return (
    //     <View>
    //       <Text style={[look.add, { fontSize: 20 }]}>Ourtre Team,</Text>
    //       <Text style={look.add}>My idea is called {feature.name}</Text>
    //       <Text />
    //       <Text style={look.add}>This is what I think it should do:</Text>
    //       <Text style={look.sub}>{feature.whatsItDo}</Text>
    //       <Text />
    //       <Text style={look.add}>This is how I think it should work:</Text>
    //       <Text style={look.sub}>{feature.howsItWork}</Text>
    //       <Text />
    //       <Text style={look.add}>
    //         This sort of thing is/would be helpful to me because:
    //       </Text>
    //       <Text style={look.sub}>{feature.howsItHelp}</Text>
    //       <Text />
    //       <Text style={look.add}>
    //         In my mind this is how I think it should look
    //       </Text>
    //       <Text style={look.sub}>{feature.howsItLook}</Text>
    //       {feature.notes ? (
    //         <View>
    //           <Text style={look.add}>More notes:</Text>
    //           <Text style={look.sub}>{feature.notes}</Text>
    //         </View>
    //       ) : null}
    //     </View>
    //   );
    // };