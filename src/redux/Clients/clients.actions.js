import {
  updateNewClient,
  updateIsAddClientClicked,
  updateClients,
  updateIsEditClientClicked,
	updateClientsDataTable,
	updateIsViewClientClicked
} from "./clients.types";

export const updateNewClientAction = (params) => {
  return {
    type: updateNewClient,
    payload: params,
  };
};
export const updateIsAddClientClickedAction = (params) => {
	debugger;
  return {
    type: updateIsAddClientClicked,
    payload: params,
  };
};

export const updateClientsAction = (params) => {
  return {
    type: updateClients,
    payload: params,
  };
};

export const updateIsEditClientClickedAction = (params) => {
  return {
    type: updateIsEditClientClicked,
    payload: params,
  };
};
export const updateClientsDataTableAction = (params) => {
  return {
    type: updateClientsDataTable,
    payload: params,
  };
};
export const updateIsViewClientClickedAction = (params) => {
	  return {
	    type: updateIsViewClientClicked,
	    payload: params,
	  };
	};
