
import { } from './clients.types';


export const increaseCounter = () => {

	return {

		type: INCREMENT,

	};

};

export const decreaseCounter = () => {

	return {

		type: DECREMENT,

	};

};

export const updateNewEmployeeAction = (params) => {

	return {

		type: updateNewEmployee,
		payload: params

	};
}
	export const updateIsAddEmployeeClickedAction = (params) => {

		return {

			type: updateIsAddEmployeeClicked,
			payload: params

		};
	};

	export const updateEmployeesAction = (params) => {

		return {

			type: updateEmployees,
			payload: params

		};
	};