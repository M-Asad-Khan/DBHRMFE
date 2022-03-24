import {  updateNewClient, updateIsAddClientClicked, updateClients,updateIsEditClientClicked
} from './clients.types';

const INITIAL_STATE = {
	clients:[],
	newClient: {},
	isAddClientClicked: false,
	isEditClientClicked:false
};

const reducer = (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case updateNewClient:

			return {
				...state, newClient: action.payload

			};

		case updateClients:

			return {
				...state, clients: action.payload

			};

		case updateIsAddClientClicked:

			return {
				...state, isAddClientClicked: action.payload

			};
		
			case updateIsEditClientClicked:

				return {
					...state, isEditClientClicked: action.payload
	
				};

		default: return state;
	}

};

export default reducer;