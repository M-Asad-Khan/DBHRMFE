import {
  updateNewTeam,
  updateIsAddTeamClicked,
  updateTeams,
  updateIsEditTeamClicked,
updateTeamsDataTable,
updateIsViewTeamClicked
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

export const updateTeamsDataTableAction = (params) => {
  return {
    type: updateTeamsDataTable,
    payload: params,
  };
};

// export const updateClientsAction = (params) => {
//   return {
//     type: updateClients,
//     payload: params,
//   };
// };
export const updateIsViewTeamClickedAction = (params) => {
  return {
    type: updateIsViewTeamClicked,
    payload: params,
  };
};