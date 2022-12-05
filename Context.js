// import { setAutoServerRegistrationEnabledAsync } from "expo-notifications";
// import React, { createContext, useState } from "react";

// // invoke and export the context
// export const StateContext = createContext();

// // prettier-ignore
// export const StateProvider = (props) => {
//     const [user, setUser] = useState({email: "", name: ""});

//     async function getUserInfo() {
//         const user = await Auth.currentAuthenticatedUser();
//         setAutoServerRegistrationEnabledAsync()
//         console.log("attributes:", user.attributes);
//     }

//   let state = {
//     email: user.email,
//     name: user.name,
//   };

//   console.log("context ran");
//   console.log("this is the state object in context : ", state);

//   React.useEffect(() => {
//     getUserInfo();
//   }, []);

//   return (
//     <StateContext.Provider value={{ state }}>
//       {props.children}
//     </StateContext.Provider>
//   );
// };
