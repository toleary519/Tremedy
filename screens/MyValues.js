import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { A } from "@expo/html-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyValues = () => {
  const [storage, setStorage] = useState(storage ? storage : []);
  const [myValue, setMyValue] = useState("");

  let sortedEntries = storage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedValues");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setStorage(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (storage) => {
    try {
      const jsonValue = JSON.stringify(storage);
      await AsyncStorage.setItem("storedValues", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let orderId = currentDate.getTime();

    let newValue = {
      id: orderId,
      flag: flag,
      myValue: myValue,
    };

    const newList = [...storage, newValue];

    setStorage(newList);
    setMyValue("");
    storeData(newList);
    getData();
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

    Alert.alert("Flag this for therapist?", `You can review it together.`, [
      {
        text: "Yes",
        onPress: () => pressTrue(),
      },

      { text: "Nope", onPress: () => pressFalse() },
    ]);
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of storage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setStorage(storage.filter((val) => val.id !== item.id));
    // make permanent delete
    storage.splice(index, 1);
    // save deletion of item
    storeData(storage);
  };

  const errorCheck = () => {
    if (!myValue.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      flagAlert();
    }
  };

  const handleFlag = (i) => {
    let currentItem = sortedEntries[i];
    currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
    storeData(storage);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView extraHeight={200}>
        <Text style={styles.header}>
          Look through your core values and assess how this action would align
          with them.
        </Text>
        <Text style={styles.headerTwo}>
          If you are unsure, look through this list of values and take some time
          to choose a few that truly resonate with you.
        </Text>
        <A
          style={styles.link}
          href={`https://www.guilford.com/add/miller2/values.pdf`}
        >
          Core Values List
        </A>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMyValue(text)}
          value={myValue}
          placeholder={"new value"}
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}
        />
        <TouchableOpacity
          onPress={() => {
            errorCheck();
          }}
        >
          <MaterialIcons style={styles.icon} name="add-circle" />
        </TouchableOpacity>
        <View>
          {sortedEntries.map((item, i) => (
            <View key={item.id} style={styles.pieContainer}>
              <View style={styles.entryTop}>
                <TouchableOpacity
                  onPress={() => {
                    handleFlag(i);
                  }}
                >
                  <SimpleLineIcons
                    style={
                      item.flag ? [styles.fIcon, styles.selected] : styles.fIcon
                    }
                    name="flag"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.add}>{item.myValue}</Text>
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
    marginLeft: "2.5%",
    width: "95%",
    borderColor: "#D7D9D7",
    flexDirection: "row",
    justifyContent: "center",
  },
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    width: "95%",
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  link: {
    width: "95%",
    left: "2.5%",
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "#FC9F5B",
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
    right: "50%",
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
  entryTop: {
    flexDirection: "row",
  },
  fIcon: {
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  selected: {
    color: "#D84C36",
  },
});

export { MyValues };
