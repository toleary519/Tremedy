export const look = {
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#1B2A41",
  },
  border: {
    borderBottomColor: "#3C5E90",
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
    color: "#D7D9D7",
  },
  checkWordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  subHeader: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 15,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  input: {
    borderWidth: 3,
    borderColor: "#3C5E90",
    borderRadius: 8,
    marginTop: 21,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
    backgroundColor: "#D3EAEE",
  },
  userInput: {
    borderWidth: 3,
    borderColor: "#3C5E90",
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
    backgroundColor: "#D3EAEE",
  },
  // _________________________elements for menus
  element: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "#3C5E90",
    justifyContent: "flex-start",
  },
  elementHeader: {
    // borderWidth: 4,
    // borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // ___________________________elements for render pages
  renderElementBody: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    color: "#D7D9D7",
    borderBottomColor: "#3C5E90",
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
    color: "#D7D9D7",
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
    color: "#D7D9D7",
  },
  sub: {
    marginTop: 5,
    textAlign: "flex-start",
    alignItems: "center",
    opacity: 0.6,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  inRoutine: {
    color: "green",
    fontSize: 20,
  },
  outRoutine: {
    color: "brown",
    fontSize: 20,
  },
  fIcon: {
    marginRight: 10,
    paddingTop: 10,
    fontSize: 18,
    color: "#D7D9D7",
    textAlign: "center",
  },
  canIcon: {
    fontSize: 24,
  },
  selected: {
    color: "#D84C36",
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
  },
  calendarIcon: {
    fontSize: 40,
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    color: "#D7D9D7",
  },
  selectedCalIcon: {
    fontSize: 40,
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    color: "green",
  },
  headerIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
  },
  centerIcon: {
    paddingTop: 15,
    paddingBottom: 0,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  right: {
    width: "47.5%",
    // borderWidth: 2,
    // borderColor: "green",
  },
  left: {
    width: "47.5%",
  },
  pContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1B2A41",
  },
  reportButton: {
    marginTop: 15,
    // textAlign: "center",
    padding: 4,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  reportSelected: {
    color: "green",
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
    // borderColor: "red",
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
    color: "#D7D9D7",
    opacity: 0.9,
  },
  screamIconSelected: {
    fontWeight: "bold",
    color: "red",
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
    color: "#D7D9D7",
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleOff: {
    fontSize: 60,
    // backgroundColor: "red",
    color: "red",
    opacity: 0.6,
    // overflow: "hidden",
  },
  toggleOn: {
    fontSize: 60,
    // backgroundColor: "green",
    color: "green",
    opacity: 0.8,
    // overflow: "hidden",
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
//           color="#D7D9D7"
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