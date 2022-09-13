import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FirstMenu } from "./screens/FirstMenu";
import { Emergency } from "./screens/Emergency";
import { PepTalkMenu } from "./screens/PepTalkMenu";
import { UrgeMenu } from "./screens/UrgeMenu";
import { PlanningMenu } from "./screens/PlanningMenu";
import { NotesMenu } from "./screens/NotesMenu";
import SuperPhoneContacts from "./screens/Contacts"
import { BadTimes } from "./screens/BadTimes";
import { GoodTimes } from "./screens/GoodTimes";
import MyStack from "./routes/homeStack"

const Stack = createNativeStackNavigator();

function App() {

  return (
    <View style={styles.container}>
         <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator backBehavior={"order"} initialRouteName="Home">
            <Stack.Screen name="Home" component={FirstMenu} options={[]}/>
            <Stack.Screen name="PepTalk" component={PepTalkMenu} options={[]}/>
            <Stack.Screen name="NotesMenu" component={NotesMenu} options={[]}/>
            <Stack.Screen name="GoodTimes" component={GoodTimes} options={[]}/>
            <Stack.Screen name="BadTimes" component={BadTimes} options={[]}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;