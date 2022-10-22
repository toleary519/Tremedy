import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Report = () => {
  let [showFull, setShowFull] = useState(true);
  let [showChecks, setShowChecks] = useState(false);
  let [showFlags, setShowFlags] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedCheckin");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setCheckinStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  let currentDate = new Date().getTime();
  let weekAgo = currentDate - 7 * 24 * 60 * 60 * 1000;
  let range = currentDate - weekAgo;

  let sortedChecks = checkinStorage.sort((a, b) => {
    return b.id - a.id;
  });

  let sortedFlags = checkinStorage.sort((a, b) => {
    return b.id - a.id;
  });

  let fullReport = [...sortedChecks, ...sortedFlags].filter(
    (x) => x.id < currentDate && x.id > weekAgo
  );

  let sortedFullReport = fullReport.sort((a, b) => {
    return b.id - a.id;
  });

  const [checkinStorage, setCheckinStorage] = useState(
    checkinStorage ? checkinStorage : []
  );

  let sortedEntries = checkinStorage.sort((a, b) => {
    return b.id - a.id;
  });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonNav}>
        <TouchableOpacity
          onPress={() => {
            setShowFull(true);
            setShowChecks(false);
            setShowFlags(false);
          }}
          delayPressIn={150}
        >
          <Text style={styles.add}>Full Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowFull(false);
            setShowChecks(true);
            setShowFlags(false);
          }}
          delayPressIn={150}
        >
          <Text style={styles.add}>Show Check-Ins</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowFull(true);
            setShowChecks();
            setShowFlags(true);
          }}
          delayPressIn={150}
        >
          <Text style={styles.add}>Show Flags</Text>
        </TouchableOpacity>
      </View>
      {sortedFull
        ? sortedFull.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.add}>
                {item.date}
                {item.face ? item.face : null}
                {item.myCheckin ? item.myCheckin : null}
                {item.X ? item.X : null}
                {}
              </Text>
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#1B2A41",
    flexDirection: "row",
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "2.5%",
    borderColor: "#D7D9D7",
  },
});

export { Report };
