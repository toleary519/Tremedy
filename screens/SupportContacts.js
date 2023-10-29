import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import * as Contacts from "expo-contacts";
import contactImage from "../assets/contactImage.jpg";
import call from "react-native-phone-call";
import { FontAwesome } from "@expo/vector-icons";
import { look } from "../assets/styles";

const SupportContacts = () => {
  let filteredContacts = [];

  const [contacts, setContacts] = useState([]);
  const [imageWindow, setImageWindow] = useState(false);

  const makeCall = (item) => {
    const args = {
      number: `1${item.phoneNumbers[0].digits}}`,
      prompt: false,
      skipCanOpen: true,
    };

    call(args);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          const contacts = data;
          setContacts(contacts);
        } else {
          setError('Add some "2174" company contacts');
        }
      }
    })();
  }, []);

  for (let support of contacts) {
    if (support.company && support.company.includes("2174")) {
      filteredContacts.push(support);
    }
  }

  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false} extraHeight={175}>
        <View style={look.topBox}>
          <View style={look.border}>
            <Text style={look.add}>
              It's okay to be feeling whatever you're feeling.
            </Text>
            <Text style={look.sub}>CALL!</Text>
            <Text style={[look.sub, { paddingBottom: "3%" }]}>
              To add a support contact put "2174" anywhere in the company field
              of their contact card and they will show up here.
            </Text>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => setImageWindow(!imageWindow ? true : false)}
            >
              <FontAwesome
                style={[
                  look.icon,
                  look.centerIcon,
                  { paddingBottom: "4%", fontSize: 25 },
                ]}
                name="question-circle"
              />
              {imageWindow ? (
                <View style={look.imageBox}>
                  <Image style={look.image} source={contactImage} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
          {filteredContacts.map((item, i) => (
            <View key={i} style={[look.border]}>
              <TouchableOpacity
                style={look.userHeader}
                key={item.phoneNumbers[0].number}
                onPress={() => makeCall(item)}
                delayPressIn={150}
              >
                <View style={look.element}>
                  <Text style={look.contactAdd}>{item.firstName}</Text>
                  <Text style={look.contactAdd}>
                    {item.lastName ? `, ${item.lastName}` : null}
                  </Text>
                </View>
                <Text style={[look.contactAdd]}>
                  {item.phoneNumbers[0].number}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export { SupportContacts };

