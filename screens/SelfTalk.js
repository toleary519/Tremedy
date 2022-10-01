import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelfTalk = () => {
  const [selfTalk, setSelfTalk] = useState(selfTalk ? selfTalk : []);
  const [initial, setInitial] = useState("");
  const [rational, setRational] = useState("");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedSelfTalk");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setSelfTalk(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (selfTalk) => {
    try {
      const jsonValue = JSON.stringify(selfTalk);
      await AsyncStorage.setItem("storedSelfTalk", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = () => {
    let newSelfTalk = {
      id: `${rational}${initial}`,
      initial: initial,
      rational: rational,
    };

    const newList = [...selfTalk, newSelfTalk];

    setSelfTalk(newList);
    setInitial("");
    setRational("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of selfTalk) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setSelfTalk(selfTalk.filter((val) => val.id !== item.id).reverse());
    // make permanent delete
    selfTalk.splice(index, 1);
    // save deletion of item
    storeData(selfTalk.reverse());
  };

  const errorCheck = () => {
    if (!initial.replace(/\s+/g, "") || !rational.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      handleAdd();
    }
  };

  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  // let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={400}>
        <Text style={styles.header}>
          What is the thought that you are having?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInitial(text)}
          value={initial}
          placeholder={"new entry"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <Text style={styles.headerTwo}>
          Take a moment to evaluate this thought. Modfy the language, have you
          added negative distortions? Try to write a more resonably framed
          thought in the field below.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRational(text)}
          value={rational}
          placeholder={"new entry"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <Text style={styles.headerTwo}>
          Look at the two side by side below and consider the differences. Run
          the exercize again if something new comes to mind.
        </Text>
        <TouchableOpacity onPress={() => errorCheck()}>
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {selfTalk.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.date}>
                {currentMonth}/{currentDay}/{currentYear}
              </Text>
              <Text style={styles.add}> Initial Thought: {item.initial}</Text>
              <Text style={styles.add}> Rational Thought: {item.rational}</Text>
              <TouchableOpacity onPress={() => handleDelete({ item })}>
                <MaterialIcons
                  style={styles.deleteIcon}
                  name="delete-forever"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41",
    paddingBottom: 15,
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
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    marginTop: 5,
    width: "95%",
    left: "2.5%",
    textAlign: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  date: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  headerTwo: {
    // borderRadius: 10,
    // borderWidth: 4,
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    left: "45%",
    fontSize: 30,
    color: "#D7D9D7",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "80%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
});

export { SelfTalk };
