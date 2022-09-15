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
import ProConPage from "./screens/ProConPage";
import { GoodTimes } from "./screens/GoodTimes";
import { OutsideMenu } from "./screens/OutsideMenu";
import { RiskAssessment } from "./screens/RiskAssessment";
import { Meetings } from "./screens/Meetings";
import { UserSettings } from "./screens/UserSettings";
import { Smart } from "./screens/Smart";
import { Anon } from "./screens/Anon";
import { Dharma } from "./screens/Dharma";
import { Breathe } from "./screens/Breathe";
import { Five } from "./screens/Five";
import { Four } from "./screens/Four";
import { Three } from "./screens/Three";
import { Two } from "./screens/Two";
import { One } from "./screens/One";
import MyStack from "./routes/homeStack"

const Stack = createNativeStackNavigator();

function App() {

  return (
    <View style={styles.container}>
         <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={FirstMenu} options={[]}/>
            <Stack.Screen name="PepTalk" component={PepTalkMenu} options={[]}/>
            <Stack.Screen name="NotesMenu" component={NotesMenu} options={[]}/>
            <Stack.Screen name="GoodTimes" component={GoodTimes} options={[]}/>
            <Stack.Screen name="BadTimes" component={BadTimes} options={[]}/>
            <Stack.Screen name="Emergency" component={Emergency} options={[]}/>
            <Stack.Screen name="UrgeMenu" component={UrgeMenu} options={[]}/>
            <Stack.Screen name="PlanningMenu" component={PlanningMenu} options={[]}/>
            <Stack.Screen name="RiskAssessment" component={RiskAssessment} options={[]}/>
            <Stack.Screen name="Meetings" component={Meetings} options={[]}/>
            <Stack.Screen name="UserSettings" component={UserSettings} options={[]}/>
            <Stack.Screen name="OutsideMenu" component={OutsideMenu} options={[]}/>
            <Stack.Screen name="Breathe" component={Breathe} options={[]}/>
            <Stack.Screen name="Smart" component={Smart} options={[]}/>
            <Stack.Screen name="Anon" component={Anon} options={[]}/>
            <Stack.Screen name="Dharma" component={Dharma} options={[]}/>
            <Stack.Screen name="One" component={One} options={[]}/>
            <Stack.Screen name="Two" component={Two} options={[]}/>
            <Stack.Screen name="Three" component={Three} options={[]}/>
            <Stack.Screen name="Four" component={Four} options={[]}/>
            <Stack.Screen name="Five" component={Five} options={[]}/>
            <Stack.Screen name="ProCon" component={ProConPage} options={[]}/>
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