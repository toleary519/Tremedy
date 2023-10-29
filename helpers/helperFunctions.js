import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const theErrorCheck = ({ x }) => {
  const errorCheck = ({ x }) => {
    if (!entry.replace(/\s+/g, "")) {
      Alert.alert("Entry Error", `Fill out all fields to submit.`, [
        { text: "Got It" },
      ]);
      return;
    } else {
      flagAlert(handleAdd, { x });
    }
  };

  errorCheck({ x });

  const flagAlert = (handleAdd, { x }) => {
    const pressTrue = () => {
      let flag = true;
      handleAdd(flag, { x });
    };
    const pressFalse = () => {
      let flag = false;
      handleAdd(flag, { x });
    };

    Alert.alert("Flag this for therapist?", `You can review it together.`, [
      {
        text: "Yes",
        onPress: () => pressTrue(),
      },

      { text: "Nope", onPress: () => pressFalse() },
    ]);
  };

  const handleAdd = (flag, { x }) => {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let orderId = currentDate.getTime();

    let newFocus = {
      id: orderId,
      entry: x.entry,
      flag: flag,
      date: `${currentMonth}/${currentDay}/${currentYear}`,
    };

    const newList = [...x.storage, newFocus];

    x.setstorage(newList);
    x.setentry("");
    storeData(newList);
    getData();
  };
};

const handleAdd = (flag, entry, storage, setStorage, setEntry) => {
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  let orderId = currentDate.getTime();

  let newFocus = {
    id: orderId,
    entry: entry,
    flag: flag,
    date: `${currentMonth}/${currentDay}/${currentYear}`,
  };

  const newList = [...storage, newFocus];

  setStorage(newList);
  setEntry("");
  storeData(newList);
  getData();
};

const handleClick = (id, myStyle, setMyStyle) => {
  setMyStyle((prevState) => ({
    ...myStyle,
    [id]: !prevState[id],
  }));
};

const handleDelete = ({ item }, storage, setStorage) => {
  let index = 0;
  // find the index of item to delete
  for (let obj of storage) {
    if (obj.id !== item.id) {
      index++;
    } else {
      break;
    }
  }
  // filter array for display
  setStorage(storage.filter((val) => val.id !== item.id));
  // make permanent delete
  storage.splice(index, 1);
  // save deletion of item
  storeData(storage);
};

const getData = async (asyncString, setStorage) => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncString);
    let savedData = jsonValue ? JSON.parse(jsonValue) : [];
    setStorage(savedData);
  } catch (e) {
    console.log(e);
  }
};

const storeData = async (storage) => {
  try {
    const jsonValue = JSON.stringify(storage);
    await AsyncStorage.setItem("storedFocus", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const hlp = {
  handleClick,
  handleDelete,
  getData,
  theErrorCheck,
};

export { hlp };
