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

      default:
         throw new Error("Invalid namespace for reducer");
   }


}

const authReducer = (state, action) => {
   switch (action.type) {
      case types.SET_USER:
         return { ...state, users: { isLoggedIn: true, ...action.payload }}

      default:
         throw new Error("Invalid action type for auth reducer");
   }
}

const usersReducer = (state, action) => {

}

const storiesReducer = (state, action) => {

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

export default rootReducer;