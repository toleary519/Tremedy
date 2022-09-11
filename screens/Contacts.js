import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
// import Contacts from 'expo-contacts';
// import * as Contacts from 'react-native-contacts';
import * as Contacts from "expo-contacts";

const SuperPhoneContacts = () => {

  let filteredContacts = []

    const [contacts, setContacts] = useState([]);
    
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.PHONE_NUMBERS],
          });
          if (data.length > 0) {
            setContacts(data);
            console.log(data[0]);
          }
        }
      })();

      for (let fin of contacts) {
        if (fin.company.includes("FIN")) {
          filteredContacts.push(fin)
        }
      }
      // console.log("filtered: ", filteredContacts)
      if (filteredContacts.length < 1) {
        Alert.alert(
          `You have not specified any "FIN" contacts`,
          [{ text: "I'll add some." }])
      
    // const keyExtractor = (item, idx) => {
    //   return item?.id?.toString() || idx.toString();
    // };
    // const renderItem = ({ item, index }) => {
    //   return <Contact contact={item} />;
    // };

// const [fins, setFins] = useState({})

// let filteredContacts = []

// const getPhoneContacts = () => {

  // Contacts.getAll((err, finContacts) => {
  //   if (err) {
  //     Alert.alert(
  //       `Ya fucked up`,
  //       [{ text: "yep" }]
  //   )}
  //   setFins(finContacts);
  //   console.log("contacts: ", finContacts)
  // })
  
  // for (let fin of fins) {
  //   if (fin.company.includes("FIN")) {
  //     filteredContacts.push(fin)
  //   }
  // }
  // console.log("filtered: ", filteredContacts)
  // if (filteredContacts.length < 1) {
  //   Alert.alert(
  //     `You have not specified any "FIN" contacts`,
  //     [{ text: "I'll add some." }])
  // }
}

  
return (
  <ScrollView>
    <Text style={styles.summary}> All of these people would love to hear from you.</Text>
    <Text style={styles.summary}> CALL US! No one is going to judge you.</Text>
    {filteredContacts.map((item) => (
    <TouchableOpacity delayPressIn={150}>
      {/* <Text onPress={onPress} style={styles.add}> */}
      <Text style={styles.add}>
      item.name :
      item.phoneNumbers[0].number
      </Text>
    </TouchableOpacity>
    ))}  
  </ScrollView>
  )
};

export default SuperPhoneContacts;

const styles = StyleSheet.create({
  add: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  summary: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#2f8587",
  },
  icon: {  
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20, 
    paddingLeft: 20,
    color: "#1B2A41"
  }
});