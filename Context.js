import React, { createContext, useState } from "react";

// invoke and export the context
export const UserContext = createContext();

// prettier-ignore
export const StateProvider = (props) => {
  const [token, setToken] = useState(
    token
      ? token
      : {
          name: "",
          email: "",
          subscribed: true,
          profile: true,
          substance: false,
          flags: true,
          rLength: 1,
          timeSaved: false,
          timeHrs: null,
          timeMins: null,
          city: "",
          country: "",
        }
  );

  console.log("context ran");
  console.log("this is the state object in context : ", state);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
};
