import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { look } from "../assets/styles";

const Using = ({ navigation }) => (
  <View style={look.container}>
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={look.topBox}>
        <View style={look.border}>
          <View style={look.element}>
            <View>
              <Text style={[look.add]}>Letter From Yourself</Text>
              <Text style={[look.sub]}>
                Read a letter of support from yourself.
              </Text>
            </View>
          </View>
        </View>
        <View style={look.element}>
          <View>
            <Text style={look.add}>Game Plan</Text>
            <Text style={look.sub}>
              We fucked up, it's okay, here's what we're gonna do.
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%" }]}>
          <View>
            <Text style={look.add}>
              You're going to call someone from this support list.
            </Text>
            <Text style={look.sub}>
              If the first person doesn't pick up, keep going. Keep going until
              you get someone.
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "4%", paddingTop: "2%" }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportContacts")}
            delayPressIn={150}
          >
            <Text style={[look.add, { textAlign: "center" }]}>
              Your Support Contacts
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>Tell them what happened.</Text>
            <Text style={look.sub}>
              Are you okay? Be honest, go slow. Don't try to gloss things over,
              say what is happening.
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>
              Ask is they have time to unpack this with you.
            </Text>
            <Text style={look.sub}>
              It's going to take a bit, and if they say no that is okay. Stay
              the course.
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>How you were feeling when it happened?</Text>
            <Text style={look.sub}>
              What happened in the last 24 hours? When did you start to move in
              this direction?
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>Where you are now.</Text>
            <Text style={look.sub}>
              Are you at home, are you out? Do you have anything left in the
              house or on you?
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>What's your next step?</Text>
            <Text style={look.sub}>
              What do you need to do right now? Talk, vent, be picked up?
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>
              Make a plan of managable action oriented steps.
            </Text>
            <Text style={look.sub}>
              What are you going to do in the next 5 minutes, 30 minutes, 1
              hour, in the morning and tomorrow?
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>Ask them to check in on you tomorrow.</Text>
            <Text style={look.sub}>
              What time are they going to call and what should they do if you do
              not pick up?
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "2%", paddingTop: "2%" }]}>
          <View>
            <Text style={look.add}>
              Get some water. Do a breating exercize.
            </Text>
            <Text style={look.sub}>
              Set some alarms for your call. Do some of these exercises to calm
              down. If you can, go to sleep. call someone else.
            </Text>
          </View>
        </View>
        <View style={[look.border, { paddingBottom: "4%", paddingTop: "2%" }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PercievedThreatMenu")}
            delayPressIn={150}
          >
            <Text style={[look.add, { textAlign: "center" }]}>
              Let's calm down
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);

export { Using };