import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { FirstMenu } from "../screens/FirstMenu"
import { PepTalkMenu } from "../screens/PepTalkMenu"
import { GoodTimes } from "../screens/GoodTimes"
import { BadTimes } from "../screens/BadTimes"

// const screens = {
//   Home: {
//     screen: FirstMenu
//   },
//   PepTalk: {
//     screen: PepTalkMenu
//   },
//   GoodTimes: {
//     screen: GoodTimes
//   },
//   BadTimes: {
//     screen: BadTimes
//   },
// }

const Stack = createNativeStackNavigator(screens);

const MyStack = () => {
  return 
    (
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
  );
}

export default MyStack;