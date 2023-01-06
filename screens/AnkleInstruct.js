import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { look } from "../assets/styles";

const AnkleInstruct = () => {
  useEffect(() => {
    // Analytics.record({ name: "Ankle Page Visit" });
  }, []);

  return (
    <View style={look.container}>
      <View style={look.topBox}>
        <View style={[look.border, { marginBottom: "4%" }]}>
          <Text style={[look.add, { marginBottom: "2%" }]}>
            Stand with your feet 3-4 inches apart and gently rock right and left
            onto the sides of your feet.
          </Text>
        </View>
      </View>
    </View>
  );
};

export { AnkleInstruct };
