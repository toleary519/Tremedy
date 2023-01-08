import React from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { FontAwesome } from "@expo/vector-icons";
import { look } from "../assets/styles";

const slides = [
  {
    key: 1,
    text: 'The Toolbox is a scrollable list of exercises.\nYou can add favourites to your Routine with the "+".',
    image: require("../assets/TourImages/Toolbox.jpg"),
  },
  {
    key: 2,
    text: "This is one exercise.\n Details are in the entries.",
    image: require("../assets/TourImages/That.jpg"),
  },
  {
    key: 3,
    text: "Details are in the entries.",
    image: require("../assets/TourImages/OneSheet.jpg"),
  },
  {
    key: 4,
    text: "The application will initiate a\n call by touching the contact.",
    image: require("../assets/TourImages/Contacts.jpg"),
  },
  {
    key: 6,
    text: "Inside of User Settings many\n options are customizable.",
    image: require("../assets/TourImages/ReportLength.jpg"),
  },
  {
    key: 7,
    title: "Emergency Menu",
    text: "Pressing the items below will return\nsearches of the resources in your area.",
    image: require("../assets/TourImages/Emergency.jpg"),
  },
  {
    key: 8,
    title: "",
    text: "",
    image: require("../assets/TourImages/Emergency.jpg"),
  },
];

const Tour = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={look.container}>
        <View style={look.tourBottomView}>
          <Text style={look.tourBottomText}>{item.text}</Text>
        </View>
        <Image style={look.tourImage} source={item.image} />
        <View style={look.tourBottomView}>
          {/* <Text style={look.tourBottomText}>{item.text}</Text> */}
        </View>
      </View>
    );
  };
  const NextButton = () => {
    return (
      <View>
        <FontAwesome name="chevron-circle-right" style={[look.icon]} />
      </View>
    );
  };

  const onSkip = () => {
    navigation.navigate("Home");
  };

  const onDone = () => {
    navigation.navigate("Home");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderDoneButton={onDone}
      renderNextButton={NextButton}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
};

export { Tour };
