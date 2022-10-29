import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
// import { NotesMenu } from "./NotesMenu";
// import { SoberContacts } from "./SoberContacts";
// import { BadTimes } from "./BadTimes";
// import ProConPage from "./ProConPage";
// import { GoodTimes } from "./GoodTimes";
// import { PercievedThreatMenu } from "./PercievedThreatMenu";
// import { Activities } from "./Activities";
// import { Pies } from "./Pies";
// import { SelfTalk } from "./SelfTalk";
// import { MyValues } from "./MyValues";
// import { FocusStatement } from "./FocusStatement";
// import { CopingStatement } from "./CopingStatement";
// import { CheckIn } from "./CheckIn";

const Routine = ({ navigation }) => {
  pepData;

  arr[i];

  let availPages = [
    {
      id: 1,
      selected: true,
      pageName: "PercievedThreatMenu",
      title: "Elevated State",
    },
    { id: 2, selected: true, pageName: "Report", title: "My Past Week" },
    {
      id: 3,
      selected: true,
      pageName: "FocusStatement",
      title: "My Focus Statement",
    },
    {
      id: 4,
      selected: true,
      pageName: "CopingStatement",
      title: "My Coping Statement",
    },
    { id: 5, selected: true, pageName: "MyValues", title: "My Values" },
    { id: 6, selected: false, pageName: "CheckIn", title: "Quick Check-In" },
    { id: 7, selected: false, pageName: "SelfTalk", title: "+ Self-Talk" },
    { id: 8, selected: false, pageName: "Pies", title: "PIES Check-In" },
    { id: 9, selected: false, pageName: "Five", title: "5-4-3-2-1" },
    { id: 10, selected: true, pageName: "NotesMenu", title: "Experiences" },
    {
      id: 11,
      selected: true,
      pageName: "SoberContacts",
      title: "Support Contacts",
    },
    { id: 12, selected: true, pageName: "ProCon", title: "Pros & Cons" },
    { id: 13, selected: true, pageName: "Activities", title: "Activities" },
  ];

  console.log(availPages);
  //   selectedRoutine = [];
  let selectedRoutine = availPages.filter((x) => x.selected);

  const buildRoutine = () => {
    for (let page of availPages) {
      if (page.selected === true) {
        selectedRoutine.push(page);
      }
    }
  };

  React.useEffect(() => buildRoutine(), []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {selectedRoutine
          ? selectedRoutine.map((item) => (
              <View key={item.id}>
                <TouchableOpacity
                  keyonPress={() => navigation.navigate(item.pageName)}
                  delayPressIn={150}
                >
                  <Text style={styles.add}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

// used overflow: hidden below to prevent corners.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
  },
  add: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#F4743B",
    backgroundColor: "#D2EAEB",
    marginTop: 21,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B2A41",
  },
});

export { Routine };
