
import { updateNewClient,updateIsAddClientClicked,updateClients} from './clients.types';




export const updateNewEmployeeAction = (params) => {

	return {

		type: updateNewClient,
		payload: params

	};
}
	export const updateIsAddEmployeeClickedAction = (params) => {

		return {

			type: updateIsAddClientClicked,
			payload: params

		};
	};

	export const updateEmployeesAction = (params) => {

		return {

			type: updateClients,
			payload: params

		};
	};