import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Routine = ({ navigation }) => {
  let [selectedRoutine, setSelectedRoutine] = useState(
    selectedRoutine ? selectedRoutine : []
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("savedRoutine");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setSelectedRoutine(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (XY) => {
    try {
      const jsonValue = JSON.stringify(XY);
      await AsyncStorage.setItem("savedRoutine", jsonValue);
    } catch (e) {
      console.log("1", e);
    }
  };

  let endCheck = () => {
    Alert.alert(`Whoops!`, `You're already at the end of the list.`, [
      {
        text: "OK",
        style: "cancel",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const swapUp = (i) => {
    var temp = selectedRoutine[i];

    selectedRoutine[i] = selectedRoutine[i - 1];
    selectedRoutine[i - 1] = temp;

    storeData(selectedRoutine);
    getData();
  };

  const swapDown = (i) => {
    var temp = selectedRoutine[i];

    selectedRoutine[i] = selectedRoutine[i + 1];
    selectedRoutine[i + 1] = temp;

    storeData(selectedRoutine);
    getData();
  };

  const end = selectedRoutine.length - 1;

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {selectedRoutine
          ? selectedRoutine.map((item, i) => (
              <View key={item.id} style={styles.element}>
                <TouchableOpacity
                  onPress={i === end ? () => endCheck() : () => swapDown(i)}
                  style={styles.left}
                  delayPressIn={150}
                >
                  <Feather name="chevrons-down" style={styles.arrow} />
                </TouchableOpacity>
                <View style={styles.middle}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.pageName)}
                    delayPressIn={150}
                  >
                    <Text style={styles.add}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={i === 0 ? () => endCheck() : () => swapUp(i)}
                  style={styles.right}
                  delayPressIn={150}
                >
                  <Feather name="chevrons-up" style={styles.arrow} />
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
  element: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#F4743B",
    backgroundColor: "#D2EAEB",
    marginTop: 21,
    width: "90%",
    left: "5%",
  },
  add: {
    color: "#1B2A41",
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  arrow: {
    color: "#1B2A41",
    fontSize: 24,
  },
  left: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
  middle: {
    flex: 8,
    // borderWidth: 2,
    // borderColor: "black",
  },
  right: {
    flex: 1,
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
});

export { Routine };
