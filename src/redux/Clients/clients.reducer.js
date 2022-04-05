import {
  updateNewClient,
  updateIsAddClientClicked,
  updateClients,
  updateIsEditClientClicked,
	updateClientsDataTable,
	updateIsViewClicked,
} from "./clients.types";

const INITIAL_STATE = {
  clients: [],
  newClient: {},
  isAddClientClicked: null,
  isEditClientClicked: null,
  clientsDataTable: {
    columns: [
      {
        label: "Client Name",
        field: "name",
        width: 270,
      },
      {
        label: "Country",
        field: "country",
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
	isViewClicked:null

};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateNewClient:
      return {
        ...state,
        newClient: action.payload,
      };

    case updateClients:
      return {
        ...state,
        clients: action.payload,
      };

    case updateIsAddClientClicked:
      return {
        ...state,
        isAddClientClicked: action.payload,
      };

    case updateIsEditClientClicked:
      return {
        ...state,
        isEditClientClicked: action.payload,
      };
    case updateClientsDataTable:
      return {
        ...state,
        clientsDataTable: action.payload,
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
