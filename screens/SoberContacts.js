import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Contacts from "expo-contacts";

const SoberContacts = () => {

  let filteredContacts = []

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          const contacts = data;
          setContacts(contacts)
          // console.log("test 8****", contacts);
          // console.log("data length:", contacts.length);
        }
        else {
          setError('Add some "2174" company contacts');
        }
      }
    })();
  }, []);

  for (let sober of contacts) {
    // console.log("SOBER******************************", sober)
    if (sober.company && sober.company.includes("2174")) {
      filteredContacts.push(sober)
    }
  }
        
return (
  <ScrollView style={styles.container}>
    <Text style={styles.summary}> All of these people would love to hear from you.</Text>
    <Text style={styles.summaryTwo}> CALL US! There are no judgements here.</Text>
    <Text style={styles.summaryThree}> To add a sober contact put "2174" anywhere in the 
    company field of their contact card.</Text>
    {filteredContacts.map((item) => (
    <TouchableOpacity style={styles.contactContainer} key={item.phoneNumbers[0].number} delayPressIn={150}>
      <Text style={styles.add}>{item.firstName}</Text>
      <Text style={styles.add}>{item.lastName ? item.lastName : null}</Text>
      <Text style={styles.add}>{item.phoneNumbers[0].number}</Text>
    </TouchableOpacity>))} 
  </ScrollView>
  )
};

export { SoberContacts };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2A41"
  },
  add: {
    paddingTop: 10,
    paddingBottom: 10,
    padding: 5,
    fontSize: 20,
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
    color: "#1B2A41"
  }, 
  contactContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "80%",
    left: "15%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  }
});