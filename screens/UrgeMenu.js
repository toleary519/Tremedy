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
              <View>
                <Text style={look.add}>I'm planning</Text>
                <Text style={look.sub}>Let's get you off that ledge.</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Using")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <View>
                <Text style={look.add}>I've gone backwards</Text>
                <Text style={look.sub}>
                  Let's get back on track. Here we go.
                </Text>
              </View>
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

export { UrgeMenu }