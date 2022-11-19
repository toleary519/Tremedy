import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { elevatedOptions } from "./optionsList";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { look } from "../assets/styles";

const PercievedThreatMenu = ({ navigation }) => {
  // let endCheck = () => {
  //   Alert.alert(`Whoops!`, `You're already at the end of the list.`, [
  //     {
  //       text: "OK",
  //       style: "cancel",
  //       onPress: () => {
  //         return;
  //       },
  //     },
  //   ]);
  // };

  // const swapUp = (i) => {
  //   var temp = elevatedOptions[i];

  //   elevatedOptions[i] = elevatedOptions[i - 1];
  //   elevatedOptions[i - 1] = temp;

  //   storeData(elevatedOptions);
  //   getData();
  // };

  // const swapDown = (i) => {
  //   var temp = elevatedOptions[i];

  //   elevatedOptions[i] = elevatedOptions[i + 1];
  //   elevatedOptions[i + 1] = temp;

  //   storeData(elevatedOptions);
  //   getData();
  // };

  // const end = elevatedOptions.length - 1;

  return (
    <View style={look.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
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
// <View style={look.container}>
//   <View style={look.topBox}>
//     <View style={look.header}>
//       <Text style={look.add}>
//         Complete these exercises, pressing the buttons on the right to mark
//         them as you make your way through.
//       </Text>
//     </View>
//     <View style={look.border}>
//       <View style={look.element}>
//         <View style={styles.left}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Breathe")}
//             delayPressIn={150}
//           >
//             <Text style={look.add}>Breathe</Text>
//             <Text style={look.subHeader}>
//               A guided breathing animation.
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={look.right}>
//         <TouchableOpacity onPress={() => setBreatheDone(true)}>
//           <Feather
//             name="check-circle"
//             style={breatheDone ? look.icon : look.selected}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//     <View style={look.border}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("ProgressiveMuscle")}
//         delayPressIn={150}
//       >
//         <Text style={look.add}>
//           {`Progressive \n Muscle \n Relaxation`}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("PMRInstruct")}
//         delayPressIn={150}
//       >
//         <FontAwesome style={look.icon} name="question-circle" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setPMRDone(true)}>
//         <Feather
//           name="check-circle"
//           style={PMRDone ? look.iconDone : look.icon}
//         />
//       </TouchableOpacity>
//     </View>
//     <View style={look.border}>
//       <Text style={look.add}>Lateral Eye Movements</Text>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("EyeInstruct")}
//         delayPressIn={150}
//       >
//         <FontAwesome style={look.icon} name="question-circle" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setEyeDone(true)}>
//         <Feather
//           name="check-circle"
//           style={eyeDone ? look.iconDone : look.icon}
//         />
//       </TouchableOpacity>
//     </View>
//     <View style={look.border}>
//       <Text style={look.add}>Knead Feet</Text>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("KneadInstruct")}
//         delayPressIn={150}
//       >
//         <FontAwesome style={look.icon} name="question-circle" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setKneadDone(true)}>
//         <Feather
//           name="check-circle"
//           style={kneadDone ? look.iconDone : look.icon}
//         />
//       </TouchableOpacity>
//     </View>
//     <View style={look.border}>
//       <Text style={look.add}>Ankle Rock</Text>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("AnkleInstruct")}
//         delayPressIn={150}
//       >
//         <FontAwesome style={look.icon} name="question-circle" />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setAnklesDone(true)}>
//         <Feather
//           name="check-circle"
//           style={anklesDone ? look.iconDone : look.icon}
//         />
//       </TouchableOpacity>
//     </View>
//     <TouchableOpacity onPress={() => handleREDO()}>
//       <AntDesign style={look.icon} name="retweet" />
//     </TouchableOpacity>
//   </View>
// </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B2A41",
  },
  border: {
    flexDirection: "row",
    // width: "90%",
    justifyContent: "flex-start",
  },
  add: {
    marginTop: 21,
    // textAlign: "center",
    padding: 1,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  summary: {
    marginTop: 21,
    textAlign: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
    fontSize: 20,
    width: "90%",
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  breathe: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#D7D9D7",
    marginTop: 21,
    // textAlign: "center",
    // justifyContent: "flex-end",
    padding: 10,
    marginRight: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  instruction: {
    marginTop: 5,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 13,
    color: "#D7D9D7",
  },
  breatheIcon: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 28,
    color: "#D7D9D7",
  },
  iconDone: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 13,
    color: "green",
  },
  breatheIconDone: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40",
    padding: 10,
    marginTop: 28,
    color: "green",
  },
});

export { PercievedThreatMenu }