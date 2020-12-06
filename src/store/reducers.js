import types from "./types";

const rootReducer = (state, action) => {
   switch (action.namespace) {
      case "auth":
         return authReducer(state, action);

      case "users":
         return usersReducer(state, action);

      case "stories":
         return storiesReducer(state, action);

      case "modal":
         return modalReducer(state, action);

      case "global":
         return globalReducer(state, action);

      default:
         throw new Error("Invalid namespace for reducer");
   }
}

const authReducer = (state, action) => {
   switch (action.type) {
      case types.SET_USER:
         return { 
            ...state,
            auth: { 
               isLoggedIn: true,
               profile: { ...action.payload }
            }
         };
      case types.REVOKE_USER:
         return { ...state, auth: { isLoggedIn: false, profile: {}}};

      default:
         throw new Error("Invalid action type for auth reducer");
   }
}

const usersReducer = (state, action) => {
   switch (action.type) {
      case types.SET_CURRENT_USER:
         return { ...state, users: { ...state.users, currentUser: action.payload }};

      case types.SET_MORE_USER_DATA:
         if(!state.users.currentUser) return;

         return {
            ...state,
            users: {
               ...state.users,
               currentUser: {
                  ...state.users.currentUser,
                  [action.key]: action.payload
               }
            }
         };

      default:
         throw new Error("Invalid action type for users reducer");
   }
}

const modalReducer = (state, action) => {
   switch (action.type) {
      case types.SET_MODAL_COMPONENT:
         return { ...state, modal: { ...state.modal, component: action.payload }};

      case types.TOGGLE_MODAL:
         return { ...state, modal: { ...state.modal, isOpen: !state.modal.isOpen }};

      default:
         throw new Error("Invalid action type for modal reducer");
   }
}

const storiesReducer = (state, action) => {
   switch (action.type) {
      case types.SET_STORIES_FEED:
         return { ...state, stories: { ...state.stories, feed: action.payload }};

      case types.SET_CURRENT_STORY:
         return { ...state, stories: { ...state.stories, currentStory: action.payload }};

      case types.SET_MORE_STORIES_FROM_USER:
         return { ...state, stories: { ...state.stories, moreStoriesFromUser: action.payload }};

      default:
         throw new Error("Invalid action type for stories reducer");
   }
}

const globalReducer = (state, action) => {
   switch (action.type) {
      case types.SET_STATUS:
         return { ...state, global: {...state.global, status: action.payload }};

      case types.SHOW_TOAST:
         return { 
            ...state,
            global: {
               ...state.global,
               toast: { isActive: true, ...action.payload }
            }
         };

      case types.DISMISS_TOAST:
         return { 
            ...state,
            global: {
               ...state.global,
               toast: { type: "", message: "", isActive: false }
            }
         };

      default:
         throw new Error("Invalid action type for global reducer");
   }
}

export default rootReducer;