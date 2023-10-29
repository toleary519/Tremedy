import { Text, View } from "react-native";
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
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Physically</Text>
          <Text style={look.add}>{item.physical}</Text>
        </View>
      </View>
      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Insights & Thoughts</Text>
          <Text style={look.add}>{item.insights}</Text>
        </View>
      </View>
      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Emotions & Feelings</Text>
          <Text style={look.add}>{item.emotions}</Text>
        </View>
      </View>
      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>
            Spiritual connection to self, others or higher power
          </Text>
          <Text style={look.add}>{item.spiritual}</Text>
        </View>
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
        <View>
          <Text style={look.sub}>Initial Thought:</Text>
          <Text style={look.add}>{item.initial}</Text>
        </View>
      </View>
      <View style={look.element}>
        <View>
          <Text style={look.sub}>Rational Thought:</Text>
          <Text style={look.add}>{item.rational}</Text>
        </View>
      </View>
    </View>
  );
};

const CheckVal = (item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={look.sub}>
          {item.time} - {item.date}
        </Text>
      </View>
      <View
        style={[
          look.userHeader,
          { justifyContent: "space-between", color: "yellow" },
        ]}
      >
        <View>
          <Text style={[look.sub]}>Physical : {item.phys}</Text>
          <Text style={look.add}>{item.feelOne}</Text>
        </View>
        <View style={{ textAlign: "center", justifyContent: "center" }}>
          <Text style={look.sub}>Emotional : {item.mental}</Text>
          <Text style={look.add}>{item.feelTwo}</Text>
        </View>
        <View>
          <Text style={look.sub}>Outlook : {item.outlook}</Text>
          <Text style={look.add}>{item.feelThree}</Text>
        </View>
      </View>
      <View style={[look.element]}>
        {item.myCheckin ? (
          <Text style={[look.add]}>{item.myCheckin}</Text>
        ) : null}
      </View>
    </View>
  );
};

const CravingVal = (item) => {
  return (
    <View style={look.border}>
      <View style={look.elementHeader}>
        <Text style={look.sub}>{item.title}</Text>
        <Text style={[look.sub, { opacity: 0.9 }]}>
          Severity: {item.severity}
        </Text>
        <Text style={look.sub}>
          {item.time} - {item.date}
        </Text>
      </View>
      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Trigger</Text>
          <Text style={look.add}>{item.trigger}</Text>
        </View>
      </View>

      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Who / Where</Text>
          <Text style={look.add}>{item.whereWho}</Text>
        </View>
      </View>
      <View style={look.element}>
        <View>
          <Text style={[look.sub, { marginTop: 2 }]}>Action</Text>
          <Text style={look.add}>{item.action}</Text>
        </View>
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
      {item.severity ? CravingVal(item) : null}
    </View>
  );
};

export { CheckVal, Entries };
