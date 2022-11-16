import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { look } from "../assets/styles";

const Pies = () => {
  const [pieStorage, setPieStorage] = useState(pieStorage ? pieStorage : []);
  const [token, setToken] = useState(token ? token : {});
  const [physical, setPhysical] = useState("");
  const [insights, setInsights] = useState("");
  const [emotions, setEmotions] = useState("");
  const [spiritual, setSpiritual] = useState("");

  let sortedEntries = pieStorage.sort((a, b) => {
    return b.id - a.id;
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("storedPie");
      const jsonTokValue = await AsyncStorage.getItem("storedUser");
      let savedData = jsonValue ? JSON.parse(jsonValue) : [];
      let savedTokData = jsonTokValue ? JSON.parse(jsonTokValue) : {};
      setPieStorage(savedData);
      setToken(savedTokData);
    } catch (e) {
      console.log(e);
    }
  };
  //  this is wrong it should be pieVVVVV
  const storeData = async (focusStorage) => {
    try {
      const jsonValue = JSON.stringify(focusStorage);
      await AsyncStorage.setItem("storedPie", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = (flag) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newPie = {
      id: orderId,
      flag: flag,
      title: "PIES Check-In",
      physical: physical,
      insights: insights,
      emotions: emotions,
      spiritual: spiritual,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...pieStorage, newPie];

    setPieStorage(newList);
    setPhysical("");
    setInsights("");
    setEmotions("");
    setSpiritual("");
    storeData(newList);
    getData();
  };

  const handleDelete = ({ item }) => {
    let index = 0;
    // find the index of item to delete
    for (let obj of pieStorage) {
      if (obj.id !== item.id) {
        index++;
      } else {
        break;
      }
    }
    // filter array for display
    setPieStorage(pieStorage.filter((val) => val.id !== item.id));
    // make permanent delete
    pieStorage.splice(index, 1);
    // save deletion of item
    storeData(pieStorage);
  };

  const flagAlert = () => {
    const pressTrue = () => {
      let flag = true;
      handleAdd(flag);
    };

    const pressFalse = () => {
      let flag = false;
      handleAdd(flag);
    };

    Alert.alert(
      `Flag this in "My Past Week?"`,
      `Manage your flags in User Settings.`,
      [
        {
          text: "Yes",
          onPress: () => pressTrue(),
        },

        { text: "Nope", onPress: () => pressFalse() },
      ]
    );
  };

  const errorCheck = () => {
    if (
      !physical.replace(/\s+/g, "") ||
      !insights.replace(/\s+/g, "") ||
      !emotions.replace(/\s+/g, "") ||
      !spiritual.replace(/\s+/g, "")
    ) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    }
    if (token.flags) {
      flagAlert();
    } else {
      let flag = false;
      handleAdd(flag);
    }
  };

  const handleFlag = (i) => {
    let currentItem = sortedEntries[i];
    currentItem.flag ? (currentItem.flag = false) : (currentItem.flag = true);
    storeData(pieStorage);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={look.container}>
      <KeyboardAwareScrollView extraHeight={200}>
        <View style={look.topBox}>
          <View style={look.header}>
            <Text style={[look.add, { fontSize: 26 }]}>
              How do you feel today?
            </Text>
          </View>
          {/* <View style={look.pieBox}>
            <Text style={look.add}>Physical Body</Text>
          </View> */}
          <TextInput
            style={look.input}
            onChangeText={(text) => setPhysical(text)}
            value={physical}
            placeholder={"Physical Body"}
            multiline
            keyboardType="default"
          />
          {/* <View style={look.pieBox}>
            <Text style={look.add}>Insights or Thoughts</Text>
          </View> */}
          <TextInput
            style={look.input}
            onChangeText={(text) => setInsights(text)}
            value={insights}
            placeholder={"Insights or Thoughts"}
            multiline
            keyboardType="default"
          />
          {/* <View style={look.pieBox}>
            <Text style={look.add}>Emotions or Feelings</Text>
          </View> */}
          <TextInput
            style={look.input}
            onChangeText={(text) => setEmotions(text)}
            placeholder={"Emotions or Feelings"}
            value={emotions}
            multiline
            keyboardType="default"
          />
          {/* <View style={look.pieBox}>
            <Text style={look.add}>
              Spiritual Connection to Self, Others or Higher Power
            </Text> */}
          {/* </View> */}
          <TextInput
            style={look.input}
            onChangeText={(text) => setSpiritual(text)}
            placeholder={"Spiritual Connection to Self, Others or Higher Power"}
            value={spiritual}
            multiline
            keyboardType="default"
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                errorCheck();
              }}
            >
              <MaterialIcons
                style={[look.icon, look.centerIcon]}
                name="add-circle"
              />
            </TouchableOpacity>
          </View>

          {sortedEntries.map((item, i) => (
            <View key={item.id} style={look.border}>
              <View style={look.elementHeader}>
                <TouchableOpacity onPress={() => handleDelete({ item })}>
                  <MaterialIcons
                    style={[look.icon, look.canIcon]}
                    name="delete-forever"
                  />
                </TouchableOpacity>
                <Text style={look.date}>{item.date}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleFlag(i);
                  }}
                >
                  <SimpleLineIcons
                    style={item.flag ? [look.fIcon, look.selected] : look.fIcon}
                    name="flag"
                  />
                </TouchableOpacity>
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
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

//   return (
//     <View style={look.container}>
//       <KeyboardAwareScrollView extraHeight={180}>
//         <Text style={styles.header}>How do you feel today?</Text>
//         <Text style={styles.headerTwo}>Physical Body</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => setPhysical(text)}
//           value={physical}
//           placeholder={"new entry"}
//           multiline
//           keyboardType="default"
//           color="#D7D9D7"
//           placeholderTextColor={"#F1F7EE"}
//         />
//         <Text style={styles.headerTwo}>Insights or Thoughts</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => setInsights(text)}
//           value={insights}
//           placeholder={"new entry"}
//           multiline
//           keyboardType="default"
//           color="#D7D9D7"
//           placeholderTextColor={"#F1F7EE"}
//         />
//         <Text style={styles.headerTwo}>Emotions or Feelings</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => setEmotions(text)}
//           placeholder={"new entry"}
//           value={emotions}
//           multiline
//           keyboardType="default"
//           color="#D7D9D7"
//           placeholderTextColor={"#F1F7EE"}
//         />
//         <Text style={styles.headerTwo}>
//           Spiritual Connection to Self, Others or a Higher Power
//         </Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => setSpiritual(text)}
//           placeholder={"new entry"}
//           value={spiritual}
//           multiline
//           keyboardType="default"
//           color="#D7D9D7"
//           placeholderTextColor={"#F1F7EE"}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             errorCheck();
//           }}
//         >
//           <MaterialIcons style={styles.icon} name="add-circle" />
//         </TouchableOpacity>

//         <View>
//           {sortedEntries.map((item, i) => (
//             <View key={item.id} style={styles.pieContainer}>
//               <View style={styles.entryTop}>
//                 <Text style={styles.date}>{item.date}</Text>
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
//               <Text style={styles.add}> P: {item.physical}</Text>
//               <Text style={styles.add}> I: {item.insights}</Text>
//               <Text style={styles.add}> E: {item.emotions}</Text>
//               <Text style={styles.add}> S: {item.spiritual}</Text>
//               <TouchableOpacity onPress={() => handleDelete({ item })}>
//                 <MaterialIcons
//                   style={styles.deleteIcon}
//                   name="delete-forever"
//                 />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </KeyboardAwareScrollView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2A41",
    paddingBottom: 30,
  },
  pieContainer: {
    borderRadius: 10,
    borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    width: "95%",
    left: "2.5%",
    borderColor: "#D7D9D7",
  },
  elementContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  add: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  date: {
    marginTop: 5,
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  headerTwo: {
    // borderRadius: 10,
    // borderWidth: 4,
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "80%",
    marginTop: 21,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    left: "10%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2f8587",
  },
  deleteIcon: {
    paddingTop: 20,
    paddingBottom: 20,
    left: "45%",
    fontSize: 30,
    color: "#D7D9D7",
  },
  entryTop: {
    flexDirection: "row",
  },
  fIcon: {
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    color: "#D7D9D7",
    textAlign: "center",
  },
  selected: {
    color: "#D84C36",
  },
});

export { Pies };
