import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { elevatedOptions } from "../helpers/optionsList";
import { look } from "../assets/styles";

const PercievedThreatMenu = ({ navigation }) => {
  return (
    <View style={look.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={look.topBox}>
          {elevatedOptions
            ? elevatedOptions.map((item, i) => (
                <View
                  key={item.id}
                  style={[
                    look.element,
                    { flex: 6, flexDirection: "row" },
                    look.border,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.pageName)}
                    delayPressIn={150}
                  >
                    <Text style={look.add}>{item.title}</Text>
                    <Text style={look.sub}>{item.sub}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  ></View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export { PercievedThreatMenu };
