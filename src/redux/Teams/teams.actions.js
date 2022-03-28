import {
  updateNewTeam,
  updateIsAddTeamClicked,
  updateTeams,
  updateIsEditTeamClicked,
	updateEmployees,
	updateClients
} from "./teams.types";

export const updateNewTeamAction = (params) => {
  return {
    type: updateNewTeam,
    payload: params,
  };
};
export const updateIsAddTeamClickedAction = (params) => {
  return {
    type: updateIsAddTeamClicked,
    payload: params,
  };
};

export const updateTeamsAction = (params) => {
  return {
    type: updateTeams,
    payload: params,
  };
};

export const updateIsEditTeamClickedAction = (params) => {
  return {
    type: updateIsEditTeamClicked,
    payload: params,
  };
};

export const updateEmployeesAction = (params) => {
  return {
    type: updateEmployees,
    payload: params,
  };
};

export const updateClientsAction = (params) => {
  return {
    type: updateClients,
    payload: params,
  };
};
