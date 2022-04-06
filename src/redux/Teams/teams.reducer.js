import {
  updateNewTeam,
  updateIsAddTeamClicked,
  updateTeams,
	updateIsEditTeamClicked,
	updateTeamsDataTable,
  updateIsViewClicked
} from "./teams.types";

const INITIAL_STATE = {
  teams: [],
  newTeam: {},
  isAddTeamClicked: null,
	isEditTeamClicked: null,
	teamsDataTable: {
    columns: [
      {
        label: "Team Name",
        field: "teamName",
        width: 270,
      },
      {
        label: "Manager",
        field: "managerName",
        width: 200,
			},
			{
        label: "Team Lead",
        field: "teamLeadName",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [],
  },
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

    case updateTeamsDataTable:
      return {
        ...state,
        teamsDataTable: action.payload,
      };
      case updateIsViewClicked:
				return {
					...state,
					isViewClicked: action.payload,
				};
    default:
      return state;
  }
};

export default reducer;
