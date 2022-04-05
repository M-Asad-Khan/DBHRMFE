import {
  updateNewClient,
  updateIsAddClientClicked,
  updateClients,
  updateIsEditClientClicked,
	updateClientsDataTable,
	updateIsViewClicked
} from "./clients.types";

export const updateNewClientAction = (params) => {
  return {
    type: updateNewClient,
    payload: params,
  };
};
export const updateIsAddClientClickedAction = (params) => {
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
export const updateIsViewClickedAction = (params) => {
	  return {
	    type: updateIsViewClicked,
	    payload: params,
	  };
	};
