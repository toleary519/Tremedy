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
    fontSize: 12,
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
    // borderWidth: 2,
    // borderColor: "red",
  },
  pContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1B2A41",
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