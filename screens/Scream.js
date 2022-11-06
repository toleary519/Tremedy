import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const Scream = () => {
  const [best, setBest] = useState(best ? best : null);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("screamBest");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      setBest(savedData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (best) => {
    try {
      const jsonValue = JSON.stringify(best);
      await AsyncStorage.setItem("screamBest", jsonValue);
    } catch (e) {
      console.log("1", e);
    }
  };

  const highScore = () => {
    let a = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let b = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    let c = ("0" + ((time / 10) % 100)).slice(-2);
    let bestTotal = best ? best[0] + best[1] + best[2] : 0;
    if (a + b + c > bestTotal) {
      setBest([a, b, c]);
      let newBest = [a, b, c];
      storeData(newBest);
      getData();
    }
    setTime(0);
    return;
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View>
          <View style={[look.border, { paddingBottom: "3%" }]}>
            <Text style={look.header}>
              Some times you just have to scream like a banshee at the moon.
            </Text>
            <Text style={look.sub}>Free to go, no audio is saved.</Text>
          </View>
          <View style={look.elementHeader}>
            <Text style={[look.sub]}>Personal Best :</Text>
            <Text style={look.sub}>
              {best ? `  ${best[0]}:${best[1]}:${best[2]}` : `  00:00:00`}
            </Text>
          </View>
          <View style={look.clock}>
            <View style={look.pieBox}>
              <Text style={look.clockFont}>
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </Text>
              <Text style={look.clockFont}>
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
              </Text>
              <Text style={look.clockFont}>
                {("0" + ((time / 10) % 100)).slice(-2)}
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={
                  running
                    ? () => {
                        setRunning(false), highScore();
                      }
                    : () => setRunning(true)
                }
              >
                <FontAwesome5
                  name="stopwatch"
                  size={90}
                  color={running ? "red" : "#D7D9D7"}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setBest(null);
                storeData(null);
                getData();
              }}
            >
              <Text style={[look.sub, { marginTop: "10%", opacity: 0.8 }]}>
                Reset Personal Best
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { Scream };
