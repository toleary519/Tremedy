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
  let [reportStorage, setReportStorage] = useState(
    reportStorage ? reportStorage : []
  );
  let [pastReports, setPastReports] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("reportArray");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setReportStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  let currentDate = new Date().getTime();
  let weekAgo = currentDate - 7 * 24 * 60 * 60 * 1000;
  //   let range = currentDate - weekAgo;

  let fullReport = reportStorage
    .filter((x) => x.id >= weekAgo)
    .sort((a, b) => {
      return b.id - a.id;
    });

  let fullChecks = fullReport
    .filter((x) => !x.flagged)
    .sort((a, b) => {
      return b.id - a.id;
    });

  let fullFlags = fullReport
    .filter((x) => !x.face)
    .sort((a, b) => {
      return b.id - a.id;
    });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.buttonNav}>
          <TouchableOpacity
            onPress={() => {
              setShowFull(true);
              setShowChecks(false);
              setShowFlags(false);
            }}
            delayPressIn={150}
          >
            <Text style={styles.menuButton}>Full Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFull(false);
              setShowChecks(true);
              setShowFlags(false);
            }}
            delayPressIn={150}
          >
            <Text style={styles.menuButton}>Check-Ins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowFull(false);
              setShowChecks(false);
              setShowFlags(true);
            }}
            delayPressIn={150}
          >
            <Text style={styles.menuButton}>Flags</Text>
          </TouchableOpacity>
        </View>
        {reportStorage ? (
          <View style={{ marginTop: 30 }}>
            {showFull
              ? fullReport.map((item) => (
                  <View key={item.id} style={styles.pieContainer}>
                    <Text style={[styles.add, { fontSize: 15 }]}>
                      {item.date}
                    </Text>
                    <Text
                      style={[
                        styles.add,
                        { paddingRight: 10, paddingLeft: 10 },
                      ]}
                    >
                      {item.face ? item.face : null}
                    </Text>
                    <Text style={styles.add}>
                      {item.myCheckin ? item.myCheckin : null}
                    </Text>

                    {/* {item.X ? item.X : null} */}
                  </View>
                ))
              : null}
            {showChecks
              ? fullChecks.map((item) => (
                  <View key={item.id} style={styles.pieContainer}>
                    <Text style={styles.add}>
                      {item.date}
                      {item.face ? item.face : null}
                      {item.myCheckin ? item.myCheckin : null}
                      {/* {item.X ? item.X : null} */}
                    </Text>
                  </View>
                ))
              : null}
            {showFlags
              ? fullFlags.map((item) => (
                  <View key={item.id} style={styles.pieContainer}>
                    <Text style={styles.add}>
                      {item.date}
                      {item.face ? item.face : null}
                      {item.myCheckin ? item.myCheckin : null}
                      {/* {item.X ? item.X : null} */}
                    </Text>
                  </View>
                ))
              : null}
          </View>
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
};;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
    flexDirection: "column",
  },
  add: {
    // borderRadius: 10,
    // borderWidth: 4,
    // borderColor: "#D7D9D7",
    margin: 5,
    // width: "80%",
    // left: "10%",
    textAlign: "center",
    alignItems: "center",
    // padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  buttonNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuButton: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    textAlign: "center",
    padding: 8,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 7,
    width: "90%",
    left: "5%",
    borderColor: "#D7D9D7",
  },
});

export { Report };
