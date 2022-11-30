import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// invoke and export the context
export const StateContext = createContext();

// prettier-ignore
export const StateProvider = (props) => {
  const [badStorage, setBadStorage] = useState(badStorage ? badStorage : []);
  const [checkinStorage, setCheckinStorage] = useState(
    checkinStorage ? checkinStorage : []
  );
  const [copingStorage, setCopingStorage] = useState(
    copingStorage ? copingStorage : []
  );
  const [cravingStorage, setCravingStorage] = useState(
    cravingStorage ? cravingStorage : []
  );
  const [focusStorage, setFocusStorage] = useState(
    focusStorage ? focusStorage : []
  );
  const [goodStorage, setGoodStorage] = useState(
    goodStorage ? goodStorage : []
  );
  const [pieStorage, setPieStorage] = useState(pieStorage ? pieStorage : []);
  const [valueStorage, setValueStorage] = useState(
    valueStorage ? valueStorage : []
  );
  const [selfTalk, setSelfTalk] = useState(selfTalk ? selfTalk : []);
  const [thatStorage, setThatStorage] = useState(
    thatStorage ? thatStorage : []
  );
  const [token, setToken] = useState(
    token
      ? token
      : {
          subscribed: false,
          rLength: 1,
          profile: false,
          substance: false,
          DOB: "",
          city: "",
          country: "",
          flags: true,
          timeSaved: false,
          timeHrs: null,
          timeMins: null,
          name: "",
          email: "",
        }
  );

  const reportStorage = [
    ...badStorage,
    ...checkinStorage,
    ...copingStorage,
    ...cravingStorage,
    ...focusStorage,
    ...goodStorage,
    ...pieStorage,
    ...valueStorage,
    ...selfTalk,
    ...thatStorage,
  ];

  const dataItems = [
    "storedBad",
    "storedCheckin",
    "storedCoping",
    "storedCraving",
    "storedFocus",
    "storedGood",
    "storedPie",
    "storedValues",
    "storedSelfTalk",
    "storedThat",
    "storedUser",
  ];

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.multiGet(dataItems);
      setBadStorage(jsonValue[0][1]);
      setCheckinStorage(jsonValue[1][1]);
      setCopingStorage(jsonValue[2][1]);
      setCravingStorage(jsonValue[3][1]);
      setFocusStorage(jsonValue[4][1]);
      setGoodStorage(jsonValue[5][1]);
      setPieStorage(jsonValue[6][1]);
      setValueStorage(jsonValue[7][1]);
      setSelfTalk(jsonValue[8][1]);
      setThatStorage(jsonValue[9][1]);
      setToken(jsonValue[10][1]);
    } catch (e) {
      console.log("here?", e);
    }
  };

  let state = {
    badStorage: badStorage,
    checkinStorage: checkinStorage,
    copingStorage: copingStorage,
    cravingStorage: cravingStorage,
    focusStorage: focusStorage,
    goodStorage: goodStorage,
    pieStorage: pieStorage,
    valueStorage: valueStorage,
    selfTalk: selfTalk,
    thatStorage: thatStorage,
    token: token,
    reportStorage: reportStorage,
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <StateContext.Provider value={{ state: state }}>
      {props.children}
    </StateContext.Provider>
  );
};
