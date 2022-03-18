import {  updateNewClient, updateIsAddClientClicked, updateClients
} from './clients.types';

const INITIAL_STATE = {
	clients: [
		{Id:201,Name:'Client 1',Country:'America'},
		{Id:202,Name:'Client 2',Country:'China'},
		{Id:203,Name:'Client 3',Country:'Russia'}
	],
	newclient: {},
	isAddClientClicked:false
};

const reducer = (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case updateNewClient:

			return {
				...state, newclient: action.payload

			};

		case updateClients:

			return {
				...state, clients: action.payload

			};

		case updateIsAddClientClicked:

			return {
				...state, isAddClientClicked: action.payload

			};

		default: return state;
	}

};

export default reducer;