import {
	updateCurrentUser
	
} from "./login.types";
const prevUser = JSON.parse(window.localStorage.getItem('currentUser')) || null;
console.log('prevUser:>', prevUser);

const INITIAL_STATE = {
	currentUser: prevUser
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateCurrentUser:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
