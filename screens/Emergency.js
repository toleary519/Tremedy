import React, { useState, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import * as Location from 'expo-location';

const Emergency = ({ navigation }) => {

  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [address, setAddress] = useState();
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("location object: ****", location)

      let address = await Location.reverseGeocodeAsync({latitude : location.coords.latitude, longitude : location.coords.longitude});
      setAddress(address[0].city)
      // console.log("address object: ****", address[0].city);

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return(
  <View style={styles.container}>
  <TouchableOpacity delayPressIn={150}>
    <Text style={styles.add}>
    <A style={styles.add} href={`https://www.google.com/search?q=${address}+crisis+line`}>Crisis Lines</A>
     {/* <A href={`https://www.google.com/search?q=crisis+lines+near+${location.longitude}%2C+${location.latitude}`}>Crisis Lines</A>  */}
    </Text>
  </TouchableOpacity>
  <TouchableOpacity delayPressIn={150}>
    <Text style={styles.add}>
    <A style={styles.add} href={`https://www.google.com/search?q=${address}+hospitals`}>Hospitals</A>
     {/* <A href={`https://www.google.com/search?q=hospitals+near+${location.coords.longitude}%2C+${location.coords.latitude}`}>Hospitals</A> */}
    </Text>
  </TouchableOpacity>
  {/* <TouchableOpacity delayPressIn={150}>
    <Text style={styles.emergency}>
      CALL 911
    </Text>
  </TouchableOpacity> */}
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140,
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 20,
    width: "80%",
    left: "10%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    borderRadius: "3px",
    borderColor: "red",    
    justifyContent: "center",
    alignItems: "center",
    fontSize: "60", 
    padding: 40,
    color: "#1B2A41"
  }
});

export { Emergency }