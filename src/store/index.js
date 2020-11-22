import { createContext, useReducer } from "react";

import rootReducer from "./reducers";

export const StoreContext = createContext({});

const initialState = {
   auth: {
      isLoggedIn: true,
      profile: {}
   },
   modal: {
      isOpen: false,
      component: ""
   }
}

const Store = ({ children }) => {
   const [state, dispatch] = useReducer(rootReducer, initialState);

   return (
      <StoreContext.Provider value={{state, dispatch}}>
         {children}
      </StoreContext.Provider>
   );
}

export default Store;