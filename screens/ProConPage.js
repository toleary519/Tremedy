import React,{ useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProCon = () => {
  
  const [proStorage, setProStorage] = useState(proStorage ? proStorage : [])
  const [pro, setPro] = useState();
  const [conStorage, setConStorage] = useState(conStorage ? conStorage : [])
  const [con, setCon] = useState();

  const getProData = async () => {
    try {
      const jsonProValue = await AsyncStorage.getItem('storedPro')
      let savedProData = jsonProValue ? JSON.parse(jsonProValue) : [];
      setProStorage(savedProData);
    } catch(e) {
      console.log(e)
    }
  }

  const storeProData = async (proStorage) => {
    try {
      const jsonProValue = JSON.stringify(proStorage)
      await AsyncStorage.setItem('storedPro', jsonProValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getConData = async () => {
    try {
      const jsonConValue = await AsyncStorage.getItem('storedCon')
      let savedConData = jsonConValue ? JSON.parse(jsonConValue) : [];
      setConStorage(savedConData);
    } catch(e) {
      console.log(e)
    }
  }

  const storeConData = async (conStorage) => {
    try {
      const jsonConValue = JSON.stringify(conStorage)
      await AsyncStorage.setItem('storedCon', jsonConValue)
    } catch (e) {
      console.log(e)
    }
  }
  
  const handleAddPro = () => {
        
        let newPro = {
          id: pro,
          message: pro
        };
        
        const newProsList = [...proStorage, newPro]
        
        setProStorage(newProsList);
        setPro("");
        storeProData(newProsList);
        getProData();
  }
  
  const handleAddCon = () => {
        
        let newCon = {
          id: con,
          message: con
        };
        
        const newConsList = [...conStorage, newCon]
        
        setConStorage(newConsList);
        setCon("");
        storeConData(newConsList);
        getConData();
  }

  const handleProDelete = ({ item }) => {
    let index = 0
    // find the index of item to delete
    for (let obj of proStorage) {
      if (obj.id !== item.id) {
        index++;
      }
      else {
        break;
      }
    }
    // filter array for display 
    setProStorage(proStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    proStorage.splice(index, 1)
    // save deletion of item
    storeProData(proStorage);
  }

  const handleConDelete = ({ item }) => {
    let index = 0
    // find the index of item to delete
    for (let obj of conStorage) {
      if (obj.id !== item.id) {
        index++;
      }
      else {
        break;
      }
    }
    // filter array for display 
    setConStorage(conStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    conStorage.splice(index, 1)
    // save deletion of item
    storeConData(conStorage);
  }

  React.useEffect(() => {
    getProData()
    getConData()
    }, []);

  return (
    <View style={styles.container}>
        <ScrollView style={styles.left}>
          <Text style={styles.title}>PROs</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(text) => setPro(text)} 
          value={pro}
          placeholder={"add new Pro"} 
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}    
          />
          <TouchableOpacity onPress={() => handleAddPro()}>
            <Ionicons style={styles.icon} name="add-circle"/>
          </TouchableOpacity>
          {proStorage.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.add}>{item.message}</Text>
                <TouchableOpacity onPress={() => handleProDelete({ item })}>
                  <MaterialIcons style={styles.deleteIcon} name="delete-forever"/>
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <ScrollView style={styles.right}>
        <Text style={styles.title}>CONs</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(text) => setCon(text)} 
          value={con}
          placeholder={"add new Con"} 
          multiline
          keyboardType="default"
          color="#D7D9D7"
          placeholderTextColor={"#F1F7EE"}      
          />
          <TouchableOpacity onPress={() => handleAddCon()}>
            <Ionicons style={styles.icon} name="add-circle" />
          </TouchableOpacity>
            {conStorage.map((item) => (
            <View key={item.id} style={styles.pieContainer}>
              <Text style={styles.add}>{item.message}</Text>
                <TouchableOpacity onPress={() => handleConDelete({ item })}>
                  <MaterialIcons style={styles.deleteIcon} name="delete-forever"/>
                </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
    </View>
   )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#1B2A41"
  },
  right: {
    width: "47.5%",
    // borderWidth: 2,
    // borderColor: "green",
  },
  left: {
    width: "47.5%",
    // borderWidth: 2,
    // borderColor: "red",
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 3,
    margin: 3,
    borderColor: "#D7D9D7",
  },
  add: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 25,
    color: "#D7D9D7",
  },
  input: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 25,
  },
  button: {
    color: "#D7D9D7",
  },
  icon: { 
    justifyContent: "center",
    alignItems: "center",
    left: "30%",
    fontSize: 35, 
    padding: 20,
    color: "#D7D9D7"
  }, 
  deleteIcon: {
    paddingTop: 5,
    paddingBottom: 10,
    left: "42.5%",
    fontSize: 30,
    color: "#D7D9D7",
  },
});

export default ProCon;