import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Contacts from "expo-contacts";
import call from "react-native-phone-call";
import { look } from "../assets/styles";

const SupportContacts = () => {
  let filteredContacts = [];

  const [contacts, setContacts] = useState([]);

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
      <ScrollView extraHeight={175}>
        <View style={look.topBox}>
          <View style={look.border}>
            <Text style={look.add}>
              It's okay to be feeling whatever you're feeling.
            </Text>
            <Text style={look.sub}>CALL US!</Text>
            <Text style={[look.sub, { paddingBottom: "3%" }]}>
              To add a support contact put "2174" anywhere in the company field
              of their contact card and they will show up here.
            </Text>
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
                <Text style={look.contactAdd}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41",
    paddingBottom: 15,
  },
  add: {
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summaryTwo: {
    marginTop: 21,
    marginBottom: 5,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summaryThree: {
    marginTop: 5,
    marginBottom: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    paddingLeft: 20,
    color: "#1B2A41",
  },
  contactContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 15,
    marginLeft: "2.5%",
    width: "95%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#D7D9D7",
  },
});
