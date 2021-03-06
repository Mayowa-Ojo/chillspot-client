import { createContext, useReducer } from "react";

import rootReducer from "./reducers";

export const StoreContext = createContext({});

const initialState = {
   auth: {
      isLoggedIn: false,
      profile: {}
   },
   modal: {
      isOpen: false,
      component: ""
   },
   stories: {
      feed: [],
      currentStory: null,
      currentStoryComments: [],
      moreStoriesFromUser: []
   },
   users: {
      currentUser: null,
      suggestedUsers: []
   },
   global: {
      status: "idle", // ["loading", "idle", "error", "done"]
      toast: {
         type: "info",
         message: "",
         isActive: false
      }
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