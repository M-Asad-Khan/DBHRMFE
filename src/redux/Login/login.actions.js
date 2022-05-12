import {
	updateCurrentUser
} from "./login.types";

export const updateCurrentUserAction = (params) => {
  return {
    type: updateCurrentUser,
    payload: params,
  };
};
