import React,{ useState } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { look } from "../assets/styles";
import { color } from "../assets/colors";

const ProCon = () => {
  const [proStorage, setProStorage] = useState(proStorage ? proStorage : []);
  const [pro, setPro] = useState();
  const [conStorage, setConStorage] = useState(conStorage ? conStorage : []);
  const [con, setCon] = useState();

  const getProData = async () => {
    try {
      const jsonProValue = await AsyncStorage.getItem("storedPro");
      let savedProData = jsonProValue ? JSON.parse(jsonProValue) : [];
      setProStorage(savedProData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeProData = async (proStorage) => {
    try {
      const jsonProValue = JSON.stringify(proStorage);
      await AsyncStorage.setItem("storedPro", jsonProValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getConData = async () => {
    try {
      const jsonConValue = await AsyncStorage.getItem("storedCon");
      let savedConData = jsonConValue ? JSON.parse(jsonConValue) : [];
      setConStorage(savedConData);
    } catch (e) {
      console.log(e);
    }
  };

  const storeConData = async (conStorage) => {
    try {
      const jsonConValue = JSON.stringify(conStorage);
      await AsyncStorage.setItem("storedCon", jsonConValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddPro = () => {
    let newPro = {
      id: pro,
      message: pro,
    };

    const newProsList = [...proStorage, newPro];

    setProStorage(newProsList);
    setPro("");
    storeProData(newProsList);
    getProData();
  };

  const handleAddCon = () => {
    let newCon = {
      id: con,
      message: con,
    };

    const newConsList = [...conStorage, newCon];

    setConStorage(newConsList);
    setCon("");
    storeConData(newConsList);
    getConData();
  };

  const handleProDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of proStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setProStorage(proStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    proStorage.splice(index, 1);
    // save deletion of item
    storeProData(proStorage);
  };

  const handleConDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of conStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setConStorage(conStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    conStorage.splice(index, 1);
    // save deletion of item
    storeConData(conStorage);
  };

  React.useEffect(() => {
    getProData();
    getConData();
  }, []);

  return (
    <View style={look.container}>
      <View style={look.proTopBox}>
        <ScrollView>
          <View style={[look.proLeft, { minWidth: "100%" }]}>
            <View style={look.header}>
              <Text style={[look.add, { fontSize: 22, textAlign: "center" }]}>
                PROs
              </Text>
            </View>
            <TextInput
              style={[look.proInput]}
              onChangeText={(text) => setPro(text)}
              value={pro}
              placeholder={"add pro ..."}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
            <View>
              <TouchableOpacity onPress={() => handleAddPro()}>
                <Ionicons
                  style={[look.icon, look.centerIcon]}
                  name="add-circle"
                />
              </TouchableOpacity>
            </View>
            {proStorage.map((item) => (
              <View key={item.id} style={look.proBorder}>
                <View style={look.elementHeader}>
                  <TouchableOpacity onPress={() => handleProDelete({ item })}>
                    <MaterialIcons
                      style={[look.icon, look.canIcon]}
                      name="delete-forever"
                    />
                  </TouchableOpacity>
                </View>
                <View style={look.element}>
                  <Text style={look.add}>{item.message}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView>
          <View style={[look.proRight, { minWidth: "100%" }]}>
            <View style={look.header}>
              <Text style={[look.add, { fontSize: 22, textAlign: "center" }]}>
                CONs
              </Text>
            </View>
            <TextInput
              style={[look.proInput]}
              onChangeText={(text) => setCon(text)}
              value={con}
              placeholder={"add con ..."}
              placeholderTextColor={color.placeholderText}
              multiline
              keyboardType="default"
            />
            <View>
              <TouchableOpacity onPress={() => handleAddCon()}>
                <Ionicons
                  style={[look.icon, look.centerIcon]}
                  name="add-circle"
                />
              </TouchableOpacity>
            </View>
            {conStorage.map((item) => (
              <View key={item.id} style={[look.proBorder]}>
                <View style={look.elementHeader}>
                  <TouchableOpacity onPress={() => handleConDelete({ item })}>
                    <MaterialIcons
                      style={[look.icon, look.canIcon]}
                      name="delete-forever"
                    />
                  </TouchableOpacity>
                </View>
                <View style={look.element}>
                  <Text style={look.add}>{item.message}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export { ProCon };