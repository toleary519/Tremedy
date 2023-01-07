import React from "react";
import { Text, View, ScrollView } from "react-native";
import { look } from "../assets/styles";

const Terms = () => {
  return (
    <View style={look.container}>
      <ScrollView showsVerticalScrollIndicator={false} extraHeight={175}>
        <View style={look.topBox}>
          <Text style={look.input}>
            I understand that this application is not a substitute for
            professional therapy or medical attention. I understand that this
            application does not provide medical advice. I understand that all
            information entered into this application other than user settings
            are contained within my device in an unencrypted fashion similar to
            a “notes” application. I understand that this application contains
            email capability and that who I share those emails with, if anyone,
            is my responsibility and is in no way is the responsibility of the
            application or its creator.
          </Text>
          <Text style={[look.input, { marginTop: "2%" }]}>
            If you or someone you know is experiencing mental distress reach out
            to a licensed medical professional or in an emergency call 911.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export { Terms };
