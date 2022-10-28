// import {
//   Text,
//   StyleSheet,
//   View,
//   Alert,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { SimpleLineIcons } from "@expo/vector-icons";

// // in handle add
// (flag)
// flag: flag,

// const flagAlert = () => {
//   const pressTrue = () => {
//     let flag = true;
//     handleAdd(flag);
//   };

//   const pressFalse = () => {
//     let flag = false;
//     handleAdd(flag);
//   };

//   Alert.alert("Flag this for therapist?", `You can review it together.`, [
//     {
//       text: "Yes",
//       onPress: () => pressTrue(),
//     },

//     { text: "Nope", onPress: () => pressFalse() },
//   ]);
// };

// // under delete
// const errorCheck = () => {
//   if (!entry.replace(/\s+/g, "")) {
//     Alert.alert("Entry Error", `Fill out all fields to submit.`, [
//       { text: "Got It" },
//     ]);
//     return;
//   } else {
//     flagAlert();
//   }
// };

// const handleFlag = (i) => {
//   let currentItem = sortedEntries[i];
//   currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
//   storeData(focusStorage);
//   getData();
// };

// // handleFlag change storage

// <TouchableOpacity
// onPress={() => {
//   handleFlag(i);
// }}
// >
// <View style={styles.entryTop}>
//                 <Text style={styles.date}>{item.date}</Text>
//                 {item.flag ? <Text style={styles.title}>PageName</Text> : null}
//                 <TouchableOpacity
//                   onPress={() => {
//                     handleFlag(i);
//                   }}
//                 >
//                   <SimpleLineIcons
//                     style={
//                       item.flag ? [styles.fIcon, styles.selected] : styles.fIcon
//                     }
//                     name="flag"
//                   />
//                 </TouchableOpacity>
//               </View>

// // styles

// entryTop: {
//     flexDirection: "row",
//   },
//   fIcon: {
//     marginRight: 10,
//     paddingTop: 20,
//     paddingBottom: 20,
//     fontSize: 30,
//     color: "#D7D9D7",
//     textAlign: "center",
//   },
//   selected: {
//     color: "#D84C36",
//   },

//   {/* for the report render  */}
//   {item.flag ? <Text style={styles.title}>PageName</Text> : null}
