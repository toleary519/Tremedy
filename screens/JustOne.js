import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { look } from "../assets/styles";

const JustOne = ({ navigation }) => {
  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={[look.border, { paddingBottom: "4%", paddingTop: "2%" }]}>
          <Text style={look.add}>
            Are you kidding me? You know that it isn't going to be just one.
            Don't give up.
          </Text>
          <Text style={[look.add, { marginTop: "4%" }]}>
            Look at these. Is the short term worth the long term?
          </Text>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("GoodTimes")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <View>
                <Text style={[look.add, { fontSize: 30 }]}>The positives.</Text>
                <Text style={look.sub}>
                  Look at some of the things you could be giving up.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={look.border}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BadTimes")}
            delayPressIn={150}
          >
            <View style={look.element}>
              <View>
                <Text style={[look.add, { fontSize: 30 }]}>The negatives.</Text>
                <Text style={look.sub}>Do we want to go back to this?</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { JustOne };
