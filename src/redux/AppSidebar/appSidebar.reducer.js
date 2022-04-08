import { updateShowSidebar } from "./appSidebar.types";


const INITIAL_STATE = {
 showSidebar:true

};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateShowSidebar:
      return {
        ...state,
        showSidebar: action.payload,
      };


    default:
      return state;
  }
};

export default reducer;
