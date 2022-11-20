import { color } from "./colors";

export const look = {
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: color.bg,
  },
  border: {
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  topBox: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "90%",
    left: "5%",
  },
  // ___________________Top of the pages
  header: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: color.font,
  },
  checkWordHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "2%",
    marginBottom: "2%",
    fontSize: 20,
    fontWeight: "bold",
    color: color.font,
  },
  subHeader: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 15,
    fontWeight: "bold",
    color: color.font,
  },
  input: {
    borderWidth: 3,
    borderColor: color.border,
    borderRadius: 8,
    marginTop: 21,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: color.inputText,
    backgroundColor: "#D3EAEE",
  },
  userInput: {
    borderWidth: 3,
    borderColor: color.border,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: color.inputText,
    backgroundColor: "#D3EAEE",
  },
  // _________________________elements for menus
  element: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    // borderBottomColor: color.border,
    justifyContent: "flex-start",
  },
  elementHeader: {
    // borderWidth: 4,
    // borderColor: color.iconRed,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // ___________________________first menu items
  fElement: {
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    width: "90%",
    left: "5%",
  },
  fAdd: {
    marginTop: 10,
    textAlign: "flex-start",
    marginBottom: 2,
    fontWeight: "bold",
    color: "#D7D9D7",
    fontSize: 35,
    fontWeight: "bold",
    color: color.font,
  },
  fEmergency: {
    marginTop: 10,
    textAlign: "flex-start",
    marginBottom: 2,
    fontWeight: "bold",
    color: color.font,
    fontSize: 35,
    fontWeight: "bold",
    color: color.iconRed,
  },
  fSub: {
    marginTop: 5,

    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.7,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color.font,
  },
  fEsub: {
    marginTop: 5,
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.8,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color.iconRed,
  },
  // ___________________________elements for render pages
  renderElementBody: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    color: color.font,
    borderBottomColor: color.border,
    textAlign: "center",
    justifyContent: "flex-start",
    fontSize: 18,
  },
  date: {
    marginTop: 5,
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color.font,
  },
  pieBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarBox: {
    marginTop: "3%",
    marginBottom: "3%",
    flexDirection: "row",
    justifyContent: "center",
  },
  // ________________________Text & Icons
  add: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: color.font,
  },
  contactAdd: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    color: color.font,
  },
  sub: {
    marginTop: 5,
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.6,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: color.font,
  },
  inRoutine: {
    color: color.iconGreen,
    fontSize: 20,
  },
  outRoutine: {
    color: color.iconRed,
    fontSize: 20,
  },
  fIcon: {
    marginRight: 10,
    paddingTop: 10,
    fontSize: 18,
    color: color.font,
    textAlign: "center",
  },
  canIcon: {
    fontSize: 24,
  },
  selected: {
    color: color.iconRed,
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: color.font,
  },
  calendarIcon: {
    fontSize: 40,
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    color: color.font,
  },
  selectedCalIcon: {
    fontSize: 40,
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    color: color.iconGreen,
  },
  headerIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: color.font,
  },
  centerIcon: {
    paddingTop: 15,
    paddingBottom: 0,
    fontSize: 30,
    color: color.font,
    textAlign: "center",
  },
  right: {
    width: "47.5%",
    // borderWidth: 2,
    // borderColor: color.iconGreen,
  },
  left: {
    width: "47.5%",
  },
  pContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: color.bg,
  },
  reportButton: {
    // marginTop: 10,
    // textAlign: "center",
    padding: 4,
    fontSize: 30,
    fontWeight: "bold",
    color: color.font,
  },
  reportSelected: {
    color: color.iconGreen,
  },
  slider: {
    width: "70%",
    fontSize: 8,
    fontWeight: "bold",
    // textAlign: "center",
  },
  sliderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
    // borderWidth: 2,
    // borderColor: color.iconR,
  },
  checkMarginTop: {
    marginTop: "5%",
  },
  checkMarginRight: {
    marginRight: "5%",
  },
  checkBoxButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  clockFont: {
    // marginTop: 10,
    // textAlign: "center",
    fontSize: 70,
    color: color.font,
    opacity: 0.9,
  },
  screamIconSelected: {
    fontWeight: "bold",
    color: color.iconRed,
  },
  clock: {
    marginTop: "25%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  personalBest: {
    marginTop: "10%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 30,
    color: color.font,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleOff: {
    fontSize: 60,
    // backgroundColor: color.iconR,
    color: color.iconRed,
    opacity: 0.8,
    // overflow: "hidden",
  },
  toggleOn: {
    fontSize: 60,
    // backgroundColor: color.iconGreen,
    color: color.iconGreen,
    opacity: 0.8,
    // overflow: "hidden",
  },
  image: {
    width: "50%",
    height: 200,
    borderRadius: 15,
    marginBottom: "4%",
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  pieLetter: {
    marginRight: "3%",
    width: "5%",
    alignItems: "flex-end",
    color: color.border,
  },
  pieText: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: color.font,
    width: "85%",
  },
  left: {
    flex: 8,
  },
  right: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: color.iconGreen,
    fontSize: 20,
    left: "10%",
  },
};
// ______________________template for entry pages
// return (
// <View style={look.container}>
//  <KeyboardAwareScrollView extraHeight={200}>
//   <View style={look.topBox}>
//   <View style={look.header}></View>
//   <View style={look.subHeader}></View>
//     {/* input */}
//     {/* add icon style={[look.icon, look.centerIcon]} */}
//     {/* map  */}
//   <View style={look.border}></View>
//   <View style={look.elementHeader></View>
//   style={[look.icon, look.canIcon]}
//   <View style={look.element}></View>
// </View>
// </KeyboardAwareScrollView>
// </View>
// )
// };

// return (
//   <View style={look.container}>
//     <KeyboardAwareScrollView extraHeight={175}>
//       <View style={look.topBox}>
//         <View style={look.header}>
//           <Text style={look.add}>
//             Header
//           </Text>
//         </View>
//         <View style={look.subHeader}>
//           <Text style={look.sub}>
//             Sub Header
//           </Text>
//         </View>
//         <TextInput
//           style={look.input}
//           onChangeText={(text) => setEnt(text)}
//           value={entry}
//           placeholder={"what do you want to see?"}
//           multiline
//           keyboardType="default"
//           color=color.font
//           placeholderTextColor={"#F1F7EE"}
//         />
//         <View style={look.drawBox}>{/* draw feature */}</View>
//         <TouchableOpacity onPress={() => errorCheck()}>
//           <MaterialIcons
//             style={[look.icon, look.centerIcon]}
//             name="add-circle"
//           />
//         </TouchableOpacity>
//         <View>
//           {sortedEntries.map((item, i) => (
//             <View key={item.id} style={look.border}>
//               <View style={look.elementHeader}>
//                 <TouchableOpacity onPress={() => handleDelete({ item })}>
//                   <MaterialIcons
//                     style={[look.icon, look.canIcon]}
//                     name="delete-forever"
//                   />
//                 </TouchableOpacity>
//                 <Text style={look.date}>{item.date}</Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     handleFlag(i);
//                   }}
//                 >
//                   <SimpleLineIcons
//                     style={
//                       item.flag ? [look.fIcon, look.selected] : look.fIcon
//                     }
//                     name="flag"
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View style={look.element}>
//                 <Text style={look.add}>{item.entry}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   </View>
// );
// };
