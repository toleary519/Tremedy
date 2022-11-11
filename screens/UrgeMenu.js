import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { look } from "../assets/styles";

const UrgeMenu = ({ navigation }) => (
  <View style={look.container}>
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={look.topBox}>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("JustOne")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <View>
                <Text style={look.add}>I'm just going to have one.</Text>
                <Text style={look.sub}>Are you kidding me?</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PlanningMenu")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <Text style={look.add}>I'm planning</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OutsideMenu")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <Text style={look.add}>I'm outside the store</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Using")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <Text style={look.add}>I'm already using</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportContacts")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <View>
                <Text style={look.add}>Support Contacts</Text>
                <Text style={look.sub}>
                  You can do what you want. You know that, but call someone
                  first.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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

export { UrgeMenu }