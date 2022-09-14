import React,{ useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, Button } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const ProCon = () => {

  let prosList = [{id: 1, message: "no hangover"}]
  let consList = [{id: 1, message: "hangover"}]
  
  const [showPros, setShowPros] = useState(prosList)
  const [pro, setPro] = useState("")
  
  const handleAddPro = () => {
        
        let newPro = {
          id: showPros.length + 1,
          message: pro
        };
        
        const newProsList = [...showPros, newPro]
        
        setShowPros(newProsList);
        setPro("");
      }

  const [showCons, setShowCons] = useState(consList)
  const [con, setCon] = useState("")
  
  const handleAddCon = () => {
        
        let newCon = {
          id: showCons.length + 1,
          message: con
        };
        
        const newConsList = [...showCons, newCon]
        
        setShowCons(newConsList);
        setCon("");
      }


  return (
    <View style={styles.container}>
        <ScrollView style={styles.left}>
          <Text style={styles.title}>PROs</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(text) => setPro(text)} 
          placeholder={"add new Pro"} 
          multiline
          keyboardType="default"  
          />
          <Button onPress={() => handleAddPro()} title="add"> Add Pro </Button>
            {showPros.map((item) => (
              <Text key={item.id} style={styles.add}>{item.message}</Text>
              ))}
        </ScrollView>
        <ScrollView style={styles.right}>
        <Text style={styles.title}>CONs</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(text) => setCon(text)} 
          placeholder={"add new Con"} 
          multiline
          keyboardType="default"  
          />
          <Button style={styles.button} onPress={() => handleAddCon()} title="add"> Add Con </Button>
            {showCons.map((item) => (
              <Text key={item.id} style={styles.add}>{item.message}</Text>
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
    width: "50%",
    // borderWidth: 2,
    // borderColor: "green",
  },
  left: {
    width: "50%",
    // borderWidth: 2,
    // borderColor: "red",
  },
  add: {
    // borderRadius: 10,
    // borderWidth: 4,
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 20,
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
    fontSize: 25,
    textAlign: "center",
    paddingTop: 25,
  },
  button: {
    color: "#D7D9D7",
  }

  // icon: {
  //   borderRadius: "3px",
  //   borderColor: "red",    
  //   justifyContent: "center",
  //   alignItems: "center",
  //   fontSize: "60", 
  //   padding: 60,
  //   color: "#1B2A41"
  // }
});

export default ProCon;