import { useState } from "react";
// import alert
import { SimpleLineIcons } from "@expo/vector-icons";


const [x, setX] = useState(x ? x : [])
const [flag, setFlag] = useState(false)
const [myStyle, setMyStyle] = useState(false);

// just above handleAdd
const flagAlert = () => {

    let onPress = () => {
      setFlag(true);
      handleAdd();
    };

    Alert.alert("Flag this for therapist?", `You two can review it together.`, [
      {
        text: "Yes",
        onPress: onPress(),
      },

      { text: "Nope" },
    ]);
  };

//   in handle add 
flag: flag


// bottom of add
setStorage
setfieldType
storeD
getData
setFlag(false)

// just above return 

const handleClick = (id) => {
    setMyStyle((prevState) => ({
      ...myStyle,
      [id]: !prevState[id],
    }));
  };

// in error check replace

flagAlert()

// inside of map under piecontainer : 

<View style={styles.entryTop}>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleClick(item.id);
                  }}
                >
                  <SimpleLineIcons
                    style={
                      myStyle[`${item.id}`]
                        ? [styles.fIcon, styles.selected]
                        : styles.fIcon
                    }
                    name="flag"
                  />
                </TouchableOpacity>
              </View>

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