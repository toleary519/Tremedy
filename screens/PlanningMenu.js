import React from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { look } from "../assets/styles";

const PlanningMenu = ({ navigation }) => {
  return (
    <View style={look.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={[look.add, { fontSize: 22 }]}>
              {`There isn't anything to plan.\nTalk to someone.\nLook back.\nGo meet.`}
            </Text>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SupportContacts")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.add}>Your Support Contacts</Text>
                  <Text style={look.sub}>
                    Give someone a call, talk it through.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NotesMenu")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.add}>Experiences</Text>
                  <Text style={look.sub}>
                    Take a look at what you could be giving up and what you have
                    to stay strong for now.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={look.border}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Meetings")}
              delayPressIn={150}
            >
              <View style={look.element}>
                <View>
                  <Text style={look.add}>Meetings</Text>
                  <Text style={look.sub}>
                    Find meetings in your area happening now.
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export { PlanningMenu };
