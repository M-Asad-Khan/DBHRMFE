import {
  updateNewTeam,
  updateIsAddTeamClicked,
  updateTeams,
  updateIsEditTeamClicked,
  updateEmployees,
  updateClients,
} from "./teams.types";

const INITIAL_STATE = {
  teams: [],
  newClient: {},
  isAddClientClicked: false,
  isEditClientClicked: false,
  employees: [],
  clients: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateNewTeam:
      return {
        ...state,
        newTeam: action.payload,
      };

    case updateTeams:
      return {
        ...state,
        teams: action.payload,
      };

    case updateIsAddTeamClicked:
      return {
        ...state,
        isAddTeamClicked: action.payload,
      };

    case updateIsEditTeamClicked:
      return {
        ...state,
        isEditTeamClicked: action.payload,
      };

    case updateEmployees:
      return {
        ...state,
        employees: action.payload,
      };

    case updateClients:
      return {
        ...state,
        employees: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
