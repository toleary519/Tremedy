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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

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
    <View style={look.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={look.topBox}>
          {selectedRoutine
            ? selectedRoutine.map((item, i) => (
                <View
                  key={item.id}
                  style={[
                    look.element,
                    { flex: 6, flexDirection: "row" },
                    look.border,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.pageName)}
                    delayPressIn={150}
                  >
                    <Text style={look.add}>{item.title}</Text>
                    <Text style={look.sub}>{item.sub}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={i === end ? () => endCheck() : () => swapDown(i)}
                      style={[look.outRoutine]}
                      delayPressIn={150}
                    >
                      <Feather
                        name="chevron-down"
                        style={[
                          look.outRoutine,
                          { fontSize: 35, marginRight: 20, opacity: 0.7 },
                        ]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={i === 0 ? () => endCheck() : () => swapUp(i)}
                      style={look.inRoutine}
                      delayPressIn={150}
                    >
                      <Feather
                        name="chevron-up"
                        style={[look.inRoutine, { fontSize: 35, opacity: 0.7 }]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

// used overflow: hidden below to prevent corners.


export { Routine };
