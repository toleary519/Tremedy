import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// invoke and export the context
export const StateContext = createContext();

// prettier-ignore
export const StateProvider = (props) => {
  const [activeStorage, setActiveStorage ] = useState(activeStorage ? activeStorage : []);  
  const [badStorage, setBadStorage] = useState(badStorage ? badStorage : []);
  const [checkinStorage, setCheckinStorage] = useState( checkinStorage ? checkinStorage : []);
  const [copingStorage, setCopingStorage] = useState(copingStorage ? copingStorage : []);  
  const [cravingStorage, setCravingStorage] = useState(cravingStorage ? cravingStorage : []);  
  const [focusStorage, setFocusStorage] = useState(focusStorage ? focusStorage : []);  
  const [goodStorage, setGoodStorage] = useState(goodStorage ? goodStorage : []);  
  const [selectedRoutine, setSelectedRoutine] = useState(selectedRoutine ? selectedRoutine : []);  
  const [pieStorage, setPieStorage] = useState(pieStorage ? pieStorage : []);  
  const [proStorage, setProStorage] = useState(proStorage ? proStorage : []);  
  const [conStorage, setConStorage] = useState(conStorage ? conStorage : []);  
  const [valueStorage, setValueStorage] = useState(valueStorage ? valueStorage : []);
  const [best, setBest] = useState(best ? best : []);  
  const [selfTalk, setSelfTalk] = useState(selfTalk ? selfTalk : []);  
  const [thatStorage, setThatStorage] = useState(thatStorage ? thatStorage : []);  
  const [token, setToken] = useState(token ? token : {
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
  });
  
  const [reportStorage, setReportStorage] = useState([]);
  
  const dataItems = ["storedAct", "storedBad", "storedCheckin", "storedCoping",
  "storedCraving", "storedFocus", "storedGood", "savedRoutine", "storedPie", "proStorage",
   "conStorage", "storedValues", "screamBest", "storedSelfTalk", "storedThat", "storedUser"];
  
  const getData = async () => {
    try {
      // const jsonValue = await AsyncStorage.multiGet(dataItems);
      const jsonValue = await AsyncStorage.multiGet(dataItems);
      setActiveStorage(jsonValue[0][1])
      setBadStorage(jsonValue[1][1])
      setCheckinStorage(jsonValue[2][1])
      setCopingStorage(jsonValue[3][1])
      setCravingStorage(jsonValue[4][1]);
      setFocusStorage(jsonValue[5][1]);
      setGoodStorage(jsonValue[6][1]);
      setSelectedRoutine(jsonValue[7][1]);
      setPieStorage(jsonValue[8][1]);
      setProStorage(jsonValue[9][1]);
      setConStorage(jsonValue[10][1]);
      setValueStorage(jsonValue[11][1]);
      setBest(jsonValue[12][1]);
      setSelfTalk(jsonValue[13][1]);
      setThatStorage(jsonValue[14][1]);
      setToken(jsonValue[15][1]);
      setReportStorage([...copingStorage, ...checkinStorage, ...focusStorage,
        ...pieStorage, ...goodStorage, ...badStorage, ...valueStorage,
        ...selfTalk, ...thatStorage, ...cravingStorage]);
    } catch (e) {
      console.log(e);
    }
  };

  stateArray = [activeStorage, setActiveStorage, badStorage, setBadStorage,
    checkinStorage, setCheckinStorage, copingStorage, setCopingStorage, cravingStorage,
    setCravingStorage,focusStorage, setFocusStorage, goodStorage, setGoodStorage, selectedRoutine,
    setSelectedRoutine, pieStorage, setPieStorage, proStorage, setProStorage, conStorage, setConStorage,
    reportStorage, setReportStorage, best, setBest, selfTalk, setSelfTalk, thatStorage, setThatStorage,
    token, setToken, valueStorage, setValueStorage];

  React.useEffect(() => {
    getData();
  }, []);


  

  return (
    <StateContext.Provider
      value={[...stateArray ]}
    >
      {props.children}
    </StateContext.Provider>
  );
};
