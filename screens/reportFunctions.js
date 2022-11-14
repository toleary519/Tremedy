import { Text, View, Alert, TextInput, TouchableOpacity } from "react-native";
import { look } from "../assets/styles";

const SingleVal = (x, item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={look.sub}>{item.date}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>{x}</Text>
      </View>
    </View>
  );
};

const PieVal = (item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={look.sub}>{item.date}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>P: {item.physical}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>I: {item.insights}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>E: {item.emotions}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>S: {item.spiritual}</Text>
      </View>
    </View>
  );
};

const SelfVal = (item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={look.sub}>{item.date}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>Initial Thought: {item.initial}</Text>
      </View>
      <View style={look.element}>
        <Text style={look.add}>Rational Thought: {item.rational}</Text>
      </View>
    </View>
  );
};

const CheckVal = (item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={look.sub}>{item.date}</Text>
      </View>
      <View style={look.elementHeader}>
        <Text style={look.sub}>Physical : {item.phys}</Text>
        <Text style={look.sub}>Emotional : {item.mental}</Text>
        <Text style={look.sub}>Outlook : {item.outlook}</Text>
      </View>
      <View style={look.elementHeader}>
        <Text style={look.add}>{item.feelOne}</Text>
        <Text style={look.add}>{item.feelTwo}</Text>
        <Text style={look.add}>{item.feelThree}</Text>
      </View>
      <View style={look.element}>
        {item.myCheckin ? <Text style={look.add}>{item.myCheckin}</Text> : null}
      </View>
    </View>
  );
};

const Entries = (item) => {
  return (
    <View>
      {item.check ? CheckVal(item) : null}
      {item.myCoping ? SingleVal(item.myCoping, item) : null}
      {item.myThat ? SingleVal(item.myThat, item) : null}
      {item.myFocus ? SingleVal(item.myFocus, item) : null}
      {item.myBad ? SingleVal(item.myBad, item) : null}
      {item.myGood ? SingleVal(item.myGood, item) : null}
      {item.myValue ? SingleVal(item.myValue, item) : null}
      {item.physical ? PieVal(item) : null}
      {item.initial ? SelfVal(item) : null}
    </View>
  );
};


export { SingleVal, PieVal, SelfVal, CheckVal, Entries };
