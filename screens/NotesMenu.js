import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { look } from "../assets/styles";

const NotesMenu = ({ navigation }) => (
  <View style={look.container}>
    <View style={look.topBox}>
      <View style={look.header}>
        <Text style={look.add}>
          Record and reflect on moments from your life. When positive events or
          feelings find you, write them down. If you need to review some
          negatives in your past, write them down as well.
        </Text>
      </View>
      <View style={look.subHeader}>
        <Text style={look.sub}>Remind yourself how far you've come.</Text>
      </View>
      <View style={look.border}>
        <View style={look.element}>
          <TouchableOpacity
            onPress={() => navigation.navigate("GoodTimes")}
            delayPressIn={150}
          >
            <Text style={[look.add, { fontSize: 30, marginTop: "7%" }]}>
              The good times.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={look.border}>
        <View style={look.element}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BadTimes")}
            delayPressIn={150}
          >
            <Text style={[look.add, { fontSize: 30 }]}>The bad times.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);


export { NotesMenu }