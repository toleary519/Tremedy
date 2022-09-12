import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { FirstMenu } from "./screens/FirstMenu";
import { Emergency } from "./screens/Emergency";
import { PepTalkMenu } from "./screens/PepTalkMenu";
import { UrgeMenu } from "./screens/UrgeMenu";
import { PlanningMenu } from "./screens/PlanningMenu";
import { NotesMenu } from "./screens/NotesMenu";
import SuperPhoneContacts from "./screens/Contacts"
import { BadTimes } from "./screens/BadTimes";
import { GoodTimes } from "./screens/GoodTimes";


export default function App() {
  return (
    <View style={styles.container}>
      <GoodTimes/>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
