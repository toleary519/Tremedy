import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { A } from '@expo/html-elements';
import * as Location from 'expo-location';

const Smart = () => {
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
      console.log("location object: ****", location)

      let address = await Location.reverseGeocodeAsync(location.coords);
      setAddress(address[0].city);
      console.log("address object: ****", address[0].city);

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (

    <View style={styles.container}>
      <A style={styles.add} href={`https://meetings.smartrecovery.org/meetings/?coordinates=100&location=${address}`}>See Meetings</A>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#1B2A41"
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 45,
    fontWeight: "bold",
    color: "#D7D9D7",
  },

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

export { Smart };