import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { breathAnimation } from "../assets/breathAnimation.gif";

const Breathe = () => {

    return (
      <View style={styles.container}>
        <Image style={{ height: '80%', width: '100%' }} source={require("../assets/breathAnimation.gif")}/>
      </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA"
  },
  // add: {
  //   borderRadius: 10,
  //   borderWidth: 4,
  //   borderColor: "#D7D9D7",
  //   marginTop: 21,
  //   textAlign: "center",
  //   justifyContent: "flex-end",
  //   padding: 10,
  //   fontSize: 45,
  //   fontWeight: "bold",
  //   color: "#D7D9D7",
  // },

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

export { Breathe }