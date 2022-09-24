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
import { SoberContacts } from "./screens/SoberContacts"
import { BadTimes } from "./screens/BadTimes";
import ProConPage from "./screens/ProConPage";
import { GoodTimes } from "./screens/GoodTimes";
import { OutsideMenu } from "./screens/OutsideMenu";
import { Meetings } from "./screens/Meetings";
import { Breathe } from "./screens/Breathe";
import { Five } from "./screens/Five";
import { Four } from "./screens/Four";
import { Three } from "./screens/Three";
import { Two } from "./screens/Two";
import { One } from "./screens/One";
import { PercievedThreatMenu } from "./screens/PercievedThreatMenu";
import { EyeInstruct } from "./screens/EyeInstruct";
import { KneadInstruct } from "./screens/KneadInstruct";
import { AnkleInstruct } from "./screens/AnkleInstruct";
import { Activities } from "./screens/Activities";
import { Pies } from "./screens/Pies";
import { ProgressiveMuscle } from "./screens/ProgressiveMuscle";
import { SelfTalk } from "./screens/SelfTalk";
import { MyValues } from "./screens/MyValues";
import { Using } from "./screens/Using";
import MyStack from "./routes/homeStack"
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

function App() {

  return (
    <View style={styles.container}>
         <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home" screenOptions={{
                headerStyle: {
                  backgroundColor: '#1B2A41',
                },
                headerTintColor: '#D7D9D7',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                },
              }}>
                <Stack.Screen name="Home" component={FirstMenu} options={{ title: 'Home' }}/>
                <Stack.Screen name="PepTalk" component={PepTalkMenu} options={{ title: 'Tool Box' }}/>
                <Stack.Screen name="NotesMenu" component={NotesMenu} options={{ title: 'Experiences' }}/>
                <Stack.Screen name="GoodTimes" component={GoodTimes} options={{ title: 'The Good' }}/>
                <Stack.Screen name="BadTimes" component={BadTimes} options={{ title: 'The Bad' }}/>
                <Stack.Screen name="Emergency" component={Emergency} options={{ title: 'Emergency' }}/>
                <Stack.Screen name="UrgeMenu" component={UrgeMenu} options={{ title: 'Urges' }}/>
                <Stack.Screen name="PlanningMenu" component={PlanningMenu} options={{ title: "I'm Planning" }}/>
                <Stack.Screen name="Meetings" component={Meetings} options={{ title: 'Find A Meeting' }}/>
                <Stack.Screen name="SoberContacts" component={SoberContacts} options={{ title: 'Sober Contacts' }}/>
                <Stack.Screen name="OutsideMenu" component={OutsideMenu} options={{ title: "Don't Do It" }}/>
                <Stack.Screen name="Breathe" component={Breathe} options={{ title: 'Breathe' }}/>
                <Stack.Screen name="PercievedThreatMenu" component={PercievedThreatMenu} options={{ title: 'Percieved Threat' }}/>
                <Stack.Screen name="EyeInstruct" component={EyeInstruct} options={{ title: 'Eye Exercise' }}/>
                <Stack.Screen name="KneadInstruct" component={KneadInstruct} options={{ title: 'Knead Exercise' }}/>
                <Stack.Screen name="Activities" component={Activities} options={{ title: 'Activities' }}/>
                <Stack.Screen name="Pies" component={Pies} options={{ title: 'PIES Check-In' }}/>
                <Stack.Screen name="ProgressiveMuscle" component={ProgressiveMuscle} options={{ title: 'PMR' }}/>
                <Stack.Screen name="AnkleInstruct" component={AnkleInstruct} options={{ title: 'Ankle Exercise' }}/>
                <Stack.Screen name="SelfTalk" component={SelfTalk} options={{ title: 'Thought Challenging' }}/>
                <Stack.Screen name="MyValues" component={MyValues} options={{ title: 'My Values' }}/>
                <Stack.Screen name="Using" component={Using} options={{ title: 'We Can Do This' }}/>
                <Stack.Screen name="One" component={One} options={{ title: 'One' }}/>
                <Stack.Screen name="Two" component={Two} options={{ title: 'Two' }}/>
                <Stack.Screen name="Three" component={Three} options={{ title: 'Three' }}/>
                <Stack.Screen name="Five" component={Five} options={{ title: 'Five' }}/>
                <Stack.Screen name="Four" component={Four} options={{ title: 'Four' }}/>
                <Stack.Screen name="ProCon" component={ProConPage} options={{ title: 'PROs & CONs' }}/>
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
  status: {
    backgroundColor:"#1B2A41"
  }
});

export default App;