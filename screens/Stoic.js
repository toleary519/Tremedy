import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Stoic = () => {

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={{ paddingBottom: 30}}>
      <Text style={styles.header}> Some Stoic Questions to ask yourself.</Text> 
      <Text style={[styles.header, { fontSize: 25, marginBottom: 8}]}>Take inventory of this as often as you need.</Text>
        <View style={styles.ideal}>
          <Text style={styles.add}>Is this who I want to be?</Text>
          <Text style={styles.subAdd}>Is this action representative of my values and who I see myself as?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>Does this actually matter?</Text>
          <Text style={styles.subAdd}>Ask yourself in every moment, is this essential? People matter, loved ones matter, doing your best matters. Everything else is irrelevant.</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>What am I missing by choosing to be worried or afraid?</Text>
          <Text style={styles.subAdd}>Anxious feelings and thoughts are not only bad, they are actively destructive.</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>Who am I spending time with?</Text>
          <Text style={styles.subAdd}> Are the people surrounding you bringing you closer to yourself or pulling you away?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>What does your ideal day look like?</Text>
          <Text style={styles.subAdd}>What actions can you take to get there more often?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>If I am not for me who is? If I am only for me, who am I?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>Are you doing your job?</Text>
          <Text style={styles.subAdd}>Not just professional, you job in the moment. No? Why not?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>What is the most important thing?</Text>
          <Text style={styles.subAdd}>Focusing on what is most important to you sharpens your mind and makes it easier to ignore distractions.</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>Who is this for?</Text>
          <Text style={styles.subAdd}>Are you acting on your own behalf, or the wishes of others?</Text>
        </View>
        <View style={styles.ideal}>
          <Text style={styles.add}>Will this be alive time or dead time?</Text>
          <Text style={styles.subAdd}>Are you going to do what you can, seize moments. Or are you going to be passive and wait?</Text>
        </View>
    </ScrollView>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor:"#1B2A41"
  },
  ideal: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#D7D9D7",
    width: "90%",
    left: "5%",
    marginTop: 10,
  },
  add: {
    textAlign: "center",
    justifyContent: "flex-end",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FC9F5B",
  },
  header: {
    paddingTop: 30,
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    fontSize: 35,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
  subAdd: {
    width: "90%",
    left: "5%",
    textAlign: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#D7D9D7",
  },
});

export { Stoic };